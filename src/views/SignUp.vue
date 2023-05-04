<template>
  <div class="flex justify-center">
    <button @click="createUser" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create User</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase"
const email = ref("polchhit@gmail.com");
const password = ref("2001@mother");
// const auth = getAuth();

const createUser = async () => {
  const response = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  );
  if (response) {
    alert("Successfully");
    // context.commit("SET_USER", response.user);
    // response.user.updateProfile({ displayName: name });
  } else {
    throw new Error("Unable to register user");
  }
};
</script>

<style>
</style>