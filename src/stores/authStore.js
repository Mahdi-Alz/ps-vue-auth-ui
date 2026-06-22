import { defineStore } from "pinia";
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
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.currentUser),
  },

  actions: {
    signin(identifier, password) {
      this.error = null;
      const user = this.users.find(
        (user) =>
          (user.email === identifier || user.phone === identifier) &&
          user.password === password,
      );
      if (!user) {
        this.error = "Username or Password is incorrect";
        return;
      }
      this.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },

    signup({ name, email, phone, password }) {
      this.error = null;
      const existingUser = this.users.find(
        (user) => user.email === email || user.phone === phone,
      );
      if (existingUser) {
        this.error = "User already exists";
        return;
      }
      const newUser = {
        id: generateUniqueId({ length: 6, useLetters: false }),
        name,
        email,
        phone,
        password,
      };
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users));
      this.currentUser = newUser;
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    },

    signout() {
      this.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});
