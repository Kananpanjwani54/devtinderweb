import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import SwipeCard from '../components/userCard';

const LoadingSpinner = () => <div className="text-center mt-10">Loading...</div>;

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();


   const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  const getFeed = async () => {
    if (feed){
      setIsLoading(false)
       return; 
    }// Prevents unnecessary API calls if data already exists

    try {
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      console.log(res);
      dispatch(addFeed(res.data)); // Dispatch action to add feed to Redux store
    } catch (err) {
      console.log(err);
      // TODO: handle error
      setError("Could not fetch requests. Please try again later.");
    }finally {
      // --- IMPROVEMENT: Stop loading state regardless of outcome ---
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (isLoading) return <LoadingSpinner />;

  if (error) return <h1 className="text-center text-red-500 mt-10">{error}</h1>;

if(!feed) return ;
if(feed.length <=0) return <h1 className='text-center font-bold mt-10'>No new users Found</h1>

  return (
  feed &&(
    <div>
    <SwipeCard user={feed[0]}/>
    </div>
  )
  );
};

export default Feed;