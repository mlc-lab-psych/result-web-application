import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        setError("");

        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                navigate("/", { replace: true });
            })
            .catch(err => setError(err.message));
    }

    function handlePasswordReset() {
        if (!email) {
            setError("Please enter your email to reset your password.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setError("A password reset email has been sent.");
            })
            .catch(err => setError(err.message));
    }

    return (
        <main className={"sign-in"}>
            <h2>Sign In to RIT's MLC Lab</h2>
            <form onSubmit={handleLogin}>
                <div className={'input-div'}>
                    <label>
                        Email ID
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required={true} />
                </div>
                <div className={'input-div'}>
                    <label>
                        Password
                    </label>
                    <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Password" type="password" />
                </div>

                <button type="submit">Sign In</button>
            </form>
            {error && <p className={'form-error'}>{error}</p>}

            <p className={'forgot-password'} onClick={() => navigate("/forgot-password")} >
                Forgot Password?
            </p>
        </main>
    );
}
