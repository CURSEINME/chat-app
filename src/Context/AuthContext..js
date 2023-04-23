import { auth } from "../firebase";
import { useState, createContext, useEffect} from "react"
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      // console.log(user)
      setUser(user)
    })
  }, [])

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}