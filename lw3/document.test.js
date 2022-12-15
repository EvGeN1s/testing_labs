import Document from "./document.js";
import MockItemRepository from "./item/itemRepository";
import {Item, itemType} from "./item/item";
import {IndexOutOfRangeError, InvalidItemTypeError} from "./item/errors";

const defaultTitle = "title"
const defaultSize = 300
const defaultUrl = "example.com/image"
const defaultText = "text"

test('Create document', () => {
    const mockRepo = new MockItemRepository()

    let doc = new Document(defaultTitle, mockRepo)

    expect(doc._title).toBe(defaultTitle)
    expect(doc._items).toHaveLength(0)
    expect(doc._itemRepository).toBeDefined()
})

test('Insert image in the end of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)

    doc.addImage(null, defaultSize, defaultSize, defaultUrl)

    expect(doc._items).toHaveLength(1)
    expect(doc._items[0].id).toBe(0)
    expect(doc._items[0].width).toBe(defaultSize)
    expect(doc._items[0].height).toBe(defaultSize)
    expect(doc._items[0].path).toBe(defaultUrl)
    expect(doc._itemRepository._storage.size).toBe(1)
})

test('Insert image in the center of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id1 = doc._itemRepository.nextId()
    let item1 = new Item(id1, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item1)
    doc._itemRepository._storage.set(id1, item1)
    let id2 = doc._itemRepository.nextId()
    let item2 = new Item(id2, itemType.image)
    item2.setWidth(defaultSize)
    item2.setHeight(defaultSize)
    item2.setPath(defaultUrl)
    doc._items.push(item2)
    doc._itemRepository._storage.set(id2, item2)

    doc.addImage(1, defaultSize, defaultSize, defaultUrl)

    expect(doc._items).toHaveLength(3)
    expect(doc._items[1].id).toBe(2)
    expect(doc._items[1].width).toBe(defaultSize)
    expect(doc._items[1].height).toBe(defaultSize)
    expect(doc._items[1].path).toBe(defaultUrl)
    expect(doc._itemRepository._storage.size).toBe(3)
})

test('Copy image in end of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.image)
    item.setHeight(defaultSize)
    item.setWidth(defaultSize)
    item.setPath(defaultUrl)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    doc.copyImage(null, id)

    expect(doc._items).toHaveLength(2)
    expect(doc._items[1].id).toBe(0)
    expect(doc._items[1].type).toBe(itemType.image)
    expect(doc._items[1]).toEqual(item)
    expect(doc._itemRepository._storage.size).toBe(1)
})

test('Copy image into center of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id1 = doc._itemRepository.nextId()
    let item1 = new Item(id1, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item1)
    doc._itemRepository._storage.set(id1, item1)
    let id2 = doc._itemRepository.nextId()
    let item2 = new Item(id2, itemType.image)
    item2.setWidth(defaultSize)
    item2.setHeight(defaultSize)
    item2.setPath(defaultUrl)
    doc._items.push(item2)
    doc._itemRepository._storage.set(id2, item2)

    doc.copyImage(1, id2)

    expect(doc._items).toHaveLength(3)
    expect(doc._items[1].id).toBe(id2)
    expect(doc._items[1].width).toBe(defaultSize)
    expect(doc._items[1].height).toBe(defaultSize)
    expect(doc._items[1].path).toBe(defaultUrl)
    expect(doc._itemRepository._storage.size).toBe(2)
})

test('Insert paragraph in begin of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.image)
    item.setHeight(defaultSize)
    item.setWidth(defaultSize)
    item.setPath(defaultUrl)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    doc.addParagraph(0, defaultText)

    expect(doc._items).toHaveLength(2)
    expect(doc._items[0].id).toBe(1)
    expect(doc._items[0].type).toBe(itemType.paragraph)
    expect(doc._items[0].text).toBe(defaultText)
    expect(doc._itemRepository._storage.size).toBe(2)
})

test('Insert paragraph in end of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)

    doc.addParagraph(null, defaultText)

    expect(doc._items).toHaveLength(1)
    expect(doc._items[0].id).toBe(0)
    expect(doc._items[0].type).toBe(itemType.paragraph)
    expect(doc._items[0].text).toBe(defaultText)
    expect(doc._itemRepository._storage.size).toBe(1)
})

test('Insert image in the center of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id1 = doc._itemRepository.nextId()
    let item1 = new Item(id1, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item1)
    doc._itemRepository._storage.set(id1, item1)
    let id2 = doc._itemRepository.nextId()
    let item2 = new Item(id2, itemType.image)
    item2.setWidth(defaultSize)
    item2.setHeight(defaultSize)
    item2.setPath(defaultUrl)
    doc._items.push(item2)
    doc._itemRepository._storage.set(id2, item2)

    doc.addParagraph(1, defaultText)

    expect(doc._items).toHaveLength(3)
    expect(doc._items[1].id).toBe(2)
    expect(doc._items[1].text).toBe(defaultText)
    expect(doc._itemRepository._storage.size).toBe(3)
})

test('Copy paragraph into begin of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.paragraph)
    item.setText(defaultText)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    doc.copyParagraph(0, id)

    expect(doc._items).toHaveLength(2)
    expect(doc._items[0].id).toBe(0)
    expect(doc._items[0].text).toBe(defaultText)
    expect(doc._itemRepository._storage.size).toBe(1)
})


test('Copy paragraph into center of the document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id1 = doc._itemRepository.nextId()
    let item1 = new Item(id1, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item1)
    doc._itemRepository._storage.set(id1, item1)
    let id2 = doc._itemRepository.nextId()
    let item2 = new Item(id2, itemType.image)
    item2.setWidth(defaultSize)
    item2.setHeight(defaultSize)
    item2.setPath(defaultUrl)
    doc._items.push(item2)
    doc._itemRepository._storage.set(id2, item2)

    doc.copyParagraph(1, id1)

    expect(doc._items).toHaveLength(3)
    expect(doc._items[1].id).toBe(id1)
    expect(doc._items[1].text).toBe(defaultText)
    expect(doc._itemRepository._storage.size).toBe(2)
})

test ('Gets item from begin', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.paragraph)
    item.setText(defaultText)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    let storedItem = doc.getItem(0)

    expect(storedItem.id).toBe(id)
    expect(storedItem.text).toBe(defaultText)
})

test ('Get item from mid of a document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id1 = doc._itemRepository.nextId()
    let item1 = new Item(id1, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item1)
    doc._itemRepository._storage.set(id1, item1)
    let id2 = doc._itemRepository.nextId()
    let item2 = new Item(id2, itemType.image)
    item2.setWidth(defaultSize)
    item2.setHeight(defaultSize)
    item2.setPath(defaultUrl)
    doc._items.push(item2)
    doc._itemRepository._storage.set(id2, item2)
    let id3 = doc._itemRepository.nextId()
    let item3 = new Item(id3, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item3)
    doc._itemRepository._storage.set(id3, item3)

    let storedItem = doc.getItem(1)

    expect(storedItem.id).toBe(id2)
    expect(storedItem.type).toBe(itemType.image)
    expect(storedItem.width).toBe(defaultSize)
    expect(storedItem.height).toBe(defaultSize)
    expect(storedItem.path).toBe(defaultUrl)
})

test('Remove item from document', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.paragraph)
    item.setText(defaultText)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    doc.deleteItem(0)

    expect(doc._items).toHaveLength(0)
    expect(doc._itemRepository._storage.size).toBe(0)
})

test('Remove item from document with image and pargraph', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id1 = doc._itemRepository.nextId()
    let item1 = new Item(id1, itemType.paragraph)
    item1.setText(defaultText)
    doc._items.push(item1)
    doc._itemRepository._storage.set(id1, item1)
    let id2 = doc._itemRepository.nextId()
    let item2 = new Item(id2, itemType.image)
    item2.setWidth(defaultSize)
    item2.setHeight(defaultSize)
    item2.setPath(defaultUrl)
    doc._items.push(item2)
    doc._itemRepository._storage.set(id2, item2)

    doc.deleteItem(0)

    expect(doc._items).toHaveLength(1)
    expect(doc._items).toContain(item2)
    expect(doc._itemRepository._storage.size).toBe(1)
})

test('Delete copy of item should not remove it from repo', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.paragraph)
    item.setText(defaultText)
    doc._items.push(item)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    doc.deleteItem(0)

    expect(doc._items).toHaveLength(1)
    expect(doc._items).toContain(item)
    expect(doc._itemRepository._storage.size).toBe(1)
})

test('Try copy paragraph from image', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.image)
    item.setHeight(defaultSize)
    item.setWidth(defaultSize)
    item.setPath(defaultUrl)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    let fn = () => {
        doc.copyParagraph(0, id)
    }

    expect(fn).toThrow(InvalidItemTypeError)
})

test('Try copy image from paragraph', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.paragraph)
    item.setText(defaultText)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    let fn = () => {
        doc.copyImage(0, id)
    }

    expect(fn).toThrow(InvalidItemTypeError)
})

test('Try copy paragraph in invalid position', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.paragraph)
    item.setText(defaultText)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    let fn = () => {
        doc.copyParagraph(1, id)
    }

    expect(fn).toThrow(IndexOutOfRangeError)
})

test('Try copy image in invalid position', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)
    let id = doc._itemRepository.nextId()
    let item = new Item(id, itemType.image)
    item.setHeight(defaultSize)
    item.setWidth(defaultSize)
    item.setPath(defaultUrl)
    doc._items.push(item)
    doc._itemRepository._storage.set(id, item)

    let fn = () => {
        doc.copyImage(1, id)
    }

    expect(fn).toThrow(IndexOutOfRangeError)
})

test('Try add image in invalid position', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)

    let fn = () => {doc.addImage(2, defaultSize, defaultSize, defaultUrl)}

    expect(fn).toThrow(IndexOutOfRangeError)
})

test('Try add paragraph in invalid position', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)

    let fn = () => {doc.addParagraph(2, defaultText)}

    expect(fn).toThrow(IndexOutOfRangeError)
})

test('Try delete item from invalid position', () => {
    const mockRepo = new MockItemRepository()
    let doc = new Document(defaultTitle, mockRepo)

    let fn = () => {doc.deleteItem(1)}

    expect(fn).toThrow(IndexOutOfRangeError)
})