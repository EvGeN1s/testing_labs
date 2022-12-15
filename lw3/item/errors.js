export class IndexOutOfRangeError extends Error {
    constructor(index) {
        super();

        this.name = "IndexOutOfRangeError"
        this.message = "Index is out of range " + index
    }
}

export class InvalidItemTypeError extends Error {
    constructor(id, exceptedType, gottenType) {
        super();

        this.name = "InvalidItemTypeError"
        this.message = "Item with id: " + id + "has " + gottenType + " type, excepted " + exceptedType
    }
}

