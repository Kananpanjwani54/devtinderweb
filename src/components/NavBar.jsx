import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  return (
<div className="navbar bg-base-200 shadow-sm">
  {/* This div is now a flex container */}
  <div className="flex-1">
    <a href="/" className="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
      <h2 className="text-xl font-bold">DevConnect</h2>
    </a>
  </div>

      <div className="flex gap-2">
        <div className="dropdown dropdown-end flex">
          {user && <p className="px-4">Welcome, {user.firstName}</p>}

          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {user && (
              <div className="w-10 rounded-full">
                <img alt="Photo User" src={user.profilePic} />
              </div>
            )}
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
