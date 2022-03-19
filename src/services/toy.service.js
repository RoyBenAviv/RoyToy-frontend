import axios from 'axios';

axios.defaults.withCredentials = true

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy
};

function _getUrl(id = '') {
    const BASE_URL =
        process.env.NODE_ENV !== 'development'
            ? '/api/toy'
            : '//localhost:3030/api/toy';
    return `${BASE_URL}/${id}`;
}

async function query(filterBy) {
    try {
        const res = await axios.get(_getUrl(), { params: filterBy })
        return res.data
    }
    catch (err) {
        console.log('Cannot load toys', err);
    }
}

// function getById(toyId) {
    
//     return axios.get(_getUrl(toyId))
//         .then(res => res.data);
// }

async function getById(toyId) {
    try {
        const res = await axios.get(_getUrl(toyId))
        return res.data
    }
    catch(err) {
        console.log('Cannot find toy', toy)
    }
}

async function remove(toyId) {
    try {
        const res = await axios.delete(_getUrl(toyId));
        return res.data
    }
    catch(err) {
        console.log('Cannot remove toy', err)
    }
}

async function save(toy) {
    if (toy._id) {
        try {
            const res = await axios.put(_getUrl(toy._id), toy)
            return res.data
        }
        catch(err) {
            console.log('Cannot save toy', err)
        }
    } 
    else {
        try {
            const res = await axios.post(_getUrl(), toy)
            return res.data
        }
        catch(err) {
            console.log('Cannot add a new toy', err)
        }
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        inStock: true,
        labels: [],
        reviews: [],
        url: ''
    };
}