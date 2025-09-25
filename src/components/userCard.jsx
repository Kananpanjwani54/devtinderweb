
const SwipeCard = ({user}) => {

  return (
    <div className="flex justify-center mt-10">
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src={user.profilePic}
              alt="profile Pic"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Card Title
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SwipeCard;
