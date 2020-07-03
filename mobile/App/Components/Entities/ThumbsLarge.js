// import React from 'react'
import React, { useState, useEffect, useRef } from 'react'
import {withApollo} from 'react-apollo';

import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import styles from '../Styles/EntitesStyles/ThumbsLargeStyles'
import images from '../../Themes/Images'

// var [dataheading,setFeed]=useState([]);

const ThumbsLarge = ({ title, profileIcons }) => {
  
  const profileIconElement = profileIcons.map((profileIcon, index) => (
    <Image source={profileIcon} key={index} style={styles.profileIcon} />
  ))
  return (
    <View style={styles.cardBox}>
      <View style={styles.profileIconBox}>{profileIconElement}</View>

      <View style={styles.textOutline}>
        <Text style={styles.textNameFont}>{title}</Text>
      </View>
    </View>
  )
}

ThumbsLarge.propTypes = {
  title: PropTypes.string,
  profileIcons: PropTypes.array
}

ThumbsLarge.defaultProps = {
  title: 'Ind',
  profileIcons: [images.EntitiesImage0]
}

export default withApollo(ThumbsLarge)
