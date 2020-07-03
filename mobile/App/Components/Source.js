// @flow
import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, ImageProps } from 'react-native'

// Styles
import styles from './Styles/SourceStyle'
import images from '../Themes/Images'
import {withApollo} from 'react-apollo';
import {getStorylineDetails,getEventSources,getnews,getMultimediaDetails} from '../Containers/StoryLine/my_queries'



// type Props = {
//   title: string,
//   date: string,
//   description: string,
//   storyImage: ImageProps
// }

const storyLineShortestCard = (props) => {
  var [storyLineShortestCard,setFeed]=useState([]);


  const client=props.client;
  if (!client){
    console.log("Client not working")
  }
  var [url,seturl]=useState([]);
  const displaymulti = async (client) =>{
    try{
      const multi_id="9287fdfa-9f1b-11ea-bb37-0242ac130002";
      const {data:datamulti,loading:loadingmulti}= await client.query({query:getMultimediaDetails,variables:{multimedia_id:multi_id}});
      const {url}=datamulti.GetMultimedia;
      seturl(url);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displaymulti(client);}, []);
  const event="1c7a4e9c-bf37-4827-95f0-73878814b571";
  const displaysource = async (client,event) =>{
    try{
      const {data:dataevent, loading:loadingevent}= await client.query({query:getEventSources,variables:{event:event}});
      const {article_id}=dataevent.GetEventArticle[0];
      const {data:datanews, loading:loadingnews}= await client.query({query:getnews,variables:{article_id:article_id}});
      let item={};
      const {publisher,headline,t_update}=datanews.GetNewsArticle[0];
      item['date']=t_update;
      item['title']=publisher
      item['description']=headline
      setFeed(item);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displaysource(client,event);}, []);
  
  const { date,title,description} = storyLineShortestCard
  const { iconSource } = images
  const storyImage= url;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sourceText}>{title}</Text>
        <Image source={iconSource} style={styles.iconSource} />
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri:storyImage.toString()}} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{date}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

// storyLineShortestCard.defaultProps = {
//   title: 'AAJ TAK',
//   description: 'AS Boris Delivers A Brexit Deal, EU Have Agreed…',
//   storyImage: images.storyImage,
//   // date: '23 hours ago'
// }

export default withApollo(storyLineShortestCard)