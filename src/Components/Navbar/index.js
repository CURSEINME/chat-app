import "./style.css";
import { userSignOut } from "../../api";

export default function Navbar() {

  async function signOut() {
    await userSignOut()
    window.location.reload()
  }

  return (
    <div className="navbar-container">
      <button onClick={signOut} className="navbar-signOut">sign out</button>
    </div>
  )
}