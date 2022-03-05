import type { TListContext } from "./types";

export const pageSize = 10;

const noop = () => {};
export const defaultValues: TListContext = {
  scrollPosition: 0,
  setScrollPosition: noop,
  filter: null,
  setFilter: noop,
  elements: [],
  setElements: noop,
  page: 1,
  setPage: noop,
  showMore: true,
  setShowMore: noop,
};
