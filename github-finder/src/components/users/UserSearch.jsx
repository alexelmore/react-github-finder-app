import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
function UserSearch() {
  // Constant destructured from GithubContext
  const { users } = useContext(GithubContext);

  // State for form input
  const [text, setText] = useState("");

  // Function to handle user text input
  const handleChange = (e) => setText(e.target.value);

  // Function that handles clearing the search input
  const handleClear = (e) => setText("");

  // Function that handles form submission
  const handleSumbit = (e) => {
    e.preventDefault();
    if (text === "") {
      alert("Please enter something");
    } else {
      console.log("fired from submit");
      setText("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSumbit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
