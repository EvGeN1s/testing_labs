export default class MockItemRepository {
    _currId = 0
    _storage = new Map()

    nextId() {
        return this._currId++
    }

    findOne(id) {
        return this._storage.get(id)
    }

    save(item) {
        this._storage.set(item.id, item)
    }

    remove(id) {
        let ok = this._storage.delete(id)
    }
}