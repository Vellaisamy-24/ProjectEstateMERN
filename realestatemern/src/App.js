import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./components/Home";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import CreateCategoryListing from "./CategoryListing/CreateCategoryListing";
import UpdateCategoryListing from "./CategoryListing/UpdateCategoryListing";
import UserCategoryListing from "./CategoryListing/UserCategoryListing";
import SearchCategoryList from "./pages/SearchCategoryList";
const App = () => {
  return (
    <div className="">
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<SearchCategoryList />}/>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/createCategoryListing"
              element={<CreateCategoryListing />}
            />
            <Route
              path="/updateCategoryListing/:id"
              element={<UpdateCategoryListing />}
            />
            <Route
              path="/userCategoryListing"
              element={<UserCategoryListing />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
