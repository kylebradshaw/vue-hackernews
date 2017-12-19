import getters from '../getters'

describe.only('getters', () => {
  test('activeIds returns an empty array when state.lists is undefined', () => {
    const result = getters.activeIds({ route: { params: {} } })
    expect(result).toEqual([])
  })

  test('activeIds returns items from the active list using the itemsPerPage if no page is active', () => {
    const activeType = 'top'
    const itemsPerPage = 20
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const lists = {
      top: [...numberArray]
    }
    const result = getters.activeIds({ activeType, itemsPerPage, lists, route: { params: {} } })
    expect(result.length).toEqual(itemsPerPage)
    for (let i = 0; i < itemsPerPage; i++) {
      expect(result[i]).toEqual(numberArray[i])
    }
  })

  test('activeIds returns items from the active list using the itemsPerPage and page parameter', () => {
    const activeType = 'top'
    const itemsPerPage = 10
    const route = {
      params: {
        page: 2
      }
    }
    var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const lists = {
      top: [...numberArray]
    }
    const store = {
      activeType,
      itemsPerPage,
      lists,
      route
    }
    const result = getters.activeIds(store)
    expect(result.length).toEqual(itemsPerPage)
    for (let i = 0; i < itemsPerPage; i++) {
      expect(result[i]).toEqual(numberArray[i + 10])
    }
  })

  test('activeItems returns state.items that match the activeIds', () => {
    const activeIds = ['a', 'b']
    const state = {
      items: {
        'a': {id: 1},
        'b': {id: 2}
      },
      route: {
        params: {}
      }
    }
    const activeItems = getters.activeItems(state, { activeIds })
    expect(activeItems[0]).toBe(state.items.a)
    expect(activeItems[1]).toBe(state.items.b)
  })
})
