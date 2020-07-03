// @flow
import React, { useState, useEffect, useRef } from 'react'
// import React from 'react'
import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import { NavigationContainerProps } from '@react-navigation/native'
import StoryLineShortCard from '../../Components/StoryLineShortCardDefualt'
import {withApollo} from 'react-apollo';
import {getStorylineDetails,getRelatedStorylines,getMultimediaDetails} from './my_queries';
// Styles
import styles from '../Styles/StoryLine/RelatedStoryLinesStyle'
import images from '../../Themes/Images'

// type Props = NavigationContainerProps & {
//   storyLineData: Array<{
//     reach: number,
//     heading: string,
//     storyTitle: string,
//     friendsFollowing: number,
//     updatedTime: number,
//     following: boolean,
//     trending: boolean
//   }>
// }

const relatedStoryLine = (props) => {
  var [datarelatedStoryLine,setFeed]=useState([]);
  var [url,seturl]=useState([]);

  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  const { navigation, storyLineData } = props
  const { backIcon } = images
  const storyline_id="1a802963-70f3-4971-bf7c-7b2cb411bde1";
  // console.log(images)


  const displayrelatedStoryline = async (client,storyline_id) =>{
    try{
      let source=[];
      const {data: dataStoryline, loading: loadingStoryline} = await client.query({query: getRelatedStorylines, variables: {storyline_id1:storyline_id}});
      const {storyline_id2,rank}=dataStoryline.getStorylineStoryline[0];

      const multi_id="9287fdfa-9f1b-11ea-bb37-0242ac130002";
      const {data:datamulti,loading:loadingmulti}= await client.query({query:getMultimediaDetails,variables:{multimedia_id:multi_id}});
      const {url}=datamulti.GetMultimedia;

      const {data: dataRelatedStoryline, loading: loadingRelatedStoryline} = await client.query({query: getStorylineDetails, variables: {storyline_id:storyline_id2}});
      source[0]=dataRelatedStoryline.GetStoryline;
      
      setFeed(source);
      seturl(url);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displayrelatedStoryline(client,storyline_id);}, []);
  const storyLineDataElements = datarelatedStoryLine.map((item, index) => {
    const { topic, category,  last_updated, followers, is_trending } = item
    return (
      <View key={index} style={styles.previewContainer}>
        <StoryLineShortCard
          reach={1234}
          heading={category}
          storyTitle={topic}
          friendsFollowing={followers}
          updatedTime={last_updated}
          following={true}
          trending={is_trending}
          storyImage={url}
        />
      </View>
    )
  })
  return (
    <View style={styles.container}>
      <View style={styles.topCover} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backIcon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.relatedText}>Related StoryLines</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>{storyLineDataElements}</View>
      </ScrollView>
    </View>
  )
}

// relatedStoryLine.defaultProps = {
//   storyLineData: [
//     {
//       reach: 45,
//       heading: 'World',
//       storyTitle: 'HI from related',
//       friendsFollowing: '45 friends Following',
//       updatedTime: '2m',
//       following: true,
//       trending: true
//     },
//     {
//       reach: 45,
//       heading: 'World',
//       storyTitle: 'UK exit from the European Union',
//       friendsFollowing: '45 friends Following',
//       updatedTime: '2m',
//       following: true,
//       trending: true
//     },
//     {
//       reach: 45,
//       heading: 'World',
//       storyTitle: 'UK exit from the European Union',
//       friendsFollowing: '45 friends Following',
//       updatedTime: '2m',
//       following: true,
//       trending: true
//     }
//   ]
// }

export default withApollo(relatedStoryLine)
