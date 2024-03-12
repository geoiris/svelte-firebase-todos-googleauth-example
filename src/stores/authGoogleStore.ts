import { writable } from 'svelte/store'
import { auth } from '$lib/firebase'
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import type firebase from  'firebase/auth'

  export const authStore = writable<{
    isLoggedIn: boolean,
    user?: firebase.UserInfo,
    firebaseControlled: boolean,
    data: any
  }>({
    isLoggedIn: false,
    firebaseControlled: false,    
    data: {}
  })

  export async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider()

      await signInWithPopup(auth, provider)
    } catch (e) {
      console.log(e)
    }
  }

  export async function logout() {
    await signOut(auth)
  }

export default {
  subscribe: authStore.subscribe,
  set: authStore.set
}