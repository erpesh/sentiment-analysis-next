import {useState} from "react";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {Database} from "../utils/database.types";
import {useRouter} from "next/router";


export default function ResetPassword() {
  const supabase = useSupabaseClient<Database>()

  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const { error } = await supabase.auth.updateUser({password: password});

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage('Password reset successful');
    router.push("/");
  }

  return (
    <div className={"container"}>
      <form onSubmit={handlePasswordReset}>
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <button style={{marginTop: "1rem"}} className="button block" type="submit">Reset Password</button>

        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  )
}