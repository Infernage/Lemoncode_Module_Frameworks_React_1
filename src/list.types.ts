export type MemberEntity = {
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
    showMoreMembers: boolean,
    setShowMoreMembers: (newValue: boolean) => void,
}

type TPage = {
    page: number,
    setPage: (newValue: number) => void,
}

export type TListContext = TFilter & TMembers & TPage;