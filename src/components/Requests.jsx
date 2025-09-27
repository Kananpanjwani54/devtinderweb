import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/RequestSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests || []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data || []));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0)
    return <h1 className="text-center mt-10 text-gray-500">No Request Found</h1>;

  return (
    <div className="flex flex-col items-center my-10 px-4">
      <h1 className="font-bold text-3xl mb-8 text-center">Requests received</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {requests.map((request) => {
          const { id, firstName, lastName, about, skills, profilePic, age, gender } = request.fromUserId;

          return (
            <div
              key={id || firstName + lastName}
              className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center text-center"
            >
              <img
                src={profilePic}
                alt={firstName + " " + lastName}
                className="w-28 h-28 rounded-full mb-4 border-2 border-blue-400"
              />
              <h2 className="font-semibold text-xl text-gray-900 mb-1">
                {firstName + " " + lastName}
              </h2>
              <p className="text-gray-500 text-sm mb-2">{age} yrs | {gender}</p>
              {about && <p className="text-gray-700 text-sm mb-2">{about}</p>}
              {skills && skills.length > 0 && (
                <p className="text-blue-500 text-sm font-medium">{skills.join(", ")}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
