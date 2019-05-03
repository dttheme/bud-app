import React, { useContext, useState } from "react";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext } from "../../../providers/user.provider";
import { UserDataType } from "../../../providers/garden.provider";
import { firestore, storage } from "../../../firebase";
import { response } from "express";

export const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  let imageInput;

  const user = useContext(UserContext).user as UserDataType;

  const userRef = firestore.doc(`/users/${user && user.uid}`);
  const imageRef = imageInput && imageInput.files[0];
  const handleDisplayNameChange = event => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (displayName) {
      userRef.update({ displayName });
    }
    if (imageRef) {
      storage
        .ref()
        .child("user-profiles")
        .child(user.uid)
        .child(imageRef.name)
        .put(imageRef)
        .then(response => response.ref.getDownloadURL)
        .then(photoUrl => userRef.update({ photoUrl }));
    }
  };
  return (
    <>
      <ActiveUser user={user} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          name="displayName"
          onChange={handleDisplayNameChange}
          placeholder="Display Name"
        />
        <input type="file" ref={ref => (imageInput = ref)} />
        <input type="submit" />
      </form>
    </>
  );
};
