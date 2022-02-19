import { Button } from "@material-ui/core";
import React, { useState } from "react";

import { ListBody } from "./list.body";
import { defaultValues, pageSize } from "./list.constants";
import { ListContext } from "./list.context";
import { ListHeader } from "./list.header";

import type { MemberEntity } from "./list.types";
import { sanitizeResponse } from "./utils";

const retrieveData = (
  filter: string,
  page: number,
  setMembers: (newValue: MemberEntity[]) => void,
  members: MemberEntity[],
  setDisabled: (value: ((prevState: boolean) => boolean) | boolean) => void,
  setPage: (newValue: number) => void
) =>
  fetch(
    `https://api.github.com/orgs/${filter}/members?per_page=${
      pageSize + 1
    }&page=${page}`
  )
    .then(sanitizeResponse)
    .then((json: MemberEntity[]) => {
      setDisabled(!json.length || json.length <= pageSize);
      setMembers([
        ...members,
        ...json.slice(0, Math.min(json.length, pageSize)),
      ]);
      setPage(page);
    })
    .catch((reason) => {
      console.error(reason);
      setMembers(defaultValues.members);
      setPage(defaultValues.page);
    });

export const ListPage: React.FC = () => {
  const {
    filter,
    members,
    setMembers,
    page,
    setPage,
    showMoreMembers: disabled,
    setShowMoreMembers: setDisabled,
  } = React.useContext(ListContext);
  const [isMount, setIsMount] = useState(false);

  React.useEffect(() => {
    if (!isMount && members.length) {
      return;
    }

    setDisabled(true);
    const timeout = setTimeout(
      () =>
        retrieveData(
          filter,
          defaultValues.page,
          setMembers,
          defaultValues.members,
          setDisabled,
          setPage
        ),
      500
    );
    return () => clearTimeout(timeout);
  }, [filter]);

  React.useEffect(() => setIsMount(true), []);

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
            filter,
            page + 1,
            setMembers,
            members,
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
