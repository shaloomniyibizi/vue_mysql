<template>
  <div>
    <h1>User List</h1>
    <form @submit.prevent="addUser">
      <input v-model="name" placeholder="Enter Name" /><br />
      <input v-model="email" placeholder="Enter Email" /><br />
      <input
        v-model="password"
        type="password"
        placeholder="Enter Password"
      /><br />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      name: '',
      email: '',
      password: '',
    };
  },
  async mounted() {
    const res = await axios.get('http://localhost:3000/users');
    this.users = res.data;
  },
  methods: {
    async addUser() {
      const res = await axios.post('http://localhost:3000/user/add', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.users.push(res.data);
      this.name = '';
      this.email = '';
      this.password = '';
    },
  },
};
</script>
