// @flow

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity, ImageBackground, ImageProps } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { widthPercentageToDP as wp } from '../Themes/ScreenMetrics'

// Styles
import styles from './Styles/StoryLineLongFormMultipleEventsStyle'
import images from '../Themes/Images'
import Timeline from './Timeline'

// Components
import { X4SButton } from './Buttons/X4SButton'
import { DefaultButton } from './Buttons/DefaultButton'

type Props = {
  reach: string,
  friendsFollowing: string,
  category: string,
  endStatus: string,
  storyTitle: string,
  updatedTime: string,
  followDisplay: boolean,
  following: boolean,
  trending: boolean,
  active: boolean,
  date: string,
  totalStoryItems: number,
  carouselItems: Array<{
    previewText: string,
    commentText: string,
    storyImage: ImageProps,
    read: boolean
  }>,
  onPressShare: PropTypes.func,
  onPressReact: PropTypes.func,
  onPressRaven: PropTypes.func,
  onPressFollow: PropTypes.func
}

const StoryLineLongFormMultipleEvents = (props: Props) => {
  const [paginationActive, setPaginationActive] = useState(0)

  const {
    friendsFollowing,
    reach,
    endStatus,
    storyTitle,
    updatedTime,
    category,
    date,
    totalStoryItems,
    carouselItems,
    followDisplay,
    following,
    trending,
    active,
    onPressReact,
    onPressRaven,
    onPressShare,
    onPressFollow
  } = props

  const {
    iconStoryLineTrending,
    pollActiveIcon,
    iconStoryLineReach,
    iconStoryLineRelatedEntity1,
    iconStoryLineRelatedEntity2,
    iconStoryLineRelatedEntity3,
    iconStoryLineRelatedEntity4,
    voterIcon1,
    voterIcon2,
    voterIcon3,
    shareIcon,
    reactIcon,
    ravenIcon,
    sourceIcon,
    backIcon,
    iconPeople
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

  function renderItem({
    item,
    index
  }: {
    item: { previewText: string, commentText: string, storyImage: ImageProps, read: boolean },
    index: number
  }) {
    const { previewText, commentText, storyImage, read } = item
    if (read) {
      return (
        <View key={index} style={styles.previewContainerRead}>
          <Text style={styles.readText}>Read full storyline</Text>
          <Image source={backIcon} style={styles.backIcon} />
        </View>
      )
    }
    return (
      <View key={index} style={styles.previewContainer}>
        <ImageBackground source={storyImage} style={styles.image} imageStyle={styles.imageBorder}>
          <View style={styles.imageItems}>
            {index === paginationActive ? (
              <View style={styles.playButton}>
                <View style={styles.triangle} />
              </View>
            ) : null}
            {index === paginationActive ? (
              <Image source={sourceIcon} style={styles.sourceImage} />
            ) : null}
          </View>
        </ImageBackground>
        <Text style={styles.previewText}>{previewText}</Text>
        <View style={styles.relatedEntityContainer}>
          <Text style={styles.EntityRelatedText}>Related entities</Text>
          <View style={styles.relatedEntityIconContainer}>{relatedEntityIconContainer}</View>
        </View>
        <View style={styles.divider} />
        <View style={styles.commentsContainer}>
          {commentIconsElement}
          <Text style={styles.commentsText}>{commentText}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <Text style={styles.headingText}>{category}</Text>
          <View style={styles.dot} />
          <Image source={pollActiveIcon} style={styles.storyLineIconHeading} />
          {active ? <Text style={styles.activeText}>Active</Text> : null}
          {trending ? <View style={styles.dot} /> : null}
          {trending ? (
            <Image source={iconStoryLineTrending} style={styles.storyLineIconHeading} />
          ) : null}
          <View style={styles.endedButton}>
            <Text style={styles.endedButtonText}>{endStatus}</Text>
          </View>
        </View>
        {followDisplay ? (
          <TouchableOpacity>
            {following ? (
              <X4SButton disabled title="Following" onPress={onPressFollow} />
            ) : (
              <DefaultButton outline title="Follow" onPress={onPressFollow} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.friends}>
        <View style={styles.friendsTextContainer}>
          <Image source={iconStoryLineReach} style={styles.friendsIcon} />
          <Text style={styles.friendsText}> {reach}</Text>
        </View>
        <View style={styles.friendsTextContainer}>
          <Image source={iconPeople} style={styles.friendsIcon} />
          <Text style={styles.friendsText}> {friendsFollowing}</Text>
        </View>
      </View>
      <Text style={styles.newsTitleText}>{storyTitle}</Text>
      <Text style={styles.updateTimeText}>Updated {updatedTime} ago</Text>
      <View style={styles.caraouselContainer}>
        <Carousel
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          data={carouselItems}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          sliderWidth={wp('86.67%%')}
          itemWidth={wp('77.86%')}
          renderItem={renderItem}
          onSnapToItem={(index) => setPaginationActive(index)}
        />
      </View>
      <Text style={styles.date}>{date}</Text>
      <Timeline len={totalStoryItems} active={paginationActive} />
      <View style={styles.actionIconsContainer}>
        <TouchableOpacity onPress={onPressShare}>
          <Image source={shareIcon} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRaven}>
          <Image source={ravenIcon} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressReact}>
          <Image source={reactIcon} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

StoryLineLongFormMultipleEvents.defaultProps = {
  reach: '45K Reached',
  friendsFollowing: '241K Followers',
  category: 'World',
  endStatus: 'Ended',
  storyTitle: 'UK exit from the European Union',
  updatedTime: '2m',
  followDisplay: true,
  following: false,
  trending: true,
  active: false,
  date: 'July 25th,1991',
  totalStoryItems: 8,
  carouselItems: [
    {
      storyImage: images.storyImage,
      previewText: 'Corbyn wins Labor conference Brexit vote in the latest polls',
      commentText: '34K comments',
      read: false
    },
    {
      storyImage: images.storyImage,
      previewText: 'Corbyn wins Labor conference Brexit vote in the latest polls',
      commentText: '34K comments',
      read: false
    },
    {
      storyImage: images.storyImage,
      previewText: 'Corbyn wins Labor conference Brexit vote in the latest polls',
      commentText: '34K comments',
      read: false
    },
    {
      storyImage: null,
      previewText: '',
      commentText: '',
      read: true
    }
  ],
  onPressReact: () => {},
  onPressRaven: () => {},
  onPressShare: () => {},
  onPressFollow: () => {}
}

export default StoryLineLongFormMultipleEvents
