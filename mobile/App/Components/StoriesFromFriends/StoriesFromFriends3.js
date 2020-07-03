// @flow

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Images from '../../Themes/Images'
import styles from '../Styles/StoriesFromFriendsStyles/StoriesFromFriends3Style'

type Props = {
  image1: Image,
  image2: Image,
  name: string,
  onPress: () => {}
}

const StoriesFromFriends3 = (props: Props) => {
  const { image1, image2, name, onPress } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TouchableOpacity style={styles.profilePicture} activeOpacity={1}>
        <Image source={image1} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.TriangleShapeCSS} />
      <TouchableOpacity activeOpacity={1} style={styles.storyIcon}>
        <View style={styles.smallImageContainer}>
          <Image source={image2} style={styles.storyImage} />
          <Image source={image2} style={styles.secondaryImage} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  )
}

StoriesFromFriends3.defaultProps = {
  image1: Images.flagPicture,
  image2: Images.profilePicture4,
  name: 'Carlota'
}

export default StoriesFromFriends3
