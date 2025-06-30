<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-md w-96">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label>
          <input v-model="user_name" type="text" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div class="flex justify-between space-x-4 mt-4">
          <div>
            <label class="block text-gray-700">First Name</label>
            <input v-model="first_name" type="text" required class="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label class="block text-gray-700">Middle Name</label>
            <input v-model="middle_name" type="text" class="w-full px-3 py-2 border rounded-lg" />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Last Name</label>
          <input v-model="lastname" type="text" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Email</label>
          <input v-model="email" type="email" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label>
          <input v-model="password" type="password" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Confirm Password</label>
          <input v-model="confirmPassword" type="password" required class="w-full px-3 py-2 border rounded-lg" />
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg">Sign Up</button>
        <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500 mt-2 text-center">{{ successMessage }}</p>
      </form>
      <div class="text-center mt-4">
        <p class="text-gray-600">Already have an account?</p>
        <router-link to="/login" class="text-blue-500 hover:underline">Log In</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user_name: "",
      first_name: "",
      middle_name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role_id: 2,
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        return;
      }

      try {
        const response = await axios.post("http://localhost:3001/register/user",
          {
            user_name: this.user_name,
            first_name: this.first_name,
            middle_name: this.middle_name || null,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            role_id: this.role_id
          },
          {
            headers: { "Content-Type": "application/json" }
          }
        );

        this.successMessage = "Registration successful. Redirecting to login...";
        this.errorMessage = "";

        this.user_name = "";
        this.first_name = "";
        this.middle_name = "";
        this.lastname = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";

        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);

      } catch (error) {
        console.error("Registration request error:", error);
        this.errorMessage = error.response?.data?.message || "Registration failed.";
      }
    }
  }
};
</script>