// @flow
// import React from 'react'
import React, { useState, useEffect, useRef } from 'react'

import { View, Text, Image, TouchableOpacity, ImageProps } from 'react-native'
import PropTypes from 'prop-types'
import {getStorylineDetails,getRelatedStorylines,getMultimediaDetails} from '../Containers/StoryLine/my_queries';


// Styles
import styles from './Styles/StoryLineShortCardDefaultStyle'
import images from '../Themes/Images'

// Components
import { X4SButton } from './Buttons/X4SButton'
import { DefaultButton } from './Buttons/DefaultButton'
import {withApollo} from 'react-apollo';


// type Props = {
//   border: boolean,
//   reach: number,
//   heading: string,
//   storyTitle: string,
//   friendsFollowing: string,
//   updatedTime: string,
//   following: boolean,
//   trending: boolean,
//   storyImage: ImageProps,
//   onPressFollow: PropTypes.func,
//   followDisplay: boolean,
//   followerDisplay: boolean
// }
                                                                                                                                
const storyLineShortCardDefault = (props) => {
  var [datarelatedStoryLine,setFeed]=useState([]);
  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  const storyline_id="1a802963-70f3-4971-bf7c-7b2cb411bde1";
  
  const { iconStoryLineTrending, iconStoryLineReach, iconPeople } = images
  // console.log(storyImage)
  const displayrelatedStoryline = async (client,storyline_id) =>{
    try{
      let source=[];
      let item={}
      const {data: dataStoryline, loading: loadingStoryline} = await client.query({query: getRelatedStorylines, variables: {storyline_id1:storyline_id}});
      const {storyline_id2,rank}=dataStoryline.getStorylineStoryline[0];
      const multi_id="9287fdfa-9f1b-11ea-bb37-0242ac130002";
      const {data:datamulti,loading:loadingmulti}= await client.query({query:getMultimediaDetails,variables:{multimedia_id:multi_id}});
      const {url}=datamulti.GetMultimedia;
      const {data: dataRelatedStoryline, loading: loadingRelatedStoryline} = await client.query({query: getStorylineDetails, variables: {storyline_id:storyline_id2}});
      // console.log(dataRelatedStoryline.GetStoryline)
      const {category,followers,is_acitve,is_live,is_single_event,is_trending,topic,last_updated}=dataRelatedStoryline.GetStoryline
      item['updatedTime']=last_updated
      item['following']=followers
      item['trending']=is_trending
      item['heading']=category
      item['storyTitle']=topic
      item['storyImage']=url
      item['onPressFollow']=() => {}
      item['followDisplay']=true
      item['followerDisplay']=true      
      setFeed(item);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displayrelatedStoryline(client,storyline_id);}, []);
  const {border,reach, friendsFollowing}={border:true,reach:405,friendsFollowing:45}
  const {updatedTime,following, trending, heading,storyTitle,
    storyImage, onPressFollow,followDisplay,
    followerDisplay} = datarelatedStoryLine
  return (
    <View style={border ? styles.container : styles.containerWithoutBorder}>
      <View style={styles.info}>
        <View style={styles.heading}>
          <View style={styles.headingTextContainer}>
            <Text style={styles.headingText}>{heading}</Text>
            {trending ? <View style={styles.dot} /> : null}
            {trending ? (
              <Image source={iconStoryLineTrending} style={styles.iconStoryLineTrending} />
            ) : null}
            {trending ? <Text style={styles.headingText}>Trending</Text> : null}
          </View>
          <TouchableOpacity>
            {followDisplay ? (
              <TouchableOpacity>
                {following ? (
                  <X4SButton disabled title="Following" onPress={onPressFollow} />
                ) : (
                  <DefaultButton outline title="Follow" onPress={onPressFollow} />
                )}
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>
        <View style={styles.friends}>
          <View style={styles.friendsTextContainer}>
            <Image source={iconStoryLineReach} style={styles.friendsIcon} />
            <Text style={styles.friendsText}> {reach}K Reached</Text>
          </View>
          {followerDisplay ? (
            <View style={styles.friendsTextContainer}>
              <Image source={iconPeople} style={styles.friendsIcon} />
              <Text style={styles.friendsText}> {friendsFollowing}</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.newsContainer}>
          <Text style={styles.newsTitleText}>{storyTitle}</Text>
          <Text style={styles.updateTimeText}>Updated {updatedTime} ago</Text>
        </View>
      </View>

      <Image source={{uri:storyImage}} style={border ? styles.image : styles.imageWithoutBorder} />
    </View>
  )
}

// storyLineShortCardDefault.defaultProps = {
//   border: true,
//   reach: 405,
//   // heading: 'World',
//   // storyTitle: 'UK exit from the European Union',
//   friendsFollowing: '45 friends Following',
//   // updatedTime: '2m',
//   // following: true,
//   // trending: true,
//   // storyImage: images.storyImage,
//   // onPressFollow: () => {},
//   // followDisplay: true,
//   // followerDisplay: true
// }

export default  withApollo(storyLineShortCardDefault)
