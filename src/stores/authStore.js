import { defineStore } from "pinia";
// found it from google! https://www.npmjs.com/package/generate-unique-id
import generateUniqueId from "generate-unique-id";

const default_user = {
  id: "123",
  name: "test",
  email: "test@test.com",
  phone: "0123456789",
  password: "Test12345",
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users")) || [default_user],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.currentUser),
  },

  actions: {
    /* --------------------------------- sign in -------------------------------- */
    signin(identifier, password) {
      // try find the user
      const user = this.users.find(
        (user) =>
          (user.email === identifier || user.phone === identifier) &&
          user.password === password,
      );
      // if we cannot find it
      if (!user) {
        return {
          success: false,
          message: "Username or Password is incorrect",
        };
      }

      // update the current user
      this.currentUser = user;
      // and store it in LocalStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      // return the final status
      return {
        success: true,
        id: user.id,
      };
    },

    /* --------------------------------- sign up -------------------------------- */
    signup(userData) {
      // check if we already have this user
      const existingUser = this.users.find(
        (user) =>
          user.email === userData.email || user.phone === userData.phone,
      );
      // throw error if it already exists
      if (existingUser) {
        return {
          success: false,
          message: "User already exists",
        };
      }

      // if everything is okay then we CREATE A NEW USER
      // first we genrate a id using imported library
      const newUser = {
        id: generateUniqueId({
          length: 6,
          useLetters: false,
        }),
        ...userData,
      };
      // then we push it to the users list
      this.users.push(newUser);
      // we store them in LocalStorage
      localStorage.setItem("users", JSON.stringify(this.users));

      // update the current user
      this.currentUser = newUser;
      // and store it in LocalStorage
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      // return the final status
      return {
        success: true,
        id: newUser.id,
      };
    },

    /* -------------------------------- sign out -------------------------------- */
    signout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isLoggedIn");
    },
  },
});
