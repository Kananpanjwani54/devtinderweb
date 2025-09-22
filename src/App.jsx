import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/profile";
import BodyContainer from "./components/BodyContainer";

function App() {
return (
      <BrowserRouter basename="/">
        <Routes>
         <Route path="/" element={<BodyContainer />}>
  <Route path="/login" element={<Login />} />       {/* notice no leading slash */}
  <Route path="/profile" element={<Profile />} />   {/* relative path */}
</Route>

        </Routes>
      </BrowserRouter>
);
};

export default App;