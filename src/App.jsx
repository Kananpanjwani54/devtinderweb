import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import BodyContainer from "./components/BodyContainer";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>  {/* imported from react redux library  */}
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<BodyContainer />}>
          <Route path="/login" element={<Login />} />
          {/* notice no leading slash */}
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
