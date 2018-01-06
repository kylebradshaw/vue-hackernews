import getters from '../getters'

describe('getters', () => {
  test('activeIds returns an empty array when state.lists is undefined', () => {
    const result = getters.activeIds({ activeType: undefined, lists: undefined })
    expect(result).toEqual([])
  })

  test('activeIds returns items from the active list using the itemsPerPage if no page is active', () => { // #A
    const activeType = 'top'
    const itemsPerPage = 20
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const lists = {
      top: [...numberArray]
    }
    const result = getters.activeIds({ activeType, itemsPerPage, lists, route: { params: {} } }) // #B
    expect(result.length).toEqual(itemsPerPage)
    for (let i = 0; i < itemsPerPage; i++) { // #C
      expect(result[i]).toEqual(numberArray[i])
    }
  })

  test('activeItems returns state.items that match the activeIds', () => {
    const activeIds = ['a', 'b']
    const state = {
      items: {
        'a': {id: 1},
        'b': {id: 2}
      }
    }
    const activeItems = getters.activeItems(state, { activeIds })
    expect(activeItems[0]).toBe(state.items.a)
    expect(activeItems[1]).toBe(state.items.b)
  })

  test('activeIds returns items from the active list using the itemsPerPage and page parameter', () => {
    const activeType = 'top'
    const itemsPerPage = 10
    const route = { // #A
      params: {
        page: 2 // #B
      }
    }
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const lists = {
      top: [...numberArray] // #C
    }
    const store = {
      activeType,
      itemsPerPage,
      lists,
      route
    }
    const result = getters.activeIds(store) // #D
    expect(result.length).toEqual(itemsPerPage) // #E
    for (let i = 0; i < itemsPerPage; i++) {
      expect(result[i]).toEqual(numberArray[i + 10]) // #F
    }
  })
})
