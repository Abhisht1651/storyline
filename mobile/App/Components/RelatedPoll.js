import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/RelatedPollStyle'
import images from '../Themes/Images'
import {getRelatedPolls,getPollDetails,getpolloption} from '../Containers/StoryLine/my_queries'
import {withApollo} from 'react-apollo';
import { MediumThinnerButton } from './Buttons/MediumThinnerButton'
import moment from 'moment'

// type Props = {
//   border: boolean,
//   question: string,
//   votes: number,
//   timeLeft: number,
//   isPollActive: boolean,
//   voterIcons: Array<string>,
//   option: Array<string>,
//   onPressVote: PropTypes.func
// }
const relatedPoll = (props) => {
  var [relatedPoll,setFeed]=useState([]);
  var [option,setoption]=useState([]);

  const client=props.client;
  if (!client){
    console.log("CLient not working")
  }
  const storyline_id="629e108e-672c-426a-9731-7039e72de685";
  const displayPolls = async (client,storyline_id) =>{
    try{
      var source=[];
      let item={};
      const {data: dataRelatedPoll, loading: loadingRelatedPoll} = await client.query({query: getRelatedPolls, variables: {storyline_id}});
      const {x,poll_id}=dataRelatedPoll.GetRelatedPollstoStoryline[0];

      const {data: dataPoll, loading: loadingPoll} = await client.query({query: getPollDetails, variables: {poll_id}});
      // console.log(dataPoll)
      const {heading,is_open, created_on, expiring_time,question}=dataPoll.GetPoll;
      const {data: dataPolloption, loading: loadingPolloption} = await client.query({query: getpolloption, variables: {poll_question:poll_id}});
      // console.log(dataPolloption.GetPollOptions)


      var number_of_votes_arr=[]
      var options=[]
      var poll_option_id_arr=[]
      for (var j = 0; j < dataPolloption.GetPollOptions.length; j++) {
      const {number_of_votes,option,poll_option_id}=dataPolloption.GetPollOptions[j];
      options[j]=option
      number_of_votes_arr[j]=number_of_votes
      poll_option_id_arr[j]=poll_option_id
      }
      // console.log(number_of_votes_arr)      
      item['border']=true;
      item['question']=question;
      item['votes']=number_of_votes_arr.reduce((a, b) => a + b, 0);
      item['timeLeft']=expiring_time;
      item['isPollActive']=is_open;
      // item['voterIcons']=[images.voterIcon1, images.voterIcon2, images.voterIcon3]
      // item['option']=options
      item['onPressVote']=() => {};      
      source[0]=item;
      setFeed(item);
      setoption(options)
      }
    catch(e){
      console.log(e)
      }
    }
  useEffect(() => {displayPolls(client,storyline_id);}, []);

  const { pollActiveIcon, pollInactiveIcon } = images
  var { border, question, votes, timeLeft, isPollActive, onPressVote} = relatedPoll
  // console.log(option[0])
  var remTime = timeLeft
  var currTime = new Date()
  var time = remTime - currTime
  var seconds = moment.duration(time).seconds()
  var minutes = moment.duration(time).minutes()
  var hours = moment.duration(time).hours()
  var days = moment.duration(time).days()
  var months = moment.duration(time).months()
  var years = moment.duration(time).years()
  if (years > 0 && isPollActive) {
    timeLeft = years.toString() + (years === 1 ? ' year left' : ' years left')
  } else if (months > 0 && isPollActive) {
    timeLeft = months.toString() + (months === 1 ? ' month left' : ' months left')
  } else if (days > 0 && isPollActive) {
    timeLeft = days.toString() + (days === 1 ? ' day left' : ' days left')
  } else if (hours > 0 &&isPollActive) {
    timeLeft = hours.toString() + (hours === 1 ? ' hour left' : ' hours left')
  } else if (minutes > 0 && isPollActive) {
    timeLeft = minutes.toString() + (minutes === 1 ? ' minute left' : ' minutes left')
  } else if (seconds > 0 && isPollActive) {
    timeLeft =seconds.toString() + (seconds === 1 ? ' second left' : ' seconds left')
  } else {
    timeLeft = 'Poll is expired'
  }
  const voterIcons=[images.voterIcon1, images.voterIcon2, images.voterIcon3];
  const pollIcon = isPollActive ? pollActiveIcon : pollInactiveIcon

  
  const pollText = isPollActive ? `${timeLeft}` : 'Poll ended'

  const [optionSelected, setOptionSelected] = useState(0)

  const optionSelectFunction = (currentOption) => {
    if (currentOption === optionSelected) { 
      setOptionSelected(0)
      return
    }
    setOptionSelected(currentOption)
  }

  const voterIconsElement = voterIcons.map((voterIcon, index) => (
    <Image source={voterIcon} key={index} style={styles.voterIcon} />
  ))

  return (
    <View style={border ? styles.container : styles.containerWithoutBorder}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      <View style={styles.voterAndVotesContainer}>
        <View style={styles.voterContainer}>
          <View style={styles.voterIconContainer}>{voterIconsElement}</View>
          <View style={styles.votesContainer}>
            <Text style={styles.votes}>{votes} votes</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <View style={styles.timeIconContainer}>
            <Image source={pollIcon} style={styles.pollIcon} />
          </View>
          <View style={styles.timeTextContainer}>
            <Text style={styles.timeText}>{pollText}</Text>
          </View>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionContainer} onPress={() => optionSelectFunction(1)}>
          <View style={styles.option}>
            {optionSelected === 1 ? <View style={styles.optionFill} /> : null}
          </View>
          <View style={styles.optionTextContainer}>
  <Text style={styles.optionText}>{option[0]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => optionSelectFunction(2)}>
          <View style={styles.option}>
            {optionSelected === 2 ? <View style={styles.optionFill} /> : null}
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{option[1]}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionContainer} onPress={() => optionSelectFunction(3)}>
          <View style={styles.option}>
            {optionSelected === 3 ? <View style={styles.optionFill} /> : null}
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{option[2]}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={() => optionSelectFunction(4)}>
          <View style={styles.option}>
            {optionSelected === 4 ? <View style={styles.optionFill} /> : null}
          </View>
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionText}>{option[2]}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <MediumThinnerButton title="Vote" outline onPress={onPressVote} />
      </View>
    </View>
  )
}


// relatedPoll.defaultProps = {
//   border: true,
//   question: 'Who are your favorites for the World Cup 2020?',
//   votes: 54,
//   timeLeft: 2,
//   isPollActive: true,
//   voterIcons: [images.voterIcon1, images.voterIcon2, images.voterIcon3],
//   option: ['Bharat', 'West ', 'Australia'],
//   onPressVote: () => {}
// }

export default withApollo(relatedPoll)
