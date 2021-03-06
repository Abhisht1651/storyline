import { StyleSheet, Dimensions } from 'react-native'

const Width = Dimensions.get('window').width

const styles = StyleSheet.create({
  defaultbutton: {
    width: (75 / 375) * Width,
    height: (30 / 375) * Width,
    borderRadius: (16 / 375) * Width,
    backgroundColor: '#7B46E4'
  },
  defaulttext: {
    fontSize: (14 / 375) * Width,
    color: '#FFFFFF',
    fontFamily: 'BananaGrotesk-Bold',
    letterSpacing: (-0.08 / 375) * Width,
    lineHeight: (16 / 375) * Width
  },
  disableddefaultbutton: {
    width: (75 / 375) * Width,
    height: (30 / 375) * Width,
    borderRadius: (16 / 375) * Width,
    borderWidth: (1 / 375) * Width,
    borderColor: '#DCDCE9',
    backgroundColor: '#FFFFFF'
  },
  disableddefaulttext: {
    fontSize: (14 / 375) * Width,
    color: '#8F8FAF',
    fontFamily: 'BananaGrotesk-Bold',
    letterSpacing: (-0.08 / 375) * Width,
    lineHeight: (16 / 375) * Width
  },
  defaultoutlinebutton: {
    width: (75 / 375) * Width,
    height: (30 / 375) * Width,
    borderRadius: (16 / 375) * Width,
    borderWidth: (1 / 375) * Width,
    borderColor: '#7B46E4',
    backgroundColor: '#FFFFFF'
  },
  defaultoutlinetext: {
    fontSize: (14 / 375) * Width,
    color: '#7B46E4',
    fontFamily: 'BananaGrotesk-Bold',
    letterSpacing: (-0.08 / 375) * Width,
    lineHeight: (16 / 375) * Width
  },
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles
