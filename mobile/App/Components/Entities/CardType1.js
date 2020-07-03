import React, { useState } from 'react'
import { View, Text, Image } from 'react-native'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Styles
import styles from '../Styles/EntitesStyles/CardType1Styles'
import images from '../../Themes/Images'
import { DefaultButton } from '../Buttons/DefaultButton'
import { X4SButton } from '../Buttons/X4SButton'

const CardType1 = ({ title, count, profileIcons }) => {
  const [pressStatus, setStatus] = useState(false)
  console.log(profileIcons)

  const changeStatus = () => {
    console.log('Clicked follow')
    setStatus(!pressStatus)
  }

  const profileIconElement = profileIcons.map((profileIcon, index) => (
    <Image source={{uri:profileIcon}} key={index} style={styles.profileIcon} />
  ))

  return (
    <View style={styles.cardBox}>
      <View style={styles.profileIconBox}>{profileIconElement}</View>
      <View style={styles.textOutline}>
        <View>
          <Text style={styles.textNameFont}>{title}</Text>
        </View>
        <View>
          <Text style={styles.textDetailsFont}>{`${count}K Following`}</Text>
        </View>
      </View>

      <View style={styles.followbuttonBox}>
        <TouchableOpacity onPress={changeStatus}>
          {!pressStatus ? (
            <DefaultButton outline title="Follow" />
          ) : (
            <X4SButton disabled title="Following" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

CardType1.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  profileIcons: PropTypes.array
}

CardType1.defaultProps = {
  title: 'India',
  count: 0,
  profileIcons: [16]
}

export default CardType1
