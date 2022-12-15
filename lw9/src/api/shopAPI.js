import axios from "axios";
import {CREATE_PRODUCT_URL, DELETE_PRODUCT_URL, EDIT_PRODUCT_URL, GET_PRODUCT_URL} from "./links";
import CreateProductException from "./exception/createProductException";
import EditProductException from "./exception/editProductException";
import DeleteProductException from "./exception/deleteProductException";

export default class ShopAPI {
    constructor() {
    }

    async getAllProducts() {
        let data
        await axios.get(GET_PRODUCT_URL, {responseType: "json"}).then(
            async (response) => {
                data = response.data
            }
        )
        return data
    }

    async createProduct(data) {
        let responseData
        await axios.post(CREATE_PRODUCT_URL, data, {responseType: "json"}).then((response) => {
            responseData = response.data

        })
        if (responseData.status !== undefined && responseData.status === 0) {
            throw new CreateProductException()
        }
        return responseData
    }

    async editProduct(data) {
        let responseData
        await axios.post(EDIT_PRODUCT_URL, data, {responseType: "json"}).then((response) => {
            responseData = response.data

        })
        if (responseData.status !== undefined && responseData.status === 0) {
            throw new EditProductException()
        }
    }

    async deleteProduct(id) {
        let responseData
        await axios.get(DELETE_PRODUCT_URL + `?id=${id}`, {responseType: "json"}).then((response) => {
            responseData = response.data

        })
        if (responseData.status !== undefined && responseData.status === 0) {
            throw new DeleteProductException()
        }
    }

}