import React, {useEffect, useState} from 'react';
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "../utils/database.types";

type TUser = Database["public"]["Tables"]["users"]["Row"]

const NavBar = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser();
  const [profile, setProfile] = useState<TUser | null>(null);

  useEffect(() => {
    getProfile()
  }, [user])

  async function getProfile() {
    try {

      if (!user) return;
      console.log("sfafaf", user.id);
      let { data, error, status } = await supabase
        .from('users')
        .select(`*`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    }
  }

  if (!user) return <></>

  return (
    <header>
      <nav>
        <div className={"firstPart"}>
          <span>Search</span>
          {profile && profile.isAdmin ? <>
            <span>Keywords</span>
            <span>Add Product</span>
          </> : <></>}
        </div>
        <div className={"secondPart"}>
          {user && profile ? <>
          <span>
            {profile.username}
          </span>
            <span onClick={() => supabase.auth.signOut()}>Log out</span>
          </> : <>
            <span>Log in</span>
            <span>Register</span>
          </>}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;