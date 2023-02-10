import {useEffect, useState} from "react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Database} from "../utils/database.types";

type TUser = Database["public"]["Tables"]["users"]["Row"]

const useProfile = () => {
  const supabase = useSupabaseClient<Database>()
  const user = useUser();
  const [profile, setProfile] = useState<TUser | null>(null);

  useEffect(() => {
    getProfile()
  }, [user])

  async function getProfile() {
    try {
      if (!user) return;
      let {data, error, status} = await supabase
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

  return {profile, setProfile};
}
export default useProfile;