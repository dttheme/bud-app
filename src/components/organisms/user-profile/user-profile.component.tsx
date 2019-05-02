import React, { useContext, useState } from "react";
import { ActiveUser } from "../../molecules/active-user/active-user.component";
import { UserContext } from "../../../providers/user.provider";
import { UserDataType } from "../../../providers/garden.provider";
import { firestore } from "../../../firebase";

export const UserProfile = () => {
  const [displayName, setDisplayName] = useState("");
  let imageInput;

  const user = useContext(UserContext).user as UserDataType;

  const userRef = firestore.doc(`/users/${user && user.uid}`);

  const handleDisplayNameChange = event => {
    const { value } = event.target;
    setDisplayName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (displayName) {
      userRef.update({ displayName });
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
          onChange={handleDisplayNameChange}
          placeholder="Display Name"
        />
        <input type="file" ref={ref => (imageInput = ref)} />
        <input type="submit" />
      </form>
    </>
  );
};
