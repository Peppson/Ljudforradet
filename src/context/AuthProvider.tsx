import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created?: string;
}

interface AuthContextType {
    user: User | null;
    loginUser: (email: string, password: string) => Promise<boolean>;
    logoutUser: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const response = await fetch("/api/login");
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                await fetchUser();
                return true;
            }
            return false;

        } catch (error) {
            //console.error("Login failed:", error);
            return false;
        }
    };

    const logoutUser = async () => {
        await fetch("/api/login", { method: "DELETE" });
        setUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, refreshUser: fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
