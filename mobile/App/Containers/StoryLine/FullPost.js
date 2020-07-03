// @flow

// import React, { useState } from 'react'
import React, { useState, useEffect, useRef } from 'react'
import {withApollo} from 'react-apollo';
import {getEventComments,getEventDetails,getStorylineDetails,getuser,getMultimediaDetails} from './my_queries';

import { View, Text, Image, ScrollView, TouchableOpacity, ImageProps } from 'react-native'
import { NavigationContainerProps } from '@react-navigation/native'

// Styles
import styles from '../Styles/StoryLine/FullPostStyle'
import images from '../../Themes/Images'

// Components
import CommentBox from '../../Components/CommentBox'
import Bubbles from '../../Components/Icons/Bubbles'
import CommentBar from '../../Components/Commentbars/Commentbar2'
import DropDown from '../../Components/Dropdowns/DropDown2'
import Source from '../../Components/Source'

// type Props = NavigationContainerProps & {
//   storyHeading: string,
//   storyTitle: string,
//   description: string,
//   updatedTime: string,
//   date: string,
//   comments: Array<{
//     name: string,
//     commentText: string,
//     profilePic: ImageProps,
//     boosts: number,
//     replies: Array<{
//       name: string,
//       commentText: string,
//       profilePic: ImageProps,
//       boosts: number
//     }>
//   }>
// }

const FullPost = (props) => {
  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  var [relatefull,setFeed]=useState([]);

  const event_id="abb90002-a2a3-46a4-9cac-eb487a092016";
  const displayfull = async (client,event_id) =>{
    try{
      let source=[];
      const {data: dataevent, loading: loadingevent} = await client.query({query: getEventDetails, variables: {event_id:event_id}});
      // console.log(dataevent.GetEvent)
      let item={};
      const {headline,event_time,t_update,image, description }=dataevent.GetEvent
      item['storyHeading']=headline
      item['storyTitle']=headline
      item['updatedTime']=t_update
      item['date']=event_time
      item['description']=description
      setFeed(item);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displayfull(client,event_id);}, []);
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


  var [com,setcomments]=useState([]);
  const resource_id="93101fc6-9bb1-497f-9b3c-5f3986352632";
  const displaycomments = async (client,resource_id) =>{
    try{
      let source=[];
      let item={};
      const {data: datacomment, loading: loadingcomment} = await client.query({query: getEventComments, variables: {resource_id:resource_id}});
      const {comment_id,comment_text,parent_comment_id,commented_by }=datacomment.GetComments[0];
      // console.log(commented_by)
      const {data: datauser, loading: loadinguser} = await client.query({query: getuser, variables: {user_id:commented_by}});
      const {name}=datauser.GetUserDetails[0];
      item["name"]=name;
      item['boosts']=2
      item['commentText']=comment_text
      item['replies']=[]
      item['profilePic']=6
      source[0]=item
      setcomments(source);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displaycomments(client,resource_id);}, []);
  // console.log(com)




  const { navigation} = props
  // console.log(comments)
  const comments=com;
  const {storyHeading, storyTitle, updatedTime, date, description}=relatefull;
  const { backIcon,  commentIcon, voterIcon2 } = images
  const storyImage=url;
  const [, setComment] = useState('')

  const inputHandler = (text) => {
    setComment(text)
  }

  const selectionHandler = (text) => {
    console.log(text)
  }

  const repliesDisplay = (replies, type) => {
    const display1 = replies.map((reply, index) => {
      const { name, commentText, profilePic, boosts } = reply
      return (
        <View key={index} style={styles.replyContainer}>
          <Image source={voterIcon2} style={styles.commentsIcon} />
          <View style={styles.replyBoxContainer}>
            <CommentBox
              isReply
              name={name}
              commentText={commentText}
              profilePic={profilePic}
              onClickBoost={() => navigation.navigate('Boost Screen')}
              boosts={boosts}
            />
          </View>
        </View>
      )
    })
    const display2 =
      replies.length !== 0 ? (
        <View style={styles.viewRepliesContainer}>
          <Text style={styles.viewRepliesText}>View {replies.length} Replies</Text>
        </View>
      ) : null

    if (type === 1) {
      return display1
    }
    return display2
  }

  const commentsElements = comments.map((item, index) => {
    const { name, commentText, profilePic, boosts, replies } = item
    return (
      <View key={index} style={styles.comments}>
        <View style={styles.commentIconContainer}>
          <Image source={profilePic} style={styles.commentsIcon} />
        </View>
        <View style={styles.commentBoxContainer}>
          <CommentBox
            name={name}
            commentText={commentText}
            boosts={boosts}
            onClickBoost={() => navigation.navigate('Boost Screen')}
            replyCount={replies.length}
          />
          {replies.length === 1 ? repliesDisplay(replies, 1) : repliesDisplay(replies, 2)}
        </View> 
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.topCover} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Bubbles />
          </View>
          <View style={styles.divider} />
          <View style={styles.storyImageContainer}>
            <Image source={{uri:storyImage.toString()}} style={styles.storyImage} />
          </View>
          <View style={styles.storyContainer}>
            <View style={styles.storyTitle}>
              <Text style={styles.storyTitleTextLight}>{storyHeading}</Text>
              <Text style={styles.storyTitleText}>{storyTitle}</Text>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.updateTimeText}>Updated {updatedTime} ago</Text>
            </View>
            <View style={styles.storyDescription}>
              <Text style={styles.storyDescriptionText}>{description}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.sourceContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Sources</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Suggested StoryLine')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sourceItem}>
              <Source />
            </View>
            <View style={styles.sourceItem}>
              <Source />
            </View>
            <View style={styles.sourceItem}>
              <Source />
            </View>
          </View>

          <View style={styles.commentsContainer}>
            <View style={styles.divider} />
            <View style={styles.commentsContainer}>
              <View style={styles.commentsHeaderContainer}>
                <View style={styles.commentButtonContainer}>
                  <Image source={commentIcon} style={styles.commentIcon} />
                  <Text style={styles.commentButtonText}>154K Comments</Text>
                </View>
                <View style={styles.headerRight}>
                  <Text style={styles.mostPopularText}>Most Popular</Text>
                  <DropDown
                    headerTitle="Sort by"
                    content={['Most popular', 'Most recent']}
                    getOption={selectionHandler}
                    type={2}
                  />
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.allCommentsContainer}>{commentsElements}</View>
            </View>
          </View>
        </View>
        <View style={styles.commentBar}>
          <CommentBar captureText={inputHandler} onPress={() => {}} />
        </View>
      </ScrollView>
    </View>
  )
}

// FullPost.defaultProps = {
//   storyHeading: 'UK exit from the European Union',
//   storyTitle: 'Brexit: UK exit from the European Union',
//   description:
//     'British sovereign bonds are rallying strongly after the EU warned over the weekend that Boris Johnson faces an uphill battle in striking a Brexit.',
//   updatedTime: '2m',
//   date: 'Sept 21, 2019, 5:00PM ET',
//   comments:
//   [
//     {
//       name: 'Jammie ',
//       commentText:
//         'When Robert Mueller broke his silence in May, his main point was that his long-awaited report spoke for itself.',
//       profilePic: images.voterIcon1,
//       boosts: 450,
//       replies: [
//         {
//           name: 'Lorraine Kim',
//           commentText:
//             'After reports emerged suggesting the Obama administration would issue additional sanctions imminently.',
//           profilePic: images.voterIcon2,
//           boosts: 450
//         }
//       ]
//     },
//     {
//       name: 'Abraham P.',
//       commentText:
//         'When Robert Mueller broke his silence in May, his main point was that his long-awaited report spoke for itself.',
//       profilePic: images.voterIcon3,
//       boosts: 450,
//       replies: [
//         {
//           name: 'Lorraine Kim',
//           commentText:
//             'After reports emerged suggesting the Obama administration would issue additional sanctions imminently.',
//           profilePic: images.voterIcon2,
//           boosts: 450
//         },
//         {
//           name: 'Lorraine Kim',
//           commentText:
//             'After reports emerged suggesting the Obama administration would issue additional sanctions imminently.',
//           profilePic: images.voterIcon2,
//           boosts: 450
//         }
//       ]
//     },
    
//   ]
// }

export default withApollo(FullPost)
