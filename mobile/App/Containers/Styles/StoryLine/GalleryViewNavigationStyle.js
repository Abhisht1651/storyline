import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from '../../../Themes/ScreenMetrics'

export default StyleSheet.create({
  tabContainer: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    borderBottomColor: '#E6ECED'
  },
  tab: {
    width: 100
  },
  indicator: {
    backgroundColor: '#7B46E4'
  },
  label: {
    fontFamily: 'BananaGrotesk-Regular',
    fontSize: 12,
    letterSpacing: -0.11,
    textAlign: 'left'
  },
  tabDisplay: {
    width: wp('86.67%')
  },
  contentContainer: {
    width: wp('100%'),
    alignItems: 'center'
  },
  previewContainer: {
    width: wp('80%'),
    marginTop: 17,
    marginRight: 15,
    borderRadius: 15,
    opacity: 1,
    borderColor: '#E6ECED',
    borderWidth: 0.5,
    marginBottom: 8
  },
  galleryImage: {
    width: wp('80%'),
    height: wp('47.467%'),
    borderRadius: wp('4%')
  },
  galleryText: {
    textAlign: 'left',
    letterSpacing: -0.12,
    color: '#1F1F60',
    fontFamily: 'BananaGrotesk-Regular',
    fontSize: wp('4.253%'),
    opacity: 1,
    marginTop: 17
  }
})
