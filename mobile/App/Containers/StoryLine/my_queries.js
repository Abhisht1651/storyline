import gql from 'graphql-tag'

export const getStorylineDetails =gql`
    query getStorylineDetails($storyline_id:ID!)  {
      GetStoryline(storyline_id:$storyline_id){
        topic
        category
        is_live
        is_active
        is_trending
        is_single_event
        followers
        last_updated
      }
    }
`;

// export const updateStorylineFollowers=gql`
//     mutation ($storyline_id:ID!,$followers:Int!){
//       UpdateStoryline(storyline_id:$storyline_id,followers:$followers){
//         followers
//       }
//     }
// `;

// export const addStorylineFollower=gql` 
//     mutation ($storyline:ID!,$user:ID!) {
//       AddStorylineFollower(storyline:$storyline,user:$user){
//         user
//       }
//     }
    
// `
// export const deleteStorylineFollower=gql`
//     mutation ($storyline:ID!,$user:ID!) {
//       DeleteStorylineFollower(storyline:$storyline,user:$user){
//         user
//       }
//     }
    
// `

// export const addUserToStoryline=gql`
//     mutation ($user:!ID,$storyline:ID!) {
//       AddStorylineFollower(user:$user,storyline:$storyline){
//         user
//       }
//       AddStorylineReach(user_id:$user,storyline_id:$storyline){
//         user_id
//       }
//     }

// `

export const getEventComments =gql`
    query getEventComments($resource_id :ID!)  {  
      GetComments(resource_id:$resource_id){
        comment_id
        commented_by
        comment_text
        parent_comment_id
        t_create
        
      }
    }
`;

// export const addEventComment=gql`
//     mutation ($comment_id: ID!, $commented_by: ID!, $comment_text: String!, $resource_id: ID!, $parent_comment_id: ID!){
//       AddComment(comment_id: $comment_id, commented_by: $commented_by, comment_text: $comment_text, resource_id: $resource_id, parent_comment_id: $parent_comment_id){
//         comment_text
//       }
//     }

// `
export const getCommentBoosts=gql`
    query getCommentBoosts($boostContent_id:ID!){
      GetBoostsbyContent(boostContent_id:$boostContent_id){
        boostBy
        boost_id
      }
    }
`
export const getuser=gql`
      query  getuser($user_id:ID!) {
        GetUserDetails(user_id:$user_id){
          name
        }
      }
`


// export const addBoostOnComment=gql`
//     mutation($boost_id:ID!,$boostBy:ID!,$boostContent_id:ID!){
//       AddBoost(boost_id:$boost_id,boostBy:$boostBy,boostContent_id:$boostContent_id){
//         boostContent_id
//       }
//     }
// `
// export const removeUnboostOnComment=gql`
//     mutation($boost_id:ID!) {
//       DeleteBoost(boost_id:$boost_id){
//         boostBy
//       }
//     }

// `

export const getrelatedStorylineEvents=gql`
    query  getrelatedStorylineEvents($storyline_id:ID!) {
      GetStorylineEvents(storyline_id:$storyline_id){
        event
      }
    }
`



export const getStorylineEvents=gql`
    query  getStorylineEvents($event_id:ID!){
      GetEvent(event_id:$event_id){
        event_id
        headline
        event_time
        t_create
        image
      }
    }

`
// export const getMultimediaDetails=gql`
//     query getMultimediaDetails($multimedia_id:ID!){
//       GetMultimedia(multimedia_id:$multimedia_id){
//         multimedia_id
//         t_create
//         url
//       }
//     }
// `
export const getRelatedStorylines=gql`
    query  getRelatedStorylines($storyline_id1:ID!) {
      getStorylineStoryline(storyline_id1:$storyline_id1){
        storyline_id2
        rank
      }
    }
`
// export const getDetailsOfRelatedStorylines=gql`
//     query getDetailsOfRelatedStorylines($storyline_id1:ID!) {
//       GetStoryline(storyline_id:$storyline_id1:ID!){
//         topic
//         category
//         is_trending
//         is_live
//         is_active
//         reach
//         followers
//         last_updated
//         is_single_event
//       }
//     }
// `

// export const getLatestEvent=gql`
//     query  getLatestEvent($storyline_id:ID!){
//       GetStorylineEvents(storyline_id:$storyline_id){
//         event
//         t_create
//       }
//     }
// `

// export const getMultimediaDetails =gql`
//     query getMultimediaDetails($multimedia_id:ID!) {
//       GetMultimedia(multimedia_id:$multimedia_id){
//         multimedia_type
//         t_create
//         url
//       }
//     }

// `
export const getRelatedEntities =gql`
    query getRelatedEntities($entity_id:ID!) {
      GetRelatedStorylinesToEntity(entity_id:$entity_id){
        entity_id
      }
    }
`

export const getEntityDetails =gql`
    query getEntityDetails($entity_id:ID!){
      GetEntity(entity_id:$entity_id){
        name
        image
        followers
      }
    }
`
// // export const getMultimediaDetails=gql`
// //     query getMultimediaDetails($multimedia_id:ID!){
// //       GetMultimedia(multimedia_id:$multimedia_id){
// //         multimedia_id
// //         t_create
// //         url
// //       }
// //     }

// // `

export const getRelatedPolls =gql`
    query   getRelatedPolls($storyline_id:ID!)  {
      GetRelatedPollstoStoryline(storyline_id:$storyline_id){
            poll_id
          }
  }
`

export const getPollDetails =gql`
    query getPollDetails($poll_id:ID!) {
      GetPoll(poll_id:$poll_id){
        heading
        is_open
        created_on
        expiring_time
        question
        
      }
    }

 `
export const getpolloption=gql`
    query getpolloption($poll_question:ID!){
      GetPollOptions(poll_question:$poll_question){
        poll_option_id
        option
        number_of_votes
      }
    }
`

// export const getStorylineGallery =gql`
//     query getStorylineGallery($resource_id:ID!){
//       GetMultimediaResource(resource_id:$resource_id){
//         multimedia_id
//       }
//     }

// `
// // export const getMultimediaDetails=gql`
// //     query getMultimediaDetails($multimedia_id:ID!) {
// //       GetMultimedia(multimedia_id:$multimedia_id){
// //         multimedia_type
// //         t_create
// //         url
// //       }
// //     }

// // `
export const getEventDetails =gql`
    query getEventDetails($event_id:ID!)  {
      GetEvent(event_id:$event_id){
        headline
        event_time
        image
        description
        no_of_comments
        t_update
      }
    }
`

export const getMultimediaDetails=gql`
    query getMultimediaDetails($multimedia_id:ID!) {
      GetMultimedia(multimedia_id:$multimedia_id){
        multimedia_type
        t_create
        url
      }
    }

`

export const  getEventSources=gql`
    query  getEventSources($event:ID!) {
      GetEventArticle(event:$event){
        article_id
      }
      
      }

`
export const getnews=gql`
    query getnews($article_id:ID!) {
      GetNewsArticle(article_id:$article_id){
          headline
          publisher
          t_update
      }
    }
`