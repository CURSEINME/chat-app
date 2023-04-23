import { useState, useEffect, useContext, useRef } from "react";
import { Form } from "react-router-dom";

import { sendMessage} from "../../api";
import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext.";

import { collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";

import Message from "../../Components/Message";

import "./style.css";
import Navbar from "../../Components/Navbar";

export async function action({request}) {

  const formData = await request.formData()

  const message = formData.get("message")
  const photoURL = formData.get("photoURL")
  const uid = formData.get("uid")

  try {
    if (!message) {
      return null
    }

    await sendMessage({message, photoURL, uid})
    return null
  }
  catch(err) {
    return err.message
  }
}

export default function Chat() {

  const [messages, setMessages] = useState([])

  const {user} = useContext(AuthContext)

  const formRef = useRef()
  const messageRef = useRef()

  const allMessages = messages.map(message => {
    return (
      <div key={message.id} ref={messageRef}>
        <Message
          message={message}
        />
      </div>
    )
  })
  useEffect(() => {
    messageRef.current?.scrollIntoView({behavior: "smooth"})
    formRef.current?.reset()
  },[messages])

  useEffect(() => {
    const messageRef = collection(db, "messages")
    const q = query(messageRef, orderBy("createdAt"), limit(50))

    onSnapshot(q, docs => {
      let messages = []
      docs.forEach(doc => {
        messages.push({...doc.data(), id:doc.id})
      })
      setMessages(messages)
    })
  }, [])

  return (
    <>
      <Navbar/>
      <div className="chat-container">
        <div className="chat-top">
          {allMessages && allMessages}
        </div>
        <div className="chat-bottom">
          <Form ref={formRef} className="chat-form" method="post">
            <input
              name="message"
              type="text"
              placeholder="your message"
              className="chat-input"
            />
            <input
              type="hidden"
              name="photoURL"
              value={user?.photoURL || ""}
            />
            <input
              type="hidden"
              name="uid"
              value={user?.uid || ""}
            />
          </Form>
        </div>
      </div>
    </>
  )
}