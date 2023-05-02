import { signIn } from "../../api";
import { 
  Form,
  Link, 
  redirect,
  useActionData
} from "react-router-dom";

import "./style.css"

export async function action({request}) {
  const formData = await request.formData()

  const email = formData.get("email")
  const password = formData.get("password")

  try {
    await signIn({email, password})

    return redirect("/")
  } catch(err) {
    return err.message
  }
}

export default function SignIn() {

  const errorMessage = useActionData()

  return (
    <div className="signIn-container">
      <h1 className="signIn-title">Login in your account</h1>
      {errorMessage && <h2 className="signIn-error">{errorMessage}</h2>}
      <Form className="signIn-form" method="post">
        <input
          className="signIn-input"
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          className="signIn-input"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="true"
        />
        <button className="signIn-btn">Sign In</button>
      </Form>
      <div className="signIn-text">
        <span>Not have account? </span>
        <Link to="/signUp">Sign Up</Link>
      </div>
    </div>
  )
}