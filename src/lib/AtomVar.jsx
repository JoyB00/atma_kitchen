import { atom } from "jotai";

const expandMaster = atom(false);
const expandOperational = atom(false);
const expandTransaction = atom(false);

export { expandMaster, expandOperational, expandTransaction };
