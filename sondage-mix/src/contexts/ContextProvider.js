// ContextProvider.js

import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  setLoading: () => {},  // Assurez-vous d'inclure setLoading dans votre contexte
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [loading, setLoading] = useState(false);

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token);
  }

  const updateUser = (userData) => {
    if (typeof(userData) === 'undefined') {
      return alert(`n'existe pas ce user`)
    }
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        loading,
        setLoading,  // Assurez-vous d'inclure setLoading dans la valeur du contexte
        updateUser
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
