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
import { TResponse } from "./types";

const sanitizeResponse = async (
  response: Response
): Promise<TResponse> | never => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(await response.text());
  }
};

const executor: TGlobalContext["searchEngineExecutor"] = (
  filter,
  page,
  _
): Promise<TEngineResult<TElement>> => {
  return fetch(
    `https://rickandmortyapi.com/api/character?page=${page}${
      filter ? "&name=" + filter : ""
    }`
  )
    .then(sanitizeResponse)
    .then((characters) => ({
      results: characters.results,
      isMoreAvailable: Boolean(!filter && characters.info.next),
    }));
};

export const RickyMortyPage = () => {
  const outlet = useOutlet();
  const { setSearchEngineExecutor, setSearchEngine, searchEngine } =
    useContext(GlobalContext);

  React.useEffect(() => {
    setSearchEngine("RickyMorty");
    setSearchEngineExecutor(() => executor);
  }, []);

  return (
    <>
      <ListContextProvider>
        {outlet ?? (searchEngine && <List filter={""}></List>)}
      </ListContextProvider>
    </>
  );
};
