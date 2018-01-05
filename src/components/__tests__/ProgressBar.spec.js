import { mount } from 'vue-test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('has no show class onn initial render', () => {
    const wrapper = mount(ProgressBar)
    expect(wrapper.classes()).not.toContain('show') // #A
  })

  test('initializes with 0% width', () => {
    const wrapper = mount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%') // #A
  })

  test('sets .progress width as same value of vm.percentage', () => {
    const wrapper = mount(ProgressBar)
    const percent = 70
    wrapper.setData({ percent }) // #A
    expect(wrapper.element.style.width).toBe(`${percent}%`)// #B
  })
})
