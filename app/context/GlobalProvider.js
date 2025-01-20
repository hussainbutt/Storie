import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Wrap inside try-catch block for better error handling
        const fetchUserData = async () => {
            try {
                const res = await getCurrentUser();
                console.log(res);
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
                // Handle any specific error cases here if needed
                setIsLoggedIn(false);
                setUser(null);  // Optionally set user to null on error
            } finally {
                setIsLoading(false); // Stop loading after fetching user data
            }
        };

        fetchUserData();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
