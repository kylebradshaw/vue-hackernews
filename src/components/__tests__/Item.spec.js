// import Item from '../Item.vue'
// import Vue from 'vue'

// describe('Item.vue', () => {
//   test('renders item', () => {
//     const Ctor = Vue.extend(Item) // component
//     const vm = new Ctor().$mount() // mount component
//     expect(vm.$el.textContent).toContain('item')
//   })
// })

// // Now we’ve got our first component test running.
// // As you can see, mounting a component requires quite a bit of code.
// // Luckily there’s an official Vue testing library that mounts components for you.In the next section, we’ll use vue - test - utils to simplify the test code in Item.spec.js.

// REDO with vue-test-utils
// import { mount } from 'vue-test-utils'
// import Item from '../Item.vue'

// describe.only('Item.vue', () => {
//   test('should render an item', () => {
//     const wrapper = mount(Item)
//     expect(wrapper.vm.$el.textContent).toContain('item')
//   })
// })

// REDO WITH SHALLOW
import { shallow } from 'vue-test-utils'
import Item from '../Item.vue'

// describe.only('Item.vue', () => {
test('should render an item', () => {
  const wrapper = shallow(Item)
  debugger
  expect(wrapper.text()).toContain('item')
})
// })
