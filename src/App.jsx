import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import BodyContainer from "./components/BodyContainer";
import Feed from "./pages/Feed";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Connections from "./components/Connections";
import Error from "./pages/Error"; 
import Requests from "./components/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<BodyContainer />}>
            
            {/* Use `index` for the default route at "/" */}
            <Route index element={<Feed />} /> 
            
            {/* Other child routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests/>} />
            {/* Catch-all route for any other path */}
            <Route path="*" element={<Error />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;