import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const baseWidth = 375
const baseHeight = 812
const scaleWidth = width / baseWidth
const scaleHeight = height / baseHeight
const scale = Math.min(scaleWidth, scaleHeight)
export const scaledSize = (size) => Math.ceil(size * scale) + 1
export default StyleSheet.create({
  container: {
    alignItems: 'flex-end'
  },
  dropDownHeader: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    width: 160 * scaleHeight,
    height: 47.5 * scaleHeight,
    borderColor: '#DCDCE9',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  headerItem: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  headerText: {
    paddingLeft: 15 * scaleHeight,
    paddingTop: 19 * scaleHeight,
    fontSize: 14,
    color: '#8F8FAF',
    fontFamily: 'BananaGrotesk-Light'
  },
  dropDownIcon: {
    paddingTop: 18 * scaleHeight,
    paddingRight: 19 * scaleHeight,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    height: '100%'
  },
  dropDownBody: {
    right: -19 * scaleHeight,
    top: -28 * scaleHeight,
    position: 'absolute',
    alignItems: 'center',
    letterSpacing: 0.08,
    width: 160 * scaleHeight,
    borderColor: '#DCDCE9',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  listItem: {
    padding: 15 * scaleHeight,
    flexDirection: 'row',
    height: 47.5 * scaleHeight,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DCDCE9'
  },
  listLastItem: {
    padding: 15 * scaleHeight,
    height: 47.5 * scaleHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemText: {
    color: '#1F1F60',
    fontSize: scaledSize(14),
    fontFamily: 'BananaGrotesk-Light'
  },
  lastItemText: {
    color: '#1F1F60',
    fontFamily: 'BananaGrotesk-Light',
    fontSize: scaledSize(14)
  },
  iconOnly: {
    width: '100%',
    height: 10 * scaleHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropDownWidth: {
    width: 160 * scaleHeight
  }
})
