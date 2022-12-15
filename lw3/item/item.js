export const itemType = {
    image: "image",
    paragraph: "paragraph"
}


export class Item {
    _id;
    _type;

    _width;
    _height;
    _path;

    _text;

    /**
     * @param {number} id
     * @param {string} type
     */
    constructor(id, type) {
        this._id = id
        this._type = type
    }

    get id() {
        return this._id
    }

    get type() {
        return this._type
    }

    get width() {
        return this._width
    }

    /** @param {number} width */
    setWidth(width) {
        this._width = width
    }

    get height() {
        return this._height
    }

    setHeight(height) {
        this._height = height
    }

    get path() {
        return this._path
    }

    setPath(path) {
        this._path = path
    }

    get text() {
        return this._text
    }

    setText(text) {
        this._text = text
    }


}
