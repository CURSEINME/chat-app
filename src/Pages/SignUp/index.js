import { Form, redirect, useActionData, Link } from "react-router-dom";
import { signUp } from "../../api";

import "./style.css";

export async function action({request}) {
  const formData = await request.formData()

  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")
  const photoURL = formData.get("imageUrl")

  try {
    if (name.length >= 20) {
      throw new Error("Name too long, max 20 symbols")
    }
    
    const url = new URL(photoURL)

    if (photoURL.length >= 200) {
      throw new Error("ImageUrl too long")
    }

    await signUp({name, email, password, photoURL})

    return redirect("/")
  } catch(err) {
    return err.message
  }
}

export default function SignUp() {

  const errorMessage = useActionData()

  return (
    <div className="signUp-container">
      <h1 className= "signUp-title">Create your account</h1>
      {errorMessage && <h2 className="signIn-error">{errorMessage}</h2>}
      <Form className="signUp-form" method="post">
        <input
          className="signUp-input"
          name="name"
          type="text"
          placeholder="Nickname"
        />
        <input
          className="signUp-input"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="signUp-input"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="true"
        />
        <input
          className="signUp-input"
          name="imageUrl"
          type="text"
          placeholder="ImageUrl"
        />
        <button className="signUp-btn">Sign Up</button>
      </Form>
      <div className="signIn-text">
        <span>Already have account? </span>
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  )
}