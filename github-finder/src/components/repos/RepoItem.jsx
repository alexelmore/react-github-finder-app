import PropTypes from "prop-types";

function RepoItem({ repo }) {
  return <div>{repo.name}</div>;
}

// Prop Types
RepoItem.propTypes = {
  repo: PropTypes.object,
};
export default RepoItem;
