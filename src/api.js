import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
 } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore"

export async function signIn({email, password}) {
  await signInWithEmailAndPassword(auth, email, password)
}
export async function signUp({name, email, password, photoURL}) {
  await createUserWithEmailAndPassword(
    auth, email, password
  )
  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL
  })
}
export async function userSignOut() {
  await signOut(auth)
}
export async function sendMessage({message, photoURL, uid}) {
  const messagesRef = collection(db, "messages")

  await addDoc(messagesRef, {
    text: message,
    createdAt: serverTimestamp(),
    photoURL,
    uid,
  })
}