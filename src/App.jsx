import React, { useState, useEffect } from "react"
import facade from "./apiFacade";
import Header from "./components/Header.jsx";
import Owners from "./routes/Owners.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./routes/Home.jsx";


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({ username: "", roles: "" });

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
    setUser({ username: "", roles: "" })
  }
  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      const token = facade.readJwtToken(facade.getToken());
      setUser({ username: token.username, roles: token.roles });
      setLoggedIn(true);
    });
  }

  return (
    <div>
      <Header loggedIn={loggedIn} login={login} user={user} logout={logout}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Owners" element={<Owners user={user} />}/>
      </Routes>
    </div>
  )
}




export default App;