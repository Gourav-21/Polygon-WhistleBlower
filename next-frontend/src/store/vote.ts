import { atom, atomFamily } from "recoil";

export const Vote = atomFamily({
    key: 'voteing',
    default: date => (typeof window !== 'undefined' ? localStorage.getItem(date) : null),
});