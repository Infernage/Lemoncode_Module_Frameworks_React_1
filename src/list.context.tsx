import React from "react";

export interface MemberEntity {
    id: string;
    login: string;
    avatar_url: string;
}

type TFilter = {
    filter: string,
    setFilter: (newValue: string) => void,
}

type TMembers = {
    members: MemberEntity[],
    setMembers: (newValue: MemberEntity[]) => void,
}

type TPage = {
    page: number,
    setPage: (newValue: number) => void,
}

export type TListContext = TFilter & TMembers & TPage;

const noop = () => {};
const defaultValues: TListContext = {
    filter: 'lemoncode',
    setFilter: noop,
    members: [],
    setMembers: noop,
    page: 1,
    setPage: noop,
};

export const ListContext = React.createContext<TListContext>(defaultValues);

export const ListContextProvider: React.FC = (props) => {
    const [filter, setFilter] = React.useState<string>(defaultValues.filter);
    const [members, setMembers] = React.useState<MemberEntity[]>(defaultValues.members);
    const [page, setPage] = React.useState<number>(defaultValues.page);

    const value: TListContext = {
        filter,
        members,
        page,
        setFilter,
        setMembers,
        setPage
    }

    //value: filter, setValue: newValue => setFilter(newValue)

    return (
        <ListContext.Provider value={value}>
            {props.children}
        </ListContext.Provider>
    )
}