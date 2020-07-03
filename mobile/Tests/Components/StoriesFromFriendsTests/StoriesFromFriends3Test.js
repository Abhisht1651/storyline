import { shallow } from 'enzyme'
import React from 'react'
import StoriesFromFriends3 from '../../../App/Components/StoriesFromFriends/StoriesFromFriends3'

describe('StoriesFromFriends3', () => {
  it('should match to snapshot', () => {
    const component = shallow(<StoriesFromFriends3 />)
    expect(component).toMatchSnapshot()
  })
  it('should render Image', () => {
    const component = shallow(<StoriesFromFriends3 />)
    expect(component.find('Image')).toHaveLength(3)
  })
})
