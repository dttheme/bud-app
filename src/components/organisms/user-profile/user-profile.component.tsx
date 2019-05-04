import React, { useContext, useState, useRef } from "react";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext } from "../../../providers/user.provider";
import { UserDataType } from "../../../providers/garden.provider";
import { firestore, storage } from "../../../firebase";
import { response } from "express";

export const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const imageRef = useRef(null);

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
      userRef.update({ displayName });
    }
    // const inputImage = imageRef && imageRef.files;
    console.log(imageRef);
    // if (imageRef) {
    //   console.log("hello!");
    //   storage
    //     .ref()
    //     .child("user-profiles")
    //     .child(user.uid)
    //     .child(imageRef.files[0].name)
    //     .put(imageRef.files[0])
    //     .then(response => response.ref.getDownloadURL())
    //     .then(photoUrl => userRef.update({ photoUrl }));
    // }
  };
  return (
    <>
      <ActiveUser user={user} />
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
