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
    height: 129 * scaleHeight,
    width: 72 * scaleHeight,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profilePicture: {
    width: 72 * scaleHeight,
    height: 93 * scaleHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#DCDCE9',
    borderRadius: 15 * scaleHeight
  },
  image: {
    width: 68 * scaleHeight,
    height: 89 * scaleHeight,
    borderRadius: 13 * scaleHeight,
    borderWidth: 2,
    borderColor: 'white'
  },
  storyIcon: {
    top: 70 * scaleHeight,
    position: 'absolute',
    height: 36 * scaleHeight,
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#DCDCE9'
  },
  storyImage: {
    aspectRatio: 1,
    height: '100%',
    borderRadius: 100,
    tintColor: 'grey'
  },
  text: {
    fontSize: scaledSize(14),
    fontFamily: 'BananaGrotesk-Regular',
    color: '#8F8FAF',
    letterSpacing: -0.08
  },
  TriangleShapeCSS: {
    position: 'absolute',
    bottom: 24.5 * scaleHeight,
    left: 43 * scaleHeight,
    width: 0,
    height: 0,
    borderLeftWidth: 4 * scaleHeight,
    borderRightWidth: 4 * scaleHeight,
    borderBottomWidth: 7 * scaleHeight,
    borderStyle: 'solid',
    borderRadius: 2,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#DCDCE9',
    transform: [{ rotate: '19deg' }]
  },
  smallImageContainer: {
    borderRadius: 100,
    margin: 2,
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCDCE9'
  },
  secondaryImage: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
    opacity: 0.8,
    position: 'absolute'
  }
})
