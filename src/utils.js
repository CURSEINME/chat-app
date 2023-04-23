import { redirect } from "react-router-dom"
import { auth } from "./firebase"

export function requareAuth() {

  const user = auth.currentUser

  if (!user) {
    return redirect("signIn")
  }

  return null
}