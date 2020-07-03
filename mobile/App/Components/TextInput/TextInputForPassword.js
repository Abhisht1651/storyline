// @flow

import React, { useState, useEffect } from 'react'
import { TextInput, Platform } from 'react-native'
import styles from '../Styles/TextInputStyles/TextInputForPasswordStyle'

type Props = {
  placeholder: string,
  placeholderTextColor: string,
  borderBottomColor: string,
  captureText: (arg: string) => void,
  onFocus: () => void,
  onBlur: () => void
}
const TextInputForPassword = (props: Props) => {
  const [textInputValue, setTextInputValue] = useState('')
  const [value, setValue] = useState('')
  const [customStyle, setCustomStyle] = useState({ borderBottomColor: '#8F8FAF' })
  const {
    placeholder,
    placeholderTextColor,
    borderBottomColor,
    captureText,
    onFocus,
    onBlur
  } = props

  useEffect(() => {
    captureText(value)
  }, [value])

  const inputChangeHandler = (text: string) => {
    let color = ''
    if (text === '') color = '#8F8FAF'
    else color = `${borderBottomColor}`
    const str = '*'
    const encrypted = str.repeat(text.length)
    if (text === '') {
      setValue('')
    } else if (text.length > value.length) {
      setValue(value + text.substr(-1))
    } else {
      setValue(value.substr(0, text.length))
    }

    setTextInputValue(encrypted)
    setCustomStyle({ borderBottomColor: color })
  }

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      underlineColorAndroid="transparent"
      selectionColor="#7B46E4"
      value={textInputValue}
      autoCorrect={false}
      spellCheck={false}
      keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}
      style={[styles.textInput, customStyle]}
      onChangeText={inputChangeHandler}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}

TextInputForPassword.defaultProps = {
  placeholder: 'Password',
  placeholderTextColor: '#8F8FAF',
  borderBottomColor: '#7B46E4'
}

export default TextInputForPassword
