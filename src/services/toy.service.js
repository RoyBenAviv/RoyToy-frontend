import axios from 'axios';



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
    : '//localhost:3030/api/toy'
    return `${BASE_URL}/${id}`
}

function query(filterBy) {
    return axios.get(_getUrl(), { params: filterBy })
        .then(res => res.data);
}

function getById(toyId) {
    return axios.get(_getUrl(toyId))
        .then(res => res.data);
}

function remove(toyId) {
    return axios.delete(_getUrl(toyId));
}

function save(toy) {
    if (toy._id) return axios.put(_getUrl(toy._id), toy).then(res => res.data);
    else return axios.post(_getUrl(), toy).then(res => res.data);
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