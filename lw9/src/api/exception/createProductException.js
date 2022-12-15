export default class CreateProductException extends  Error {
    constructor() {
        super()

        this.name = 'CreateProductException'
        this.message = 'Can not create product'
    }
}