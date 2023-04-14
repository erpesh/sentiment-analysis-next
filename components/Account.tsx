import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'

import { Database } from '../utils/database.types'
type User = Database['public']['Tables']['users']['Row']

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<User | null>(null)
  const [password, setPassword] = useState("");

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('users')
        .select(`*`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setProfile(data)
      }
    } catch (error) {
      // alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { error } = await supabase.from('users').upsert(profile)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function onChangeProfile(key: string, value: string) {
    let _profile = {...profile};
    // @ts-ignore
    _profile[key] = value;
    // @ts-ignore
    setProfile(_profile);
  }

  return (
    <>
      {profile &&
        <div className="formWidget">
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={session.user.email} disabled />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={profile.username || ''}
              onChange={(e) => onChangeProfile("username", e.target.value)}
            />
          </div>
          <div>
            <label>first name</label>
            <input
              id="username"
              type="text"
              value={profile.first_name || ''}
              onChange={(e) => onChangeProfile("first_name", e.target.value)}
            />
          </div>
          <div>
            <label>last name</label>
            <input
              id="username"
              type="text"
              value={profile.last_name || ''}
              onChange={(e) => onChangeProfile("last_name", e.target.value)}
            />
          </div>

          <div className={"updateButtonContainer"}>
            <button
              className="button primary block"
              onClick={updateProfile}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>

          <div>
            <button className="button block" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          </div>

        </div>
      }
    </>
  )
}