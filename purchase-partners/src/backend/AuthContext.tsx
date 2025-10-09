import type { User } from "@supabase/supabase-js";
import supabase from "../supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | null;
    signInWithGithub: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string) => Promise<void>;
    loading: boolean;
    signOut: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const handleAuthError = (
    error: unknown,
    setError: (error: string) => void,
    locationMessage: string,
    setLoading?: (loading: boolean) => void
): void => {
    const message = error instanceof Error ? error.message : `An unexpected error occured ${locationMessage}`;
    setError(message);
    if (setLoading) {
        setLoading(false);
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        }
        getInitialSession();

        // listener for signout auth change
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            setLoading(false);
        })
        return () => {
            listener.subscription.unsubscribe();
        }
    }, [])

    // Test with github instead of google since no google account
    const signInWithGithub = async () => {
        supabase.auth.signInWithOAuth({ provider: "github" })
    }

    const signInWithGoogle = async () => {
        try {
            setError(null);
            setLoading(true);

            const { error } = await supabase.auth.signInWithOAuth({ provider: "google" })

            if (error) throw error;

        } catch (error: unknown) {
            handleAuthError(error, setError, 'AuthProvider')
        }
    }

    const signInWithEmail = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setLoading(false);
                throw error;
            }
        } catch (error: unknown) {
            handleAuthError(error, setError, 'signInWithEmail')
        }
    }

    const signUpWithEmail = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);

            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setLoading(false);
                throw error;
            }

        } catch (error: unknown) {
            handleAuthError(error, setError, 'signUpWithEmail')
        }
    }

    const signOut = async () => {
        setLoading(true);
        try {
            setError(null);
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error: unknown) {
            handleAuthError(error, setError, 'signOut')
        }
        finally {
            setLoading(false);
        }
    }

    return <AuthContext.Provider value={{
        user,
        signInWithGithub,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        loading,
        signOut,
        error
    }}> {" "}
        {children}{" "}
    </AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth muse be used within the AuthProvider")
    }
    return context
}
