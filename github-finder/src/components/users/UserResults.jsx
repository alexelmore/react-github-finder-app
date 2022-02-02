import { useEffect, useState } from "react";
import Spinner from "../../shared/Spinner";
function UserResults() {
  // API token and URL constant
  const url = process.env.REACT_APP_GITHUB_URL;
  const token = process.env.REACT_APP_GITHUB_TOKEN;

  // State for data that gets return back from GitHub and for loading Spinner
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect hook used to make a GET fetch request to gitHub when page loads
  useEffect(() => {
    fetchGithubUsers();
  }, []);

  // function that makes a GET fetch request to gitHub
  const fetchGithubUsers = async () => {
    const response = await fetch(`${url}/users`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {userData.map((user) => (
        <h3 key={user.id}>{user.login}</h3>
      ))}
    </div>
  );
}

export default UserResults;
