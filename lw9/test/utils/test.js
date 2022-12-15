export function GetElementByID(elements, id) {
    for (let element of elements) {
        if (parseInt(element.id) === id) {
            return element
        }
    }
    return null
}

export function AssertProductsEqual(product1, product2) {
    expect(parseInt(product1.id)).toBe(product2.id)
    expect(product1.categoryID).toBe(product2.categoryID)
    expect(product1.title).toBe(product2.title)
    expect(product1.content).toBe(product2.content)
    expect(parseInt(product1.price)).toBe(product2.price)
    expect(parseInt(product1.old_price)).toBe(product2.old_price)
    expect(product1.keywords).toBe(product2.keywords)
    expect(product1.description).toBe(product2.description)
    expect(parseInt(product1.hit)).toBe(product2.hit)
}