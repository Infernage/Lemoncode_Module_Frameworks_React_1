import type {TListContext} from './list.types';

export const pageSize = 10;

const noop = () => {};
export const defaultValues: TListContext = {
    filter: 'lemoncode',
    setFilter: noop,
    members: [],
    setMembers: noop,
    page: 1,
    setPage: noop,
    showMoreMembers: true,
    setShowMoreMembers: noop,
};