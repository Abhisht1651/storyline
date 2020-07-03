import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    // marginTop: Metrics.doubleSection,
    height: 145,
    width: 250
    // resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
