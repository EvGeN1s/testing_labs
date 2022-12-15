import ShopAPI from "../src/api/shopAPI";
import * as fs from "fs";
import {AssertProductsEqual, GetElementByID} from "./utils/test";
import DeleteProductException from "../src/api/exception/deleteProductException";
import CreateProductException from "../src/api/exception/createProductException";
import EditProductException from "../src/api/exception/editProductException";

describe('Test store API', () => {
    let _shop
    let _requestData
    let _createdItems = []

    async function testCreateProduct(product) {
        let responseData = await _shop.createProduct(product)

        let products = await _shop.getAllProducts()
        product.id = parseInt(responseData.id)
        product.status = responseData.status
        _createdItems.push(product)
        let storedItem = GetElementByID(products, product.id)
        expect(storedItem).not.toBeNull()
        AssertProductsEqual(storedItem, product)
    }

    async function testCreateProductFail(product) {
        let fn = async () => {
            await _shop.createProduct(product)
        }

        console.log(product.title)
        await expect(fn).rejects.toThrow(CreateProductException)
    }

    async function testEditProduct(product, editedProduct) {
        let responseData = await _shop.createProduct(product)
        product.id = parseInt(responseData.id)
        product.status = responseData.status
        _createdItems.push(product)
        editedProduct.id = parseInt(responseData.id)
        editedProduct.status = responseData.status

        await _shop.editProduct(editedProduct)

        let products = await _shop.getAllProducts()
        let storedItem = GetElementByID(products, editedProduct.id)
        expect(storedItem).not.toBeNull()
        AssertProductsEqual(storedItem, editedProduct)
    }

    async function testEditProductFail(product, editedProduct) {
        let responseData = await _shop.createProduct(product)
        product.id = parseInt(responseData.id)
        product.status = responseData.status
        _createdItems.push(product)
        editedProduct.id = parseInt(responseData.id)

        let fn = async () => {
            await _shop.editProduct(editedProduct)
        }

        console.log(product.title)
        await expect(fn).rejects.toThrow(EditProductException)
    }

    jest.setTimeout(30 * 1000)
    beforeAll(() => {
        _shop = new ShopAPI()
        _requestData = JSON.parse(fs.readFileSync("./test/data/request_data.json"))
    })

    it("Create valid products", async () => {
        /*for (let testCaseData of _requestData.create_products) {
            await testCreateProduct(testCaseData.product)
        }*/
    })

    it("Create valid products with same title", async () => {
        let product = _requestData.unique_product

        await _shop.createProduct(product)
        let responseData = await _shop.createProduct(product)

        let products = await _shop.getAllProducts()
        product.id = parseInt(responseData.id)
        product.status = responseData.status
        _createdItems.push(product)
        let storedItem = GetElementByID(products, product.id)
        expect(storedItem).not.toBeNull()
        AssertProductsEqual(storedItem, product)
        expect(product.alias === storedItem.alias)
    })


    it('create invalid products', async () => {
        for (let testCaseData of _requestData.create_products_fail) {
            await testCreateProductFail(testCaseData.product)
        }
    })

    it('delete product', async () => {
        let product = _requestData.create_products[0].product
        let responseData = await _shop.createProduct(product)

        await _shop.deleteProduct(responseData.id)

        let storedItem = GetElementByID(await _shop.getAllProducts(), parseInt(responseData.id))
        expect(storedItem).toBeNull()
    })

    it('delete product with invalid id', async () => {
        let fn = async () => {
            await _shop.deleteProduct(Number.MAX_SAFE_INTEGER)
        }

        await expect(fn).rejects.toThrow(DeleteProductException)
    })

    it('delete already deleted product', async () => {
        let responseData = await _shop.createProduct(_requestData.create_products[0].product)
        await _shop.deleteProduct(responseData.id)

        let fn = async () => {
            await _shop.deleteProduct(responseData.id)
        }

        await expect(fn).rejects.toThrow(DeleteProductException)
    })

    it('test edit product', async () => {
        /*for (let testCaseData of _requestData.edit_products) {
            await testEditProduct(testCaseData.product, testCaseData.edited_product)
        }*/
    })

    it('test edit product with same title', async () => {
        let product1 = _requestData.unique_product
        let product2 = _requestData.create_products[0].product
        let editedProduct = _requestData.unique_product
        let responseData = await _shop.createProduct(product1)
        product1.id = parseInt(responseData.id)
        product1.status = responseData.status
        _createdItems.push(product1)
        responseData = await _shop.createProduct(product2)
        product2.id = parseInt(responseData.id)
        product2.status = responseData.status
        _createdItems.push(product2)
        editedProduct.id = parseInt(responseData.id)
        editedProduct.status = responseData.status

        await _shop.editProduct(editedProduct)

        let products = await _shop.getAllProducts()
        let storedItem = GetElementByID(products, editedProduct.id)
        expect(storedItem).not.toBeNull()
        AssertProductsEqual(storedItem, editedProduct)
        expect(storedItem.alias).toBe(editedProduct.title + editedProduct.id)
    })

    it('test edit product fail', async () => {
        for (let testCaseData of _requestData.edit_products_fail) {
            await testEditProductFail(testCaseData.product, testCaseData.edited_product)
        }
    })

    afterEach(async () => {
        for (let product of _createdItems) {
            await _shop.deleteProduct(product.id)
        }
        _createdItems = []
    })
})
