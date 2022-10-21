import { createContext } from "react";

const AuthContext = createContext({
    auth: null,
    setAuth: null
});

export default AuthContext;
