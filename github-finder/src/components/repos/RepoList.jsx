import PropTypes from "prop-types";

import RepoItem from "./RepoItem";
function RepoList({ repos }) {
  if (repos.length > 0) {
    return (
      <div className="rounded-lg shadow-lg card bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl my-4 font-bold card-title">
            Most Recent Repositories
          </h2>
          {repos.map((repo) => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="rounded-lg shadow-lg card bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl my-4 font-bold card-title">
            No Repositories for the user
          </h2>
        </div>
      </div>
    );
  }
}
// Prop types
RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoList;
