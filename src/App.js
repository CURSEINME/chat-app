import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import './App.css';
import "./reset.css"

import SignIn, { action as signInAction } from "./Pages/SignIn";
import SignUp, { action as signUpAction} from "./Pages/SignUp";
import Chat, { action as chatAction} from "./Pages/Chat";
import { requareAuth } from "./utils";


const router = createHashRouter(createRoutesFromElements(
  <Route path="/">
    <Route
      index
      element={<Chat/>}
      loader={() => requareAuth()}
      action={chatAction}
    />
    <Route
      path="signIn"
      element={<SignIn/>}
      // loader={() => requareAuth()}
      action={signInAction}
      />
    <Route 
      path="signUp"
      element={<SignUp/>}
      // loader={() => requareAuth()} 
      action={signUpAction} 
    />
  </Route>
))

function App() {
  return (
    <div className="page">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;