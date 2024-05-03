// constant to avoid debugging typos
const GET_ALL_TWEETS = 'tweet/getAllTweets';
const POSTTWEET = 'tweet/PostTweet';

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};

const postTweet = (tweet) => {
  return {
      type: POSTTWEET,
      tweet,
  };
};

export const postTweetThunk = (tweet) => async (dispatch) => {
  const res = await fetch('/api/tweets', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweet),
  });

  if (res.ok) {
      const data = await res.json();

      dispatch(postTweet(data));

      return null;
  } else {
      const err = await res.json();
      return err;
  }
};


// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadTweets(data));
    return data;
  }
};

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case POSTTWEET: {
      const newState = { ...state };

      newState[action.payload.id] = action.payload;

      return newState;
  }

  default:
      return state;
  }
};

export default tweetsReducer;
