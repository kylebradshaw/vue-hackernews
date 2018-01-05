import { shallow } from 'vue-test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  test('has no show class on initial render', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.classes()).not.toContain('show') // #A
  })

  test('initializes with 0% width', () => {
    const wrapper = shallow(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%') // #A
  })

  test('sets .progress width as same value of vm.percentage', () => {
    const wrapper = shallow(ProgressBar)
    const percent = 70
    wrapper.setData({ percent }) // #A
    expect(wrapper.element.style.width).toBe(`${percent}%`)// #B
  })

  test('renders element with width 0% when start is called', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.setData({ percent: 70 }) // #A
    wrapper.vm.start()
    wrapper.update()
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('adds class show when start is called', () => {
    const wrapper = shallow(ProgressBar)
    wrapper.vm.start()
    wrapper.update()
    expect(wrapper.classes()).toContain('show')
  })

test('adds class error when fail is called', () => {
  const wrapper = shallow(ProgressBar)
  wrapper.vm.fail()
  wrapper.update()
  expect(wrapper.classes()).toContain('error')
})

test('renders element with width 100% when fail is called', () => {
  const wrapper = shallow(ProgressBar)
  wrapper.vm.fail()
  wrapper.update()
  expect(wrapper.element.style.width).toBe('100%')
})

test('removes class show when finish is called', () => {
  const wrapper = shallow(ProgressBar)
  wrapper.vm.start()
  wrapper.vm.finish()
  wrapper.update()
  expect(wrapper.classes()).not.toContain('show')
})

test('sets width to 100% when finish is called ', () => {
  const wrapper = shallow(ProgressBar)
  wrapper.vm.finish()
  wrapper.update()
  expect(wrapper.element.style.width).toBe('100%')
})
})
