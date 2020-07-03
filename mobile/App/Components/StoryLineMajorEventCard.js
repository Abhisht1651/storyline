// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, ImageBackground, TouchableOpacity, ImageProps } from 'react-native'

// Styles
import styles from './Styles/StoryLineMajorEventStyle'
import images from '../Themes/Images'

// Components
import CommentBox from './CommentBox'

type Props = {
  previewText: string,
  comments: number,
  onPressComments: PropTypes.func,
  storyImage: ImageProps,
  topComment: {
    name: string,
    commentText: string,
    replyCount: number,
    isReply: boolean,
    boostCount: number,
    selectionHandler: (arg: number) => void
  }
}

const storyLineLongFormSingleEvent = (props: Props) => {
  const { previewText, comments, onPressComments, storyImage, topComment } = props
  const { name, commentText, replyCount, isReply, boostCount } = topComment
  const {
    iconStoryLineRelatedEntity1,
    iconStoryLineRelatedEntity2,
    iconStoryLineRelatedEntity3,
    iconStoryLineRelatedEntity4,
    voterIcon1,
    voterIcon2,
    voterIcon3,
    sourceIcon
  } = images

  const iconRelatedEntity = [
    iconStoryLineRelatedEntity1,
    iconStoryLineRelatedEntity2,
    iconStoryLineRelatedEntity3,
    iconStoryLineRelatedEntity4
  ]

  const voterIcons = [voterIcon1, voterIcon2, voterIcon3]

  const commentIconsElement = voterIcons.map((voterIcon, index) => (
    <Image source={voterIcon} key={index} style={styles.commentsIcon} />
  ))

  const relatedEntityIconContainer = iconRelatedEntity.map((icon, index) => (
    <Image source={icon} key={index} style={styles.relatedEntityIcon} />
  ))

  return (
    <View style={styles.container}>
      <ImageBackground source={storyImage} style={styles.image} imageStyle={styles.imageBorder}>
        <Image source={sourceIcon} style={styles.sourceImage} />
      </ImageBackground>
      <Text style={styles.previewText}>{previewText}</Text>
      <View style={styles.relatedEntityContainer}>
        <Text style={styles.EntityRelatedText}>Related entities</Text>
        <View style={styles.relatedEntityIconContainer}>{relatedEntityIconContainer}</View>
      </View>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.commentsContainer} onPress={onPressComments}>
        {commentIconsElement}
        <Text style={styles.commentsText}>{comments}K comments</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <CommentBox
        name={name}
        commentText={commentText}
        replyCount={replyCount}
        isReply={isReply}
        boostCount={boostCount}
      />
    </View>
  )
}

storyLineLongFormSingleEvent.defaultProps = {
  previewText: 'Corbyn wins Labor conference Brexit vote in the latest polls',
  comments: 34,
  onPressComments: () => {},
  storyImage: images.storyImage,
  topComment: {
    name: 'Jammie Rice',
    commentText:
      'When Robert Mueller broke his silence in May, his main point was that his long-awaited report spoke for itself.',
    replyCount: 1,
    isReply: false,
    boostCount: 450,
    selectionHandler: () => {}
  }
}

export default storyLineLongFormSingleEvent
