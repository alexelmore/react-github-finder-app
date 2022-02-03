import { useEffect, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { useParams } from "react-router-dom";
function User() {
  const { getUser, user, loading } = useContext(GithubContext);

  const params = useParams();

  // useEffect used to call the getUser function
  useEffect(() => {
    console.log("params:", params);
    getUser(params.login);
  }, []);
  return <div>{user.name}</div>;
}

export default User;
