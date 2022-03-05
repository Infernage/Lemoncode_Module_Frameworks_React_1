import React, { useContext } from "react";
import { useOutlet } from "react-router-dom";
import { ListContextProvider } from "../../common/list/context";
import { List } from "../../common/list/list";
import { TElement } from "../../common/list/types";
import {
  GlobalContext,
  TEngineResult,
  TGlobalContext,
} from "../../global.context";
import { TMember } from "./types";

const validateResponse = async (
  response: Response
): Promise<Response | never> => {
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response;
};

const isNextLinkFromHeaders = (response: Response): boolean => {
  const header = response.headers.get("link");

  return header?.includes('rel="next"') ?? false;
};

const executor: TGlobalContext["searchEngineExecutor"] = (
  filter,
  page,
  pageSize
): Promise<TEngineResult<TElement>> =>
  fetch(
    `https://api.github.com/orgs/${filter}/members?per_page=${pageSize}&page=${page}`
  )
    .then(validateResponse)
    .then(async (response) => {
      const members = (await response.json()) as TMember[];
      return {
        results: members?.map<TElement>((m) => ({
          id: m.id,
          name: m.login,
          image: m.avatar_url,
        })),
        isMoreAvailable: isNextLinkFromHeaders(response),
      };
    });

export const GitHubPage = () => {
  const outlet = useOutlet();
  const { setSearchEngineExecutor, setSearchEngine, searchEngine } =
    useContext(GlobalContext);
  React.useEffect(() => {
    setSearchEngine("Github");
    setSearchEngineExecutor(() => executor);
  }, []);

  return (
    <>
      <ListContextProvider>
        {outlet ?? (searchEngine && <List filter={"lemoncode"}></List>)}
      </ListContextProvider>
    </>
  );
};
