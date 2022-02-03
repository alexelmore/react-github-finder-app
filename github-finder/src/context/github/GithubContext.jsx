import { createContext, useState, useEffect } from "react";

const GithubContext = createContext();

// API URL constant
const url = process.env.REACT_APP_GITHUB_URL;

export const GithubContextProvider = ({ children }) => {
  // State for data that gets return back from GitHub
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // function that makes a GET fetch request to gitHub
  const fetchGithubUsers = async () => {
    const response = await fetch(`${url}/users`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  return (
    <GithubContext.Provider value={{ userData, loading, fetchGithubUsers }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
