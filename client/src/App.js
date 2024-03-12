import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Menu from "./components/Home/Menu.js";
import HomeContent from "./components/Home/HomeContent.js";
import Login from "./components/Login/login.js";
import Footer from "./components/Home/Footer.js";
import CreateTeam from "./components/Navbar/CreateTeam.js";
import FindTeam from "./components/Navbar/FindTeam.js";
import MyTeam from "./components/Navbar/MyTeam.js";
import HighlightPage from "./components/Navbar/Highlight.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/register" element={
          <>
            <Menu />
            <Register />
          </>
        } />
        <Route path="/auth/login" element={
          <>
            <Menu />
            <Login />
          </>
        } />
        <Route
          path="/create-team" element={
            <>
              <Menu />
              <CreateTeam />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Menu />
              <HomeContent />
              <Footer />
            </>
          }
        />
        <Route
          path="/my-team"
          element={
            <>
              <Menu/>
              <MyTeam/>
            </>
          }
        />
        <Route
          path="/find-teams" element={
            <>
            <Menu/>
            <FindTeam />
            </>
          }
        />
        <Route
          path="/highlight"
          element={
            <>
              <Menu />
              <HighlightPage />
              <Footer />
            </>
          }
        />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
