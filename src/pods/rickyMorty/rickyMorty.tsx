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
import { validateResponse } from "../../httpUtils";
import { TResponse } from "./types";

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
    .then(validateResponse)
    .then((response) => response.json())
    .then((characters: TResponse) => ({
      results: characters.results,
      isMoreAvailable: Boolean(!filter && characters.info.next),
    }));
};

const detailsUrlMapper = (id: string) =>
  `https://rickandmortyapi.com/api/character/${id}`;

const idSelector = (element: TElement) => element.id;

export const RickyMortyPage = () => {
  const outlet = useOutlet();
  const {
    setSearchEngineExecutor,
    setSearchEngine,
    searchEngine,
    setDetailsUrlMapper,
    setIdSelector,
  } = useContext(GlobalContext);

  React.useEffect(() => {
    setSearchEngine("RickyMorty");
    setSearchEngineExecutor(() => executor);
    setDetailsUrlMapper(() => detailsUrlMapper);
    setIdSelector(() => idSelector);
  }, []);

  return (
    <>
      <ListContextProvider>
        {outlet ?? (searchEngine && <List filter={""} />)}
      </ListContextProvider>
    </>
  );
};
