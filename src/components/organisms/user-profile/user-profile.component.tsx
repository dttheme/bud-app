import React, { useContext, useState, useRef } from "react";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext } from "../../../providers/user.provider";
import { UserDataType } from "../../../providers/garden.provider";
import { firestore, storage } from "../../../firebase";

export const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const imageRef = useRef<HTMLInputElement>(null);

  const user = useContext(UserContext).user as UserDataType;
  const userRef = firestore.doc(`/users/${user && user.uid}`);

  // const imageRef = imageInput && imageInput.files[0];
  const handleChange = event => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (displayName) {
      userRef.update({
        displayName
      });
    }
    const inputImage =
      imageRef &&
      imageRef.current &&
      imageRef.current.files &&
      imageRef.current.files[0];

    if (inputImage) {
      storage
        .ref()
        .child("user-profiles")
        .child(user.uid)
        .child(inputImage.name)
        .put(inputImage)
        .then(response => response.ref.getDownloadURL())
        .then(photoUrl => userRef.update({ photoUrl }));
    }
  };
  return (
    <>
      <ActiveUser {...user} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          placeholder="Display Name"
        />
        <input type="file" ref={imageRef} />
        <input type="submit" />
      </form>
    </>
  );
};
