import { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Componanats/Home/Home/Home';
export const userContext = createContext()

function App() {
  const [user, setUser] = useState({})
  const idToken = localStorage.getItem("idToken")
  useEffect(() => {
    if (idToken) {
      fetch("https://sheltered-wildwood-92466.herokuapp.com/getUser", {
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${idToken}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setUser(data)
        })
    }
  }, [idToken])

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={[user, setUser]}>
          <Home></Home>
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
