export default class DeleteProductException extends  Error {
    constructor() {
        super()

        this.name = 'DeleteProductException'
        this.message = 'Can not delete product'
    }
}