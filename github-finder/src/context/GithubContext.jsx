import { createContext, useState, useEffect } from "react";

const GithubContext = createContext();

export const GithubContextProvider = ({ children }) => {
  return <GithubContext.Provider>{children}</GithubContext.Provider>;
};

export default GithubContext;
