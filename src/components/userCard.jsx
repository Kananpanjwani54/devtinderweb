// import { BASE_URL } from "../utils/constants";
// import { removeFromFeed } from "../utils/feedSlice";
// import { useDispatch } from "react-redux";
// import axios from "axios";

// const SwipeCard = ({ user }) => {
//   const { firstName, lastName, age, skills, profilePic, about, gender, _id } = user;
//   const dispatch = useDispatch();

//   const handleSendRequest = async (status, userId) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/requests/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeFromFeed(userId));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex justify-center mt-10 mb-10">
//       <div className="card w-96 bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full flex flex-col">
//         {/* Profile Image */}
//         <figure className="h-64 w-full overflow-hidden shrink-0">
//           <img
//             src={profilePic}
//             alt={`${firstName} ${lastName}`}
//             className="w-full h-full object-cover"
//           />
//         </figure>

//         {/* Card Body */}
//         <div className="card-body p-4 flex flex-col flex-grow">
//             <div className="flex-grow">
//           {/* Name & Age */}
//           <h2 className="text-xl font-bold mb-2 text-gray-800">
//             {firstName} {lastName}, {age}
//           </h2>

//           {/* Gender */}
//           <p className="text-gray-800 text-lg font-semibold mb-2">{gender}</p>

//           {/* About */}
//           <p className="text-gray-700 mb-3 truncate">{about}</p>

//           {/* Skills / Tags */}
//           <div className="flex flex-wrap gap-2 mb-3">
//             {skills?.map((skill, idx) => (
//               <div
//                 key={idx}
//                 className="badge badge-outline text-gray-800 border-gray-400 cursor-pointer"
//               >
//                 {skill}
//               </div>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-2 mt-4">
//             <button
//               onClick={() => handleSendRequest("ignore", _id)}
//               className="btn btn-outline btn-error flex-1"
//             >
//               Dislike
//             </button>
//             <button
//               onClick={() => handleSendRequest("interested", _id)}
//               className="btn btn-outline btn-success flex-1"
//             >
//               Like
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default SwipeCard;
import { removeFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import api from "../utils/api"; // 1. Use the custom 'api' instance

const SwipeCard = ({ user }) => {
  const { firstName, lastName, age, skills, profilePic, about, gender, _id } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      // 2. Use 'api.post' and remove BASE_URL and withCredentials
      await api.post(`/requests/send/${status}/${userId}`, {});
      dispatch(removeFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="card w-96 bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 h-full flex flex-col">
        {/* Profile Image */}
        <figure className="h-64 w-full overflow-hidden shrink-0">
          <img
            src={profilePic}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            {/* Name & Age */}
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              {firstName} {lastName}, {age}
            </h2>

            {/* Gender */}
            <p className="text-gray-800 text-lg font-semibold mb-2">{gender}</p>

            {/* About */}
            <p className="text-gray-700 mb-3 truncate">{about}</p>

            {/* Skills / Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {skills?.map((skill, idx) => (
                <div
                  key={idx}
                  className="badge badge-outline text-gray-800 border-gray-400 cursor-pointer"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleSendRequest("ignore", _id)}
                className="btn btn-outline btn-error flex-1"
              >
                Dislike
              </button>
              <button
                onClick={() => handleSendRequest("interested", _id)}
                className="btn btn-outline btn-success flex-1"
              >
                Like
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
