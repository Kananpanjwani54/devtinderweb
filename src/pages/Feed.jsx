import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import SwipeCard from '../components/userCard';


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // const navigate=useNavigate();

  const getFeed = async () => {
    if (feed) return; // Prevents unnecessary API calls if data already exists

    try {
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      console.log(res);
      dispatch(addFeed(res.data)); // Dispatch action to add feed to Redux store
    } catch (err) {
      console.log(err);
      // TODO: handle error
      
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
  feed &&(
    <div>
    <SwipeCard user={feed[0]}/>
    </div>
  )
  );
};

export default Feed;