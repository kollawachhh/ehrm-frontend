import { mount } from '@vue/test-utils'
import TaskList from '@/views/user/TaskList'

describe('TaskList', () => {
  it('has data', () => {
    expect(typeof TaskList.methods).toBe('object')
  })
})


describe('TaskList', () => {
  it('should return the correct number of log in list', () => {
    let logList = [
      { data: 0 }, { data: 1 }, { data: 2 }, { data: 3 },
      { data: 4 }, { data: 5 }, { data: 6 }
    ]
    const wrapper = mount(TaskList, {
      propsData: {
        logList
      }
    })

    wrapper.vm.fetchLogs()

    expect(logList.length).toBe(7)
  })
})
