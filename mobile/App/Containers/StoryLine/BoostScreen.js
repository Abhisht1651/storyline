// @flow

// import React from 'react'
import React, { useState, useEffect, useRef } from 'react'
import {withApollo} from 'react-apollo';
import {getCommentBoosts,getuser} from './my_queries';

import { View, ScrollView, Image, Text, TouchableOpacity, ImageProps } from 'react-native'
import { NavigationContainerProps } from '@react-navigation/native'

// Styles
import styles from '../Styles/StoryLine/BoostScreenStyle'
import images from '../../Themes/Images'

// Components
import ListOfUsers from '../../Components/ListOfUsers/ListOfUsers'

// type Props = NavigationContainerProps & {
//   boostsData: Array<{
//     name: string,
//     image: ImageProps,
//     buttonText: string,
//     buttonTextAfterPress: string
//   }>
// }

const relatedPolls = (props) => {
  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  
  var [relatedboost,setFeed]=useState([]);

  const { navigation, boostsData } = props
  const { backIcon } = images
  const boostContent_id="edfc62bf-3ca6-431f-b714-8dc3cf497f63";
  const displayboost = async (client,boostContent_id) =>{
    try{
      let source=[];
      let item={};
      const {data: databoost, loading: loadingboost} = await client.query({query: getCommentBoosts, variables: {boostContent_id:boostContent_id}});
      const {boostBy}=databoost.GetBoostsbyContent[0]
      const {data: datauser, loading: loadinguser} = await client.query({query: getuser, variables: {user_id:boostBy}});
      const {name}=datauser.GetUserDetails[0];
      item["name"]=name;
      item['buttonText']="Add";
      item['buttonTextAfterPress']='Added';
      item['image']=7;
      source[0]=item
      setFeed(source);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displayboost(client,boostContent_id);}, []);
  // console.log(relatedboost)
  // console.log(boostsData)

  const storyLineDataElements = relatedboost.map((item, index) => {
    const { name, image, buttonText, buttonTextAfterPress } = item
    return (
      <View key={index} style={styles.previewContainer}>
        <ListOfUsers
          type={2}
          buttonText={buttonText}
          name={name}
          image={image}
          buttonTextAfterPress={buttonTextAfterPress}
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
        <Text style={styles.relatedText}>Boosts</Text>
      </View>
      <View style={styles.divider} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>{storyLineDataElements}</View>
      </ScrollView>
    </View>
  )
}

// relatedPolls.defaultProps = {
//   boostsData: [
//     {
//       name: 'Abhisht Tiwari',
//       image: images.voterIcon2,
//       buttonText: 'Add',
//       buttonTextAfterPress: 'Added'
//     },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // },
//     // {
//     //   name: 'Amelia Jones',
//     //   image: images.voterIcon2,
//     //   buttonText: 'Add',
//     //   buttonTextAfterPress: 'Added'
//     // }
//   ]
// }

export default withApollo(relatedPolls)
