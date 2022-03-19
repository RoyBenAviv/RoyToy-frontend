import { userService } from '../services/user.service.js'


export default {
    state: {
        user: userService.getLoggedinUser()
    },
    getters: {
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, {user}) {
            state.user = user
        },
        logout(state) {
            state.user = null
        }
    },
    actions: {
        async setUser({commit}, { user }) {
            try {
                console.log(user)
               var user = await userService.login(user)
               commit({type: 'setUser', user})
            }
            catch(err) {
                console.log('cannot set user', err)
            }
        },
        async logout({commit}) {
            try {
                await userService.logout()
                commit('logout')
            }
            catch(err) {
                console.log('logout failed', err)
            }
        },
        async signup({commit}, { user }) {
            try {
                var user = await userService.signup(user)
                commit({type: 'setUser', user})
            }
            catch(err) {
                console.log('signup failed', err)
            }

        }
    }
}