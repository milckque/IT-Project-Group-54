import { useState } from "react";
import { useAuth } from "../../backend/AuthContext";

function Home() {
    const {
        user,
        signInWithGithub,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        loading,
        signOut,
        error
    } = useAuth()
    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSignUp) {
            await signUpWithEmail(email, password);
        } else {
            await signInWithEmail(email, password);
        }
    }

    const displayName = user?.email;

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                {user ? (
                    <div>
                        <div>
                            <span>{displayName}</span>
                        </div>
                        <button onClick={signOut} disabled={loading}>
                            {loading ? 'Signing Out' : 'Sign Out'}
                        </button>
                    </div>

                ) : (
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                color: 'red',
                                backgroundColor: '#fee',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #fcc',
                                marginBottom: '10px'
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="test@gmail.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            style={{ marginLeft: '10px' }}
                        >
                            {isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'}
                        </button>

                        <button
                            type="button"
                            onClick={signInWithGoogle}
                            disabled={loading}
                            style={{ marginLeft: '10px' }}
                        >
                            {loading ? 'Loading...' : 'Sign In With Google'}
                        </button>
                        <button
                            type="button"
                            onClick={signInWithGithub}
                            disabled={loading}
                            style={{ marginLeft: '10px' }}
                        >
                            {loading ? 'Loading...' : 'Sign In With Github'}
                        </button>
                    </form>
                )}
            </div>
            <a href="/hello">Go to Hello Page</a>
            <br />
            <a href="/example">Go to Example Page</a>
            <br />
        </div>
    );
}

export default Home;
