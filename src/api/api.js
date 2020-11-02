import * as axios from "axios";

const instanse = axios.create({
    baseURL: `http://localhost:3000`
})

export let api = {
    setAuthData: (data) =>
        axios.post(`http://localhost:3012/api/register`, data),
    loginData: (data) =>
        axios.post(`http://localhost:3012/api/login`, data),
    cardData: (start) =>
        axios.get(`http://localhost:3012/api/products/${start}`/*"http://localhost:3000/data.json"*/),
    basketData: () =>
        instanse.get(`/basket.json`),
    fetch: (token) =>
        axios.get(`http://localhost:3012/api/verify`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'authorization': `Bearer ${token}`
            }
        }),
    sendDataCard: (data) => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("price", data.price)
        formData.append("model", data.model)
        formData.append("image", data.image)
        formData.append("emblem", data.emblem)
        formData.append("gender", data.gender)
        formData.append("descript", data.descript)
        formData.append("country", data.country)
        formData.append("type", data.type)
        formData.append("classific", data.classific)
        formData.append("start_note", data.start_note)
        formData.append("end_node", data.end_node)

        return axios.post(`http://localhost:3012/api/new/product`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    orderData: (data) =>
        axios.post(`http://localhost:3012/api/new/order`, data),

    getOrderData: () =>
        axios.get(`http://localhost:3012/api/orders`),
    removeOrdersItem: (id) =>
        axios.delete(`http://localhost:3012/api/orders/${id}`),
    removeCatalogItem: (id) =>
        axios.delete(`http://localhost:3012/api/product/delete/${id}`),
    getProfile: (id) =>
        axios.get(`http://localhost:3012/api/product/${id}`)
}
