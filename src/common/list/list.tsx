import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { GlobalContext, TGlobalContext } from "../../global.context";

import { ListBody } from "./body/body";
import { defaultValues, pageSize } from "./constants";
import { ListContext } from "./context";
import { ListHeader } from "./header/header";

import type { TElement } from "./types";

export type TProps = {
  filter: string;
};

const retrieveData = (
  searchExecutor: TGlobalContext["searchEngineExecutor"],
  filter: string,
  page: number,
  setElements: (newValue: TElement[]) => void,
  elements: TElement[],
  setDisabled: (value: ((prevState: boolean) => boolean) | boolean) => void,
  setPage: (newValue: number) => void
) =>
  searchExecutor(filter, page, pageSize)
    .then((result) => {
      const json = (result?.results as TElement[]) ?? [];
      setDisabled(!result.isMoreAvailable ?? true);
      setElements([...elements, ...json]);
      setPage(page);
    })
    .catch((reason) => {
      console.error(reason);
      setElements(defaultValues.elements);
      setPage(defaultValues.page);
    });

export const List: React.FC<TProps> = (props) => {
  const {
    filter,
    setFilter,
    elements,
    setElements,
    page,
    setPage,
    showMore: disabled,
    setShowMore: setDisabled,
    scrollPosition,
  } = React.useContext(ListContext);
  const { searchEngineExecutor } = React.useContext(GlobalContext);
  const [isMount, setIsMount] = useState(false);

  React.useEffect(() => {
    if (!isMount && elements.length) {
      return;
    }

    setDisabled(true);
    const timeout = setTimeout(
      () =>
        retrieveData(
          searchEngineExecutor,
          filter,
          defaultValues.page,
          setElements,
          defaultValues.elements,
          setDisabled,
          setPage
        ),
      500
    );
    return () => clearTimeout(timeout);
  }, [filter]);

  React.useEffect(() => {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }

    setFilter(filter ?? props.filter);
    setIsMount(true);
  }, []);

  return (
    <>
      <ListHeader />
      <ListBody />
      <Button
        variant="contained"
        color="primary"
        disabled={disabled}
        onClick={() =>
          retrieveData(
            searchEngineExecutor,
            filter,
            page + 1,
            setElements,
            elements,
            setDisabled,
            setPage
          )
        }
      >
        Show more
      </Button>
    </>
  );
};
