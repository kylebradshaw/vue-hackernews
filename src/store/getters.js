export default {
  activeIds (state) {
    const { activeType, itemsPerPage, lists } = state
    if (!activeType) {
      return []
    }

    const page = Number(state.route.params.page) || 1 // #A
    const start = (page - 1) * itemsPerPage // #B
    const end = page * itemsPerPage // #C
    return lists[activeType].slice(start, end) // #D
  },

  activeItems (state, getters) {
    return getters.activeIds.map(id => state.items[id]).filter(_ => _)
  }
}
