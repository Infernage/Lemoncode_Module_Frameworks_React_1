import React from "react";
import { defaultValues } from "./constants";
import type { TElement, TListContext } from "./types";

export const ListContext = React.createContext<TListContext>(defaultValues);

export const ListContextProvider: React.FC = (props) => {
  const [filter, setFilter] = React.useState<string>(defaultValues.filter);
  const [elements, setElements] = React.useState<TElement[]>(
    defaultValues.elements
  );
  const [page, setPage] = React.useState<number>(defaultValues.page);
  const [showMore, setShowMore] = React.useState(defaultValues.showMore);
  const [scrollPosition, setScrollPosition] = React.useState<number>();

  const value: TListContext = {
    filter,
    elements,
    page,
    setFilter,
    setElements,
    setPage,
    showMore,
    setShowMore,
    scrollPosition,
    setScrollPosition,
  };

  return (
    <ListContext.Provider value={value}>{props.children}</ListContext.Provider>
  );
};
