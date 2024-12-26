// filepath: /c:/Users/Rishabh Sharma/OneDrive/Desktop/GroupAI/frontend/src/context/user.context.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
