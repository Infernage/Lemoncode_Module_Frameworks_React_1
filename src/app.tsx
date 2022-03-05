import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./global.context";
import { DetailPage } from "./pods/detail/detail";
import { GitHubPage } from "./pods/github/github";
import { LoginPage } from "./pods/login/login";
import { RickyMortyPage } from "./pods/rickyMorty/rickyMorty";

export const App = () => {
  return (
    <GlobalContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}>
            <Route path="github" element={<GitHubPage />}>
              <Route path="detail/:id" element={<DetailPage />} />
            </Route>
            <Route path="rickyMorty" element={<RickyMortyPage />}>
              <Route path="detail/:id" element={<DetailPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </GlobalContextProvider>
  );
};
