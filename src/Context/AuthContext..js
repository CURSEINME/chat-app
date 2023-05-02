import { auth } from "../firebase";
import { useState, createContext, useEffect} from "react"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log("test")
        localStorage.setItem("loggedIn", true)
        
        setUser(user)
      } else {
        localStorage.removeItem("loggedIn")
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}