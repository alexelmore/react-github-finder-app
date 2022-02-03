import { createContext, useReducer } from "react";
import githubReducer from "../GithubReducer";

// constant for the GithubContext context
const GithubContext = createContext();

// API URL constant
const url = process.env.REACT_APP_GITHUB_URL;

export const GithubContextProvider = ({ children }) => {
  // Initial state object for the loading state and the user data
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // function that makes a GET fetch request to gitHub
  const fetchGithubUsers = async () => {
    setLoading();
    const response = await fetch(`${url}/users`);
    const data = await response.json();

    // call dispatch function and pass it the updated state for loading and users.
    dispatch({
      type: "GET_USERS",
      payload: data,
      loading: false,
    });
  };

  // Function that sets the loading state to true
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchGithubUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
