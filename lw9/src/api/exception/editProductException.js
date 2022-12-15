export default class EditProductException  extends Error {
    constructor() {
        super()

        this.name = 'EditProductException'
        this.message = 'Can not edit product'
    }
}