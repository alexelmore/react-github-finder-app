// API URL constant
const url = process.env.REACT_APP_GITHUB_URL;

// Function that searches for users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const searchUrl = `${url}/search/users?${params}`;
  const response = await fetch(`${searchUrl}`);
  const { items } = await response.json();
  return items;
};

// Function that gets a single user
export const getUser = async (login) => {
  const userUrl = `${url}/users/${login}`;
  const response = await fetch(`${userUrl}`);
  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();
    console.log("data:", data);
    return data;
  }
};

//Function to retrieve single user's repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const response = await fetch(
    `https://api.github.com/users/${login}/repos?${params}`
  );
  const data = await response.json();
  return data;
};

// Function to clear users from state
export const clearUsers = () => {
  return "CLEAR_USERS";
};
