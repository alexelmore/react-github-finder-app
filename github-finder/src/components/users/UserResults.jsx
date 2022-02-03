import { useEffect, useContext } from "react";
import Spinner from "../../shared/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  // Constants destructured from GithubContext
  const { userData, loading, fetchGithubUsers } = useContext(GithubContext);

  // useEffect hook used to make a GET fetch request to gitHub when page loads
  useEffect(() => {
    fetchGithubUsers();
  }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3">
        {userData.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}
export default UserResults;
