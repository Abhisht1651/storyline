// @flow

import React, { useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles, { scaleHeight } from '../Styles/CommentbarStyles/Commentbar2Style'
import Attach from '../../Images/Icons/icon-attach.svg'

type Props = {
  captureText: (arg: string) => void,
  placeholderText: string
}

const Commentbar2 = (props: Props) => {
  const [value, setValue] = useState('')
  const [newStyle, setNewStyle] = useState({ height: 39.87 * scaleHeight })
  const [containerStyle, setContainerStyle] = useState({ height: 90 * scaleHeight })

  const { captureText, placeholderText } = props

  useEffect(() => {
    captureText(value)
  }, [value])

  const changeTextHandler = (text: string) => {
    setValue(text)
  }
  const updateSize = (newHeight) => {
    setNewStyle({
      height: newHeight + scaleHeight * 21.86
    })
    setContainerStyle({
      height: newHeight + scaleHeight * 50.14
    })
  }

  return (
    <View style={[styles.container, containerStyle]} elevation={-1}>
      <TouchableOpacity style={styles.attachIcon}>
        <Attach height="100%" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.textInput, newStyle]}>
        <TextInput
          placeholder={placeholderText}
          placeholderTextColor="rgba(27, 32, 98, 0.3)"
          selectionColor="#7B46E4"
          multiline
          maxLength={150}
          autoCorrect={false}
          spellCheck={false}
          style={styles.comment}
          onChangeText={changeTextHandler}
          onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
        />
      </TouchableOpacity>
    </View>
  )
}

Commentbar2.defaultProps = {
  placeholderText: 'Comment Something'
}

export default Commentbar2
