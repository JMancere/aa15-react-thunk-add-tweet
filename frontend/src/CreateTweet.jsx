import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTweetThunk } from './store/tweet';
import { ClimbingBoxLoader } from 'react-spinners';
//import { useNavigate } from "react-router-dom";
//import { useHistory } from "react-router-dom";

// function App() {
//   //const history = useHistory();

//   function handleClick() {
//     // Handle form submission behaviour.
//     // Then trigger navigation.
//     history.push("/home");
//   }
//   return (
//     <div>
//       <button onClick={handleClick}>go home</button>
//     </div>
//   );
// }


export default function CreateTweet() {
  //const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [showLoading, setShowLoading] = useState(false);


  //   useEffect(() => {

  //  }, [showLoading]);

    const handleSubmit = async (e) => {
        //e.preventDefault();

        setShowLoading(true);
        //doThunk()
        setTimeout(async () => {
            const tweetData = {
                message,
            };

            const errorCheck = await dispatch(postTweetThunk(tweetData));

            setMessage('');
            setShowLoading(false);

            if (errorCheck) {
                return; // handle errors here
            }

            setMessage('');
            setShowLoading(false);
            //navigate("/");
        }, 30000);

        return;
    };

    async function doThunk(){
      const tweetData = {
        message,
      };

      const errorCheck = await dispatch(postTweetThunk(tweetData));

      setMessage('');
      setShowLoading(false);

      if (errorCheck) {
          return; // handle errors here
      }

      setMessage('');
      setShowLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Home</h1>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="tweet-input"
                placeholder="What's happening?"
            />
            <button disabled={!message.length} className="tweet-button">
                Tweet
            </button>

            {showLoading && (
                <>
                    <ClimbingBoxLoader color="red" />
                </>
            )}
        </form>
    );
}
