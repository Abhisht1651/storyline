import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const baseWidth = 375
const baseHeight = 812

const scaleWidth = width / baseWidth
const scaleHeight = height / baseHeight
const scale = Math.min(scaleWidth, scaleHeight)

export const scaledSize = (size) => Math.ceil(size * scale)

export default StyleSheet.create({
  container: {
    width: 72 * scaleHeight,
    height: 127 * scaleHeight,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profilePicture: {
    margin: 2,
    flex: 1,
    borderRadius: 13 * scaleHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 13 * scaleHeight,
    borderWidth: 2,
    borderColor: 'white'
  },
  storyIcon: {
    top: 70 * scaleHeight,
    height: 36 * scaleHeight,
    aspectRatio: 1,
    borderRadius: 50
  },
  storyImage: {
    aspectRatio: 1,
    height: '100%',
    borderRadius: 50
  },
  smallImageContainer: {
    margin: 2,
    borderRadius: 100,
    flex: 1
  },
  TriangleShapeCSS: {
    position: 'absolute',
    bottom: 22.5 * scaleHeight,
    left: 44 * scaleHeight,
    width: 0,
    height: 0,
    borderLeftWidth: 4 * scaleHeight,
    borderRightWidth: 4 * scaleHeight,
    borderBottomWidth: 7 * scaleHeight,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#B27CF3',
    borderRadius: 2,
    transform: [{ rotate: '19deg' }]
  },
  text: {
    fontSize: scaledSize(14),
    fontFamily: 'BananaGrotesk-Regular',
    color: '#8F8FAF',
    letterSpacing: -0.08
  },
  linearGradient: {
    width: 73 * scaleHeight,
    height: 93 * scaleHeight,
    borderRadius: 15 * scaleHeight
  },
  positon: {
    position: 'absolute'
  }
})
