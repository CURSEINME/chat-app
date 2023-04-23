import { useContext } from "react";
import "./style.css";
import { AuthContext } from "../../Context/AuthContext.";

export default function Message(props) {
  
  const {text, uid, photoURL} = props.message

  const {user} = useContext(AuthContext)

  return (
    <div className={user?.uid === uid ? "message-container own" : "message-container"}>
      <div className="message-top">
        <img className="message-image" src={photoURL}/>
        <p className="message-text">{text}</p> 
      </div>
    </div>
  )
}