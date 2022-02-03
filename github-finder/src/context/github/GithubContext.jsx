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
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
