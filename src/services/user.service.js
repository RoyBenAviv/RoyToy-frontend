import axios from 'axios';
import { utilService } from './util.service.js';


export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser
};

const BASE_URL = (process.env.NODE_ENV !== 'development') ? '/api/auth' : '//localhost:3030/api/auth';

async function login(user) {
    try {
        const res = await axios.post(`${BASE_URL}/login`, user);
        const currUser = await res.data;
        utilService.saveToStorage('loggedinUser', currUser)
        return currUser;
    }
    catch (err) {
        console.log('Cannot login', err);
    }

}

async function signup(user) {
    try {
        const res = await axios.post(`${BASE_URL}/signup`, user);
        const currUser = res.data;
        utilService.saveToStorage('loggedinUser', currUser);
        return currUser;
    }
    catch (err) {
        console.log('Cannot signup', err);
    }
}

async function logout() {
    try {
        await axios.post(`${BASE_URL}/logout`)
        utilService.removeFromStorage('loggedinUser');
    }
    catch(err) {
        console.log('Cannot log out', err)
    }
}
function getLoggedinUser() {
    return utilService.loadFromStorage('loggedinUser')
}