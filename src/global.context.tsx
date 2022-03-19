import React from "react";
import { TElement } from "./common/list/types";

export type TEngine = "Github" | "RickyMorty";

export type TEngineResult<T> = {
  results: T[];
  isMoreAvailable: boolean;
};

export type TEngineExecutor = (
  filter: string,
  page: number,
  pageSize: number
) => Promise<TEngineResult<unknown>>;

export type TDetailsUrl = (id: string) => string;

export type TIdSelector = (element: TElement) => string;

export type TGlobalContext = {
  searchEngine: TEngine;
  setSearchEngine: (newValue: TEngine) => void;
  searchEngineExecutor: TEngineExecutor;
  setSearchEngineExecutor: (newValue: () => TEngineExecutor) => void;
  detailsUrlMapper: TDetailsUrl;
  setDetailsUrlMapper: (newValue: () => TDetailsUrl) => void;
  idSelector: TIdSelector;
  setIdSelector: (newValue: () => TIdSelector) => void;
};

const defaultValues: TGlobalContext = {
  searchEngineExecutor(): Promise<TEngineResult<unknown>> {
    return null;
  },
  setSearchEngineExecutor: (_) => {},
  searchEngine: null,
  setSearchEngine: () => {},
  detailsUrlMapper() {
    return null;
  },
  setDetailsUrlMapper: () => {},
  idSelector() {
    return null;
  },
  setIdSelector: () => {},
};

export const GlobalContext = React.createContext(defaultValues);

export const GlobalContextProvider: React.FC = (props) => {
  const [searchEngine, setSearchEngine] = React.useState<TEngine>(
    defaultValues.searchEngine
  );
  const [searchEngineExecutor, setSearchEngineExecutor] =
    React.useState<TEngineExecutor>(defaultValues.searchEngineExecutor);
  const [detailsUrlMapper, setDetailsUrlMapper] = React.useState<TDetailsUrl>(
    defaultValues.detailsUrlMapper
  );
  const [idSelector, setIdSelector] = React.useState<TIdSelector>(
    defaultValues.idSelector
  );

  const value: TGlobalContext = {
    searchEngine,
    setSearchEngine,
    searchEngineExecutor,
    setSearchEngineExecutor,
    detailsUrlMapper,
    setDetailsUrlMapper,
    idSelector,
    setIdSelector,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
