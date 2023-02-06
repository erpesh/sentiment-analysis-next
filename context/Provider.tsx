import React, { createContext, useState, useContext } from 'react';
import {Database} from "../utils/database.types";
import useProfile from "../hooks/useProfile";
type TUser = Database["public"]["Tables"]["users"]["Row"]

// Create a context
interface ProfileContext {
  profile: TUser | null;
}
export const ProfileContext = createContext<ProfileContext>({
  profile: null
});

// Create a context provider
const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const profile = useProfile();
  console.log(profile)

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;