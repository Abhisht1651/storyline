import React from 'react'
import { View } from 'react-native'
import styles from '../Styles/StoriesFromFriendsStyles/DisplayScreenStyle'
import StoriesFromFriends1 from './StoriesFromFriends1'
import StoriesFromFriends2 from './StoriesFromFriends2'
import StoriesFromFriends3 from './StoriesFromFriends3'

const DisplayScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <StoriesFromFriends1 />
      </View>
      <View style={styles.box}>
        <StoriesFromFriends2 />
      </View>
      <View style={styles.box}>
        <StoriesFromFriends3 />
      </View>
    </View>
  )
}

export default DisplayScreen
