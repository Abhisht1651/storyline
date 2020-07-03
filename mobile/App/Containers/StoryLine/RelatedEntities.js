// @flow

// import React from 'react'
import React, { useState, useEffect, useRef } from 'react'

import { View, ScrollView, Image, Text, TouchableOpacity } from 'react-native'
import { NavigationContainerProps } from '@react-navigation/native'
import {withApollo} from 'react-apollo';
import {getEntityDetails,getRelatedEntities,getMultimediaDetails} from './my_queries';


// Styles
import styles from '../Styles/StoryLine/RelatedEntitiesStyle'
import images from '../../Themes/Images'

// Components
import Entities from '../../Components/Entities/CardType1'

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
  var [relatedStoryLine,setFeed]=useState([]);
  var [url,seturl]=useState([]);

  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  
  const { navigation, storyLineData } = props
  const { backIcon } = images
  const entity_id1="ff3b2a22-8858-428e-8270-98f31ae4acdc";
  const displayrelatedentity = async (client,entity_id1) =>{
    try{
      let source=[];
      let item={};
      const multi_id="9287fdfa-9f1b-11ea-bb37-0242ac130002";
      const {data:datamulti,loading:loadingmulti}= await client.query({query:getMultimediaDetails,variables:{multimedia_id:multi_id}});
      // console.log(datamulti.GetMultimedia);
      const {url}=datamulti.GetMultimedia;
      const {data: datarelatedentity, loading: loadingrelatedentity} = await client.query({query: getRelatedEntities, variables: {entity_id:entity_id1}});
      const {entity_id}=datarelatedentity.GetRelatedStorylinesToEntity[0];
      const {data: dataentity, loading: loadingentity} = await client.query({query: getEntityDetails, variables: {entity_id:entity_id}});
      const {followers,image,name}=dataentity.GetEntity;
      item["title"]=name;
      item['count']=followers;
      item['profileIcons']=[url];
      source[0]=item
      setFeed(source);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displayrelatedentity(client,entity_id1);}, []);

  const storyLineDataElements = relatedStoryLine.map((item, index) => {
    const { title, count,profileIcons } = item
    return (
      <View key={index} style={styles.previewContainer}>
        <Entities title={title} count={count} profileIcons={profileIcons} />
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
        <Text style={styles.relatedText}>Related Entities</Text>
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
//       title: 'India',
//       count: 52,
//       profileIcons: [images.EntitiesImage0]
//     },
//     {
//       title: 'United States of America',
//       count: 52,
//       profileIcons: [images.EntitiesImage1]
//     },
//     {
//       title: 'India',
//       count: 52,
//       profileIcons: [images.EntitiesImage0]
//     },
//     {
//       title: 'United States of America',
//       count: 52,
//       profileIcons: [images.EntitiesImage1]
//     },
//     {
//       title: 'India',
//       count: 52,
//       profileIcons: [images.EntitiesImage0]
//     },
//     {
//       title: 'United States of America',
//       count: 52,
//       profileIcons: [images.EntitiesImage1]
//     },
//     {
//       title: 'India',
//       count: 52,
//       profileIcons: [images.EntitiesImage0]
//     },
//     {
//       title: 'United States of America',
//       count: 52,
//       profileIcons: [images.EntitiesImage1]
//     }
//   ]
// }

export default withApollo(relatedStoryLine)
