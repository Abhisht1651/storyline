// @flow

// import React, { useState } from 'react'
import React, { useState, useEffect, useRef } from 'react'

import { View, Text, Image, ScrollView, TouchableOpacity, ImageProps } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import { NavigationContainerProps } from '@react-navigation/native'
import PropTypes from 'prop-types'

// Styles
import styles from '../Styles/StoryLine/HomeStyle'
import images from '../../Themes/Images'
import { widthPercentageToDP as wp } from '../../Themes/ScreenMetrics'
import moment from 'moment'


// Components
import StoryLineShortCard from '../../Components/StoryLineShortCardDefualt'
import StoryLineShortestCard from '../../Components/StoryLineShortesCard'
import StoryLineMajorEventCard from '../../Components/StoryLineMajorEventCard'
import RelatedPoll from '../../Components/RelatedPoll'
import Bubbles from '../../Components/Icons/Bubbles'
import Entities from '../../Components/Entities/ThumbsLarge'
import { X4SButton } from '../../Components/Buttons/X4SButton'
import { DefaultButton } from '../../Components/Buttons/DefaultButton'
import DropDown from '../../Components/Dropdowns/DropDown2'
import {withApollo} from 'react-apollo';
import {getStorylineDetails,getEventSources,getEventComments,getuser,getnews,getEventDetails,getrelatedStorylineEvents,getMultimediaDetails} from './my_queries';
import storyLineLongFormSingleEvent from '../../Components/StoryLineMajorEventCard'


// type Props = NavigationContainerProps & {
//   reach: number,
//   heading: string,
//   storyTitle: string,
//   description: string,
//   updatedTime: string,
//   onPressFollow: PropTypes.func,
//   followDisplay: boolean,
//   following: boolean,
//   fullTimelineData: Array<{
//     time: string,
//     storyDescription: string,
//     source: string,
//     storyImage: ImageProps
//   }>,
//   majorTimelineData: Array<{
//     previewText: string,
//     comments: number,
//     onPressComments: PropTypes.func,
//     storyImage: ImageProps,
//     topComment: {
//       name: string,
//       commentText: string,
//       replyCount: number,
//       isReply: boolean,
//       boostCount: number,
//       selectionHandler: (arg: number) => void
//     }
//   }>,
//   galleryData: Array<{ name: string, file: ImageProps }>
// }

const Home = (props) => {
  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  const storyline_id="238a90bf-5db2-4072-8af7-8b101d4873d5";

  var [datastory,setstory]=useState([]);
  var [datarow,setrow]=useState([]);
  var [datalong,setlong]=useState([]);



  const displayStoryline = async (client,storyline_id) =>{
    try{
      let source=[];
      let item={};
      const multi_id="9287fdfa-9f1b-11ea-bb37-0242ac130002";
      const {data:datamulti,loading:loadingmulti}= await client.query({query:getMultimediaDetails,variables:{multimedia_id:multi_id}});
      // console.log(datamulti.GetMultimedia);
      const {url}=datamulti.GetMultimedia;
      // console.log(url);
      const {data: dataret, loading: loadingRel} = await client.query({query: getrelatedStorylineEvents, variables: {storyline_id:storyline_id}});
      const{event}=dataret.GetStorylineEvents[0];

      const {data: dataStoryline, loading: loadingRelatedStoryline} = await client.query({query: getStorylineDetails, variables: {storyline_id:storyline_id}});
      // console.log(dataStoryline.GetStoryline)
      const {category,followers,is_active,is_live,is_trending,topic}=dataStoryline.GetStoryline
      const {data: dataevent, loading: loadingevent} = await client.query({query: getEventDetails, variables: {event_id:event}});
      // console.log(dataevent.GetEvent)  


      const {data:dataevent1, loading:loadingevent1}= await client.query({query:getEventSources,variables:{event:event}});
      const {article_id}=dataevent1.GetEventArticle[0];
      const {data:datanews, loading:loadingnews}= await client.query({query:getnews,variables:{article_id:article_id}});
      let item1={};
      let source1=[]
      var {publisher,headline,t_update}=datanews.GetNewsArticle[0];
      item1['time']=t_update;
      item1['source']=publisher
      item1['storyDescription']=headline
      item1['storyImage']=url
      item1['dotColor']='47C3F4'
      source1[0]=item1
      setrow(source1);


      let item2={}
      let source2=[]
      item2['time']=t_update
      item2['previewText']=headline
      item2['comments']=50
      item2['onPressComments']= () => {}
      item2['storyImage']=url
      item2["dotColor"]="47C3F4"
      source2[0]=item2
      setlong(source2)
      // item2['topComment']=

      var{headline,event_time,t_update,image, description }=dataevent.GetEvent
      item['heading']=category
      item['storyTitle']=headline
      item['updatedTime']=t_update
      item['date']=event_time
      item['description']=description
      setstory(item);
      // seturl(url);
      }
    catch(e){
      console.log(e)
      }
    }
  // console.log(datarow)
  useEffect(() => {displayStoryline(client,storyline_id);}, []);

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
      item['isReply']=true
      item['replyCount']=1
      item['selectionHandler']=() => {}
      source[0]=item
      setcomments(item);
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displaycomments(client,resource_id);}, []);
  // console.log(com)
  datalong[0] = { ...datalong[0], topComment:com }

  // console.log(datalong)

  const {navigation,onPressFollow,reach,following,followDisplay}=props;
  const {galleryData}=props
  const fullTimelineData=datarow
  const majorTimelineData=datalong
  // console.log(majorTimelineData)
  // console.log(datalong)

  var { heading, storyTitle, description,updatedTime} = datastory
  // var remTime = updatedTime
  // var currTime = new Date()
  // var time = currTime-remTime
  // var seconds = moment.duration(time).seconds()
  // var minutes = moment.duration(time).minutes()
  // var hours = moment.duration(time).hours()
  // var days = moment.duration(time).days()
  // var months = moment.duration(time).months()
  // var years = moment.duration(time).years()
  // if (years > 0 && isPollActive) {
  //   updatedTime = years.toString() + (years === 1 ? ' year left' : ' years left')
  // } else if (months > 0 && isPollActive) {
  //   updatedTime = months.toString() + (months === 1 ? ' month left' : ' months left')
  // } else if (days > 0 && isPollActive) {
  //   updatedTime = days.toString() + (days === 1 ? ' day left' : ' days left')
  // } else if (hours > 0 &&isPollActive) {
  //   updatedTime = hours.toString() + (hours === 1 ? ' hour left' : ' hours left')
  // } else if (minutes > 0 && isPollActive) {
  //   updatedTime = minutes.toString() + (minutes === 1 ? ' minute left' : ' minutes left')
  // } else if (seconds > 0 && isPollActive) {
  //   updatedTime =seconds.toString() + (seconds === 1 ? ' second left' : ' seconds left')
  // } else {
  //   updatedTime = 'Poll is expired'
  // }
  const {backIcon,iconStoryLineTrending, iconPeople,iconStoryLineReach,majorEventsNotSelected,
    majorEventsSelected, allEventsNotSelected, allEventsSelected} = images

  const [event, setEvent] = useState(1)
  const [sortTimeline, setSortTimeline] = useState('Latest')
  majorTimelineData[0] = { ...majorTimelineData[0], dotColor: '47C3F4' }
  // fullTimelineData[0] = { ...fullTimelineData[0],  }

  const setEventFuncation = (current) => {
    setEvent(current)
  }

  const setSortTimeLineFunction = (current) => {
    if (current === 2) {
      setSortTimeline('Oldest')
    } else {
      setSortTimeline('Latest')
    }
  }
  const renderDetailFullEvent = (rowData, sectionID) => {
    const { storyImage } = rowData
    const {time, source, storyDescription}=rowData
    return (
      <View key={sectionID} style={styles.itemContainer}>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.eventContainer}>
          <StoryLineShortestCard
            description={storyDescription}
            source={source}
            storyImage={{uri:storyImage}}
            type={2}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderDetailMajorEvent = (rowData, sectionID) => {
    const { time, storyImage, previewText, comments, onPressComments, topComment } = rowData
    // console.log(topComment)
    return (
      <View key={sectionID} style={styles.itemContainer}>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
        <TouchableOpacity style={styles.eventContainer}>
          <StoryLineMajorEventCard
            previewText={previewText}
            comments={comments}
            onPressComments={onPressComments}
            topComment={topComment}
            storyImage={{uri:storyImage}}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const timeline1 = (
    <View style={event === 2 ? styles.timeLineContainer : styles.noDisplay}>
      <Timeline
        style={styles.list}
        innerCircle="dot"
        data={fullTimelineData}
        circleSize={wp('2.67%')}
        dotSize={wp('1.86%')}
        circleColor="#47C3F4"
        lineColor="#47C3F4"
        renderDetail={renderDetailFullEvent}
        showTime={false}
      />
    </View>
  )

  const timeline2 = (
    <View style={event === 1 ? styles.timeLineContainer : styles.noDisplay}>
      <Timeline
        style={styles.list}
        innerCircle="dot"
        data={majorTimelineData}
        circleSize={wp('2.67%')}
        dotSize={wp('1.86%')}
        circleColor="#47C3F4"
        lineColor="#47C3F4"
        renderDetail={renderDetailMajorEvent}
        showTime={false}
      />
    </View>
  )

  const renderGalleryData = galleryData.map((item, index) => {
    const { name, file } = item
    return (
      <View key={index} style={styles.previewContainer}>
        <Image source={file} style={styles.galleryImage} />
        <Text style={styles.galleryText}>{name}</Text>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.topCover} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={backIcon} style={styles.backIcon} />
            <Bubbles />
          </View>
          <View style={styles.divider} />
          <View style={styles.storyContainer}>
            <View style={styles.storyHeadingContainer}>
              <View style={styles.storyHeading}>
                <Text style={styles.headingText}>{heading}</Text>
                <View style={styles.dot} />
                <Image source={iconStoryLineTrending} />
                <Text style={styles.headingText}> Trending</Text>
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
            <View style={styles.storyHeading}>
              <Image source={iconStoryLineReach} />
              <Text style={styles.friendsText}>{reach}K Reached</Text>
              <Image source={iconPeople} />
              <Text style={styles.friendsText}>241K Followers</Text>
            </View>
            <View style={styles.storyTitle}>
              <Text style={styles.storyTitleText} onPress={() => navigation.navigate('FullPost')}>
                {storyTitle}
              </Text>
              <Text style={styles.updateTimeText}>Updated {updatedTime} ago</Text>
            </View>
            <View style={styles.storyDescription}>
              <Text style={styles.storyDescriptionText}>{description}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.suggestionsContainerEntities}>
            <View style={styles.titleContainerEntities}>
              <Text style={styles.titleText}>Related Entities</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Related Entities')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scrollViewContainer}>
              <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                <View style={styles.previewContainerEntities}>
                  <Entities />
                </View>
                <View style={styles.previewContainerEntities}>
                  <Entities />
                </View>
                <View style={styles.previewContainerEntities}>
                  <Entities />
                </View>
                <View style={styles.previewContainerEntities}>
                  <Entities />
                </View>
                <View style={styles.previewContainerEntities}>
                  <Entities />
                </View>
                <View style={styles.previewContainerEntities}>
                  <Entities />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.timeLineHeader}>
            <Text style={styles.timeLineText}>TimeLine</Text>
            <View style={styles.sortContainer}>
              <Text style={styles.sortByText}>Sort by </Text>
              <Text style={styles.sortText}>{sortTimeline}</Text>
              <DropDown
                headerTitle="Sort by"
                content={['Latest Events First', 'Oldest Events First']}
                type={2}
                getOption={(item) => setSortTimeLineFunction(item)}
              />
            </View>
          </View>
          <View style={styles.eventHeader}>
            <TouchableOpacity style={styles.eventHeaderItem} onPress={() => setEventFuncation(1)}>
              <Image
                source={event === 1 ? majorEventsSelected : majorEventsNotSelected}
                style={styles.eventIcon}
              />
              <Text style={event === 1 ? styles.eventActiveText : styles.eventLightText}>
                Major Events
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eventHeaderItem} onPress={() => setEventFuncation(2)}>
              <Image
                source={event === 1 ? allEventsNotSelected : allEventsSelected}
                style={styles.eventIcon}
              />
              <Text style={event === 2 ? styles.eventActiveText : styles.eventLightText}>
                All events
              </Text>
            </TouchableOpacity>
          </View>
          {timeline1}
          {timeline2}
          <View style={styles.suggestionsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Related Poll</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Related Polls')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scrollViewContainer}>
              <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                <View style={styles.previewContainer}>
                  <RelatedPoll />
                </View>
                <View style={styles.previewContainer}>
                  <RelatedPoll />
                </View>
                <View style={styles.previewContainer}>
                  <RelatedPoll />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.suggestionsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Related StoryLine</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Related StoryLines')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scrollViewContainer}>
              <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                <View style={styles.previewContainer}>
                  <StoryLineShortCard />
                </View>
                <View style={styles.previewContainer}>
                  <StoryLineShortCard />
                </View>
                <View style={styles.previewContainer}>
                  <StoryLineShortCard />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.suggestionsContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Gallery ({galleryData.length} Items)</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Gallery View')}>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scrollViewContainer}>
              <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                {renderGalleryData}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

Home.defaultProps = {
  reach: 30,
  heading: 'World',
  storyTitle: 'i am home',
  description:
    'British sovereign bonds are rallying strongly after the EU warned over the weekend that Boris Johnson faces an uphill battle in striking a Brexit.',
  updatedTime: '100m',
  onPressFollow: () => {},
  following: false,
  followDisplay: true,
  // fullTimelineData: [
  //   {
  //     time: 'Sept 21, 2019, 5:00PM ET',
  //     storyDescription: 'Ray Contreras talks about the different accents',
  //     source: 'Forbes',
  //     storyImage: images.storyImage
  //   }
  // ],
  majorTimelineData: [    
    {
      time: 'Sept 21, 2019, 5:00PM ET',
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
  ],
  galleryData: [
    {
      name: 'Labor conference in London',
      file: images.storyImage
    }
  ]
}

export default withApollo(Home)
