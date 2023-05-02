import { redirect } from "react-router-dom"
import { auth } from "./firebase"

export function requareAuth() {

  const loggedIn = localStorage.getItem("loggedIn")
  console.log(loggedIn)

  if (!loggedIn) {
    return redirect("signIn")
  }

  return null
}