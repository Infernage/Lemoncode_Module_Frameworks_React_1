import { TElement } from "../../common/list/types";

export type TPaginationInfo = {
  next: string;
};

export type TResponse = {
  results: TElement[];
  info: TPaginationInfo;
};
