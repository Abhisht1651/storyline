// @flow

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Images from '../../Themes/Images'
import styles from '../Styles/StoriesFromFriendsStyles/StoriesFromFriends2Style'

type Props = {
  image1: Image,
  image2: Image,
  name: string,
  onPress: () => {}
}

const StoriesFromFriends2 = (props: Props) => {
  const { image1, image2, name, onPress } = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#46C3F4', '#B27CF3']}
        style={styles.linearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <TouchableOpacity style={styles.profilePicture} activeOpacity={1}>
          <Image source={image1} style={styles.image} />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.TriangleShapeCSS} />
      <TouchableOpacity activeOpacity={1} style={styles.positon}>
        <LinearGradient
          colors={['#46C3F4', '#B27CF3']}
          style={styles.storyIcon}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.smallImageContainer}>
            <Image source={image2} style={styles.storyImage} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  )
}

StoriesFromFriends2.defaultProps = {
  image1: Images.flagPicture,
  image2: Images.profilePicture3,
  name: 'Name'
}

export default StoriesFromFriends2
