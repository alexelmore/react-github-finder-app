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
    user: {},
    repos: [],
    loading: false,
  };

  // Destructured constants for useReducers hook
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Function that sets the loading state to true
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  // Function to clear users from state
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  // Function that searches for users
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const searchUrl = `${url}/search/users?${params}`;
    const response = await fetch(`${searchUrl}`);
    const { items } = await response.json();

    dispatch({
      type: "GET_USERS",
      payload: items,
      loading: false,
    });
  };

  // Function that gets a single user
  const getUser = async (login) => {
    setLoading();
    const userUrl = `${url}/users/${login}`;
    const response = await fetch(`${userUrl}`);
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log("data:", data);
      dispatch({
        type: "GET_USER",
        payload: data,
        loading: false,
      });
    }
  };

  //Function to retrieve single user's repos
  // Function that searches for users
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`
    );
    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
