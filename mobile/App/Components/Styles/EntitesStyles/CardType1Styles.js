import { StyleSheet, Dimensions } from 'react-native'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

export default StyleSheet.create({
  cardBox: {
    backgroundColor: 'white',
    borderWidth: (1 / 375) * Width,
    borderRadius: (15 / 375) * Width,
    borderColor: '#e6eced',
    width: (325 / 375) * Width,
    height: (84 / 768) * Height,
    alignItems: 'center',
    flexDirection: 'row'
  },
  profileIconBox: {
    width: (60 / 375) * Width,
    height: (60 / 768) * Height,
    marginLeft: (12 / 375) * Width,
    borderRadius: (15 / 375) * Width
  },
  profileIcon: {
    width: (60 / 375) * Width,
    height: (60 / 768) * Height,
    flex: 1,
    borderRadius: (15 / 375) * Width
  },
  textOutline: {
    marginLeft: (10.5 / 375) * Width,
    width: (105 / 375) * Width
  },
  textNameFont: {
    textAlign: 'left',
    letterSpacing: (-0.1 / 375) * Width,
    color: '#1f1f60',
    fontSize: (14 / 375) * Width,
    fontFamily: 'BananaGrotesk-Regular'
  },
  textDetailsFont: {
    textAlign: 'left',
    letterSpacing: (-0.08 / 375) * Width,
    color: '#8F8FAF',
    fontSize: (12 / 375) * Width,
    fontFamily: 'BananaGrotesk-Regular',
    marginTop: (5 / 768) * Height
  },
  followbuttonBox: {
    marginRight: (20 / 375) * Width,
    justifyContent: 'center',
    marginLeft: 'auto'
  }
})
