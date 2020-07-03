import React from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import styles from '../Styles/EntitesStyles/CardType2Styles'
import images from '../../Themes/Images'

const CardType2 = ({ title, count, profileIcons }) => {
  const profileIconElement = profileIcons.map((profileIcon, index) => (
    <Image source={profileIcon} key={index} style={styles.profileIcon} />
  ))
  return (
    <View style={styles.cardBox}>
      <View style={styles.profileIconBox}>{profileIconElement}</View>

      <View style={styles.textOutline}>
        <View style={styles.textcenter}>
          <Text style={styles.textNameFont}>{title}</Text>
        </View>
        <View>
          <Text style={styles.textDetailsFont}>{`${count} friends`}</Text>
        </View>
        <View>
          <Text style={styles.textDetailsFont}>follow</Text>
        </View>
      </View>
    </View>
  )
}

CardType2.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  profileIcons: PropTypes.array
}

CardType2.defaultProps = {
  title: 'Bharat',
  count: 0,
  profileIcons: [images.EntitiesImage0]
}

export default CardType2
