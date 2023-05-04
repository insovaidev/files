import { createStore } from "vuex";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    async register(context, {name, email, password }) {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (response) {
        alert("Successfully")
        context.commit("SET_USER", response.user);
        console.log(response.user);
        updateProfile(auth.currentUser, {
          displayName: name, photoURL: "https://res.cloudinary.com/sertertwert/image/upload/v1674135865/photo_2023-01-19_20-44-05_gpz4rd.jpg"
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
      } else {
        throw new Error("Unable to register user");
      }
    },

    async logIn(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        context.commit("SET_USER", response.user);
      } else {
        throw new Error("login failed");
      }
    },

    async logOut(context) {
      await signOut(auth);
      context.commit("SET_USER", null);
    },

    async fetchUser(context, user) {
      context.commit("SET_LOGGED_IN", user !== null);
      if (user) {
        context.commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        context.commit("SET_USER", null);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
});
