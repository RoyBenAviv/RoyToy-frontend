<template>
    <section class="log-page">
        <h1>LOGIN/SIGNUP Page</h1>
        <section v-if="user">
            <h2>Welcome {{ user.fullname }}</h2>
            <button @click="logout">Logout</button>
        </section>
        <form v-else @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Enter username" />
            <input type="text" v-model="password" placeholder="Enter password" />
            <button>Login</button>
        </form>
        <hr />
        <h4>Signup</h4>
        <form @submit.prevent="signup">
            <input type="text" v-model="fullname" placeholder="Enter fullname" />
            <input type="text" v-model="username" placeholder="Enter username" />
            <input type="text" v-model="password" placeholder="Enter password" />
            <button>Signup</button>
        </form>
    </section>
</template>
 
<script>
// import { userService } from '../services/user.service.js';

export default {


    name: 'Login Page',
    data() {
        return {
            user: {
            fullname: '',
            username: '',
            password: ''
            }

        };
    },
    methods: {
        async login() {

            const user = {
                username: this.username,
                password: this.password
            };

            try {
                await this.$store.dispatch({ type: 'setUser', user });
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        },
        async logout() {
            try {
                await this.$store.dispatch('logout');
                this.$router.push('/');
                this.username = null;
                this.password = null;
            }
            catch (err) {
                console.log(err);
            }
        },
        async signup() {
            const user = {
                username: this.username,
                password: this.password,
                fullname: this.fullname
            }
            try {
                await this.$store.dispatch({ type: 'signup', user })
                this.$router.push('/');
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    created() {

    },
    computed: {
        user() {
            return this.$store.getters.getUser;
        }
    },
    components: {
    }
};
</script>
 
<style>
</style>