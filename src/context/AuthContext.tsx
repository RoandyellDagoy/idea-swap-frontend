import { createContext, useContext, useState, useEffect} from "react";
import supabase from "../lib/supabaseClient";
import type { User} from "@supabase/supabase-js"
import type { AuthResult } from "../types/Idea";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signOut: () => Promise<void>;
    signInWithGitHub: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({children} : {children: React.ReactNode}) =>{
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true)


// create a sign up function
const signUp = async (name: string, email: string, password: string): Promise<AuthResult> => {
  setLoading(true);
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (error) throw error;

    if (data.user) {
      await supabase
        .from('user_profiles')
        .insert([
          {
            id: data.user.id,
            full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'User',
            email: data.user.email,
          }
        ]);
    }

    setUser(data.user ?? null);
    return { success: true };
  } catch (error) {
    console.error("Sign Up Error: ", error);
    throw error;
  } finally {
    setLoading(false);
  }
};
   

// sign in logic
const signIn = async (email: string, password: string): Promise<AuthResult> =>{
    const {error} = await supabase.auth.signInWithPassword({email, password});

    if (error) {
        console.error("Sign in failed:", error.message);
        return { success: false, error: error.message };
    }
    
    return { success: true };
}

// listener 
    useEffect(()=>{
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
            setLoading(false);
        }
        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session ) =>{
            setUser(session?.user ?? null);
            setLoading(false);
        })

        return () => listener.subscription.unsubscribe();
    }, [])

    const signOut = async () => {
    // Clear local storage to remove any stale session data
    const {error } = await supabase.auth.signOut();
    console.log("Sign out successful");
    if (error) throw error;
    setUser(null);
}

    // Sign in with GitHub
    const signInWithGitHub = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error("GitHub Sign In Error: ", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

return(
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, signInWithGitHub}}>
            {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error("Mao ni sya error sa context");
    return context;
}
