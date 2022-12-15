import {Item, itemType} from "./item/item";
import {IndexOutOfRangeError, InvalidItemTypeError} from "./item/errors";

export default class Document {
    _title
    _items = []

    /** @type MockItemRepository */
    _itemRepository;

    constructor(title, repo) {
        this._title = title
        this._itemRepository = repo
    }

    get title() {
        return this._title
    }

    /** @param {string} title */
    setTitle(title) {
        this._title = title
    }

    /**
     * @param {number|null} position
     * @param {number} width
     * @param {number} height
     * @param {string} path
     */
    addImage(position, width, height, path) {
        let id = this._itemRepository.nextId()

        let item = new Item(id, itemType.image)
        item.setWidth(width)
        item.setHeight(height)
        item.setPath(path)

        this._insertItem(position, item)

        this._itemRepository.save(item)
    }

    copyImage(position, id) {
        let item = this._itemRepository.findOne(id)
        if (item.type !== itemType.image) {
            throw new InvalidItemTypeError(id, itemType.image, item.type)
        }

        this._insertItem(position, item)
    }

    addParagraph(position, text) {
        let id = this._itemRepository.nextId()

        let item = new Item(id, itemType.paragraph)
        item.setText(text)

        this._insertItem(position, item)

        this._itemRepository.save(item)
    }

    copyParagraph(position, id) {
        let item = this._itemRepository.findOne(id)
        if (item.type !== itemType.paragraph) {
            throw new InvalidItemTypeError(id, itemType.paragraph, item.type)
        }

        this._insertItem(position, item)
    }

    getItem(position) {
        this._assertPosition(position)

        return this._items[position]
    }

    deleteItem(position) {
        this._assertPosition(position)

        let item = this._items[position]
        let sameItems = 0
        this._items.forEach(value => {
            if (value.id === item.id) {
                sameItems++
            }
        })

        if (sameItems === 1) {
            this._itemRepository.remove(item.id)
        }

        this._items = this._items.slice(0, position).concat(this._items.slice(position+1))
    }

    _insertItem(position, item) {
        if (position === null) {
            this._items.push(item)
            return
        }

        this._assertPosition(position)

        let newItems = this._items.slice(0, position)
        newItems.push(item)
        this._items = newItems.concat(this._items.slice(position))
    }

    _assertPosition(position) {
        if (position < 0 || position >= this._items.length) {
            throw new IndexOutOfRangeError(position)
        }
    }
}
