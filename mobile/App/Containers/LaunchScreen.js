// @flow

import React from 'react'
import { Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// Styles
import styles from './Styles/LaunchScreenStyles'
import images from '../Themes/Images'

// import Ds from '../Components/TimeFilter/DisplayScreen'

const LaunchScreen = () => {
  const { newzeraWhiteLogo } = images
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={['#7B46E4', '#1F1F64']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.section}>
          <Image source={newzeraWhiteLogo} style={styles.logo} />
        </View>
      </LinearGradient>
    </View>
  )
}

export default LaunchScreen
