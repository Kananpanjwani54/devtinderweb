const SwipeCard = ({ user, onLike, onDislike }) => {
  const { firstName, lastName, age, skills, profilePic, about,gender } = user;

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-96 bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
        {/* Profile Image */}
        <figure className="h-64 w-full overflow-hidden">
          <img
            src={profilePic}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body p-4">
          {/* Name & Age */}
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {firstName} {lastName}, {age} 
          </h2>
            {/*Gender */}
        <p className="text-gray-800 text-xl font-bold mb-2">{gender}</p>
          {/* About */}
          <p className="text-gray-700 mb-3">{about}</p>

          {/* Skills / Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {skills?.map((skill, idx) => (
              <div
                key={idx}
                className="badge badge-outline text-gray-800 border-gray-400"
              >
                {skill}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={onDislike}
              className="btn btn-outline btn-error flex-1"
            >
              Dislike
            </button>
            <button
              onClick={onLike}
              className="btn btn-outline btn-success flex-1"
            >
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
