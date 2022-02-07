import axios from "axios";

// API URL constant
const url = process.env.REACT_APP_GITHUB_URL;

// Axios instances
const gitHub = axios.create({
  baseURL: url,
});

// Function that searches for users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await gitHub.get(`/search/users?${params}`);
  return response.data.items;
};

// Function that returns user data and user repos
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const [user, repos] = await Promise.all([
    gitHub.get(`/users/${login}`),
    gitHub.get(`/users/${login}/repos?${params}`),
  ]);
  return { user: user.data, repos: repos.data };
};

// Function to clear users from state
export const clearUsers = () => {
  return "CLEAR_USERS";
};
