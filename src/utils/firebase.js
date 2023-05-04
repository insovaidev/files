import { initializeApp } from "firebase/app";
import { getAuth , onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const firebaseConfig = {
  apiKey: "AIzaSyBN8W36tiOSmNiWO1UF1QdZlf196lO8Dog",
  authDomain: "vue-auth-1c876.firebaseapp.com",
  projectId: "vue-auth-1c876",
  storageBucket: "vue-auth-1c876.appspot.com",
  messagingSenderId: "646916962259",
  appId: "1:646916962259:web:af4646d02397bbe589a126",
  measurementId: "G-R0N2TDR86S"
}

const app = initializeApp(firebaseConfig, "vue-auth");

//initialize firebase auth
const auth = getAuth(app)

export { app, auth }

// prepare for checking before enter routes 
export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(app), resolve, reject)
)

export const useAuthState = () => {
  const user = ref(null)
  const error = ref(null)

  const auth = getAuth()
  let unsubscribe
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      u => (user.value = u),
      e => (error.value = e)
    )
  })
  onUnmounted(() => unsubscribe())

  const isAuthenticated = computed(() => user.value != null)

  return { user, error, isAuthenticated }
}