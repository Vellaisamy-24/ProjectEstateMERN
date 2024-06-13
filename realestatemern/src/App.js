import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./components/Home";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateCategoryListing from "./CategoryListing/CreateCategoryListing";
const App = () => {
  return (
    <div className="">
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/createCategoryListing"
              element={<CreateCategoryListing />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
