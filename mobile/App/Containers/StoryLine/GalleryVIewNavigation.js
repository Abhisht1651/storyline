// @flow

// import React from 'react'
import React, { useState, useEffect, useRef } from 'react'

import { View, Text, ImageProps, Image, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

// Styles
import styles from '../Styles/StoryLine/GalleryViewNavigationStyle'
import images from '../../Themes/Images'
import {getMultimediaDetails,getStorylineDetails} from './my_queries'
import {withApollo} from 'react-apollo';


const Tab = createMaterialTopTabNavigator()

type Props = {
  imageGallery: Array<{
    name: string,
    file: ImageProps
  }>,
  videoGallery: Array<{
    name: string,
    file: ImageProps
  }>
}

const galleryViewNavigation = (props) => {
  var [dataheading,setFeed]=useState([]);
  var [url,seturl]=useState([]);

  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }

  const displaygallary = async (client) =>{
    try{
      let source=[];
      
      const multi_id="9287fdfa-9f1b-11ea-bb37-0242ac130002";
      const {data:datamulti,loading:loadingmulti}= await client.query({query:getMultimediaDetails,variables:{multimedia_id:multi_id}});
      const {url}=datamulti.GetMultimedia;

      // const {data: dataRelatedStoryline, loading: loadingRelatedStoryline} = await client.query({query: getStorylineDetails, variables: {storyline_id:storyline_id2}});
      // source[0]=dataRelatedStoryline.GetStoryline;
      
      setFeed(source);
      seturl(url);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displaygallary(client);}, []);

  
  var videoGallery  = []
  const t1={name:"Inside",file:url}
  videoGallery[0]=t1

  // console.log(imageGallery)
  var imageGallery=[]
  const t={name:"Inside",file:url}
  imageGallery[0]=t
  // console.log(imageGallery)

  const display = (type) => {
    let data = [...imageGallery]
    if (type === 2) {
      data = [...videoGallery]
    }
    if (type === 1) {
      data = [...imageGallery, ...videoGallery]
    }
    const displayResult = data.map((item, index) => {
      const { file,name } = item
      // console.log(file)

      return (
        <View key={index} style={styles.previewContainer}>
          <Image source={{uri:file.toString()}} style={styles.galleryImage} />
          <Text style={styles.galleryText}>{name}</Text>
        </View>
      )
    })

    return displayResult
  }
  const ImagesView = (type) => {
    return <ScrollView contentContainerStyle={styles.contentContainer}>{display(type)}</ScrollView>
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: styles.tab,
        style: styles.tabContainer,
        indicatorStyle: styles.indicator,
        labelStyle: styles.label,
        activeTintColor: '#1F1F60',
        inactiveTintColor: '#8F8FAF'
      }}>
      <Tab.Screen name="All" component={() => ImagesView(1)} />
      <Tab.Screen name="Videos" component={() => ImagesView(2)} />
      <Tab.Screen name="Images" component={() => ImagesView(3)} />
    </Tab.Navigator>
  )
}

// galleryViewNavigation.defaultProps = {
//   imageGallery: [
//     { name: 'Inside', file: images.storyImage },
//   ],
//   videoGallery: [
//     { name: 'hi', file: images.storyImage },
//     { name: 'Labor conference in London', file: images.storyImage },
//     { name: 'Labor conference in London', file: images.storyImage },
//     { name: 'Labor conference in London', file: images.storyImage }
//   ]
// }

export default withApollo(galleryViewNavigation)
