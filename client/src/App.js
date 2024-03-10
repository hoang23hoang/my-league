import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register/Register";
import Menu from "./components/Home/Menu.js";
import HomeContent from "./components/Home/HomeContent.js";
import Login from "./components/Login/login.js";
import Footer from "./components/Home/Footer.js";
import CreateTeam from "./components/Navbar/CreateTeam.js";
import FindTeam from "./components/Navbar/FindTeam.js";


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
          path="/create-team" element={<CreateTeam />}
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
          path="/find-teams" element={<FindTeam />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
