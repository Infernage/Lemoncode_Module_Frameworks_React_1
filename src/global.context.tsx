import React from "react";

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

export type TGlobalContext = {
  searchEngine: TEngine;
  setSearchEngine: (newValue: TEngine) => void;
  searchEngineExecutor: TEngineExecutor;
  setSearchEngineExecutor: (newValue: () => TEngineExecutor) => void;
};

const defaultValues: TGlobalContext = {
  searchEngineExecutor(
    filter: string,
    page: number,
    pageSize: number
  ): Promise<TEngineResult<unknown>> {
    return null;
  },
  setSearchEngineExecutor: (_) => {},
  searchEngine: null,
  setSearchEngine: (_) => {},
};

export const GlobalContext = React.createContext(defaultValues);

export const GlobalContextProvider: React.FC = (props) => {
  const [searchEngine, setSearchEngine] = React.useState<TEngine>(
    defaultValues.searchEngine
  );
  const [searchEngineExecutor, setSearchEngineExecutor] =
    React.useState<TEngineExecutor>(defaultValues.searchEngineExecutor);

  const value: TGlobalContext = {
    searchEngine,
    setSearchEngine,
    searchEngineExecutor,
    setSearchEngineExecutor,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};
