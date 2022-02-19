import React from "react";
import {defaultValues} from './list.constants';
import type {MemberEntity, TListContext} from './list.types';

export const ListContext = React.createContext<TListContext>(defaultValues);

export const ListContextProvider: React.FC = (props) => {
    const [filter, setFilter] = React.useState<string>(defaultValues.filter);
    const [members, setMembers] = React.useState<MemberEntity[]>(defaultValues.members);
    const [page, setPage] = React.useState<number>(defaultValues.page);
    const [showMoreMembers, setShowMoreMembers] = React.useState(defaultValues.showMoreMembers)

    const value: TListContext = {
        filter,
        members,
        page,
        setFilter,
        setMembers,
        setPage,
        showMoreMembers,
        setShowMoreMembers,
    }

    return (
        <ListContext.Provider value={value}>
            {props.children}
        </ListContext.Provider>
    )
}