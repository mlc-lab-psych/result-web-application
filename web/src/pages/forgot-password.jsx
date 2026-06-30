import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleReset(e) {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setMessage("A password reset link has been sent to your email.");
            })
            .catch(err => setError(err.message));
    }

    return (
        <div className="sign-in">
            <h2>Reset Password</h2>

            <form onSubmit={handleReset}>
                <div className="input-div">
                    <label>Email ID</label>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <button type="submit">Send Reset Email</button>
            </form>

            {message && <p className="form-success">{message}</p>}
            {error && <p className="form-error">{error}</p>}
        </div>
    );
}
