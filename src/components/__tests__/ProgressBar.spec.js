import { shallow } from 'vue-test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('has no show class onn initial render', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.classes()).not.toContain('show')
  })

  test('initializes with 0% width', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('sets .progress width as same value of vm.percentage', () => {
    const wrapper = shallow(ProgressBar)
    const percent = 70
    wrapper.setData({ percent })
    expect(wrapper.element.style.width).toBe(`${percent}%`)
  })
})
