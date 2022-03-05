export type TElement = {
  id: string;
  name: string;
  image: string;
};

type TFilter = {
  filter: string;
  setFilter: (newValue: string) => void;
};

type TList = {
  elements: TElement[];
  setElements: (newValue: TElement[]) => void;
  showMore: boolean;
  setShowMore: (newValue: boolean) => void;
};

type TPage = {
  page: number;
  setPage: (newValue: number) => void;
  scrollPosition: number;
  setScrollPosition: (newValue: number) => void;
};

export type TListContext = TFilter & TList & TPage;
