import React from 'react';
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "../utils/database.types";
import Link from "next/link";
import useProfile from "../hooks/useProfile";

const NavBar = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser();
  const profile = useProfile();

  return (
    <header>
      <nav>
        <div className={"firstPart"}>
          <span>Search</span>
          {profile && profile.isAdmin ? <>
            <span><Link href={"/keywords"}>Keywords</Link></span>
            <span>Add Product</span>
          </> : <></>}
        </div>
        <div className={"secondPart"}>
          {user && profile ? <>
          <span>
            <Link href={"/"}>{profile.username}</Link>
          </span>
            <span onClick={() => supabase.auth.signOut()}>Log out</span>
          </> : <>
            <span><Link href={"/"}>Log in</Link></span>
            <span>Register</span>
          </>}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;