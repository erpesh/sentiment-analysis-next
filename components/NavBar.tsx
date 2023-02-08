import React from 'react';
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "../utils/database.types";
import Link from "next/link";
import useProfile from "../hooks/useProfile";
import {useRouter} from "next/router";

const NavBar = () => {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>()
  const user = useUser();
  const {profile, setProfile} = useProfile();

  function logOut() {
    supabase.auth.signOut()
    router.push("/");
    setProfile(null);
  }

  return (
    <header>
      <nav>
        <div className={"firstPart"}>
          <span><Link href={"/search"}>Search</Link></span>
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
            <span onClick={logOut}>Log out</span>
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