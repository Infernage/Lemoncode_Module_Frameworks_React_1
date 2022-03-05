import { TElement } from "../../common/list/types";

export type TMember = Pick<TElement, "id"> & {
  login: string;
  avatar_url: string;
};
