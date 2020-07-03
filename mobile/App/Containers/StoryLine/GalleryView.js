// @flow

import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { NavigationContainerProps } from '@react-navigation/native'
import GalleryNavigation from './GalleryVIewNavigation'

// Styles
import styles from '../Styles/StoryLine/GalleryViewStyles'
import images from '../../Themes/Images'
import {withApollo} from 'react-apollo';


type Props = NavigationContainerProps & {}

const galleryView = (props) => {
  const { navigation } = props
  const { backIcon } = images

  return (
    <View style={styles.container}>
      <View style={styles.topCover} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.relatedText}>Gallery</Text>
      </View>
      <View style={styles.tabContainer}>
        <GalleryNavigation />
        <Text>End</Text>
      </View>
    </View>
  )
}

export default withApollo(galleryView)
