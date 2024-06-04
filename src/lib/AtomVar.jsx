import { atom } from "jotai";

const expandMaster = atom(false);
const expandOperational = atom(false);
const expandTransaction = atom(false);
const expandOrder = atom(false);
const expandReport = atom(false);

export {
  expandMaster,
  expandOperational,
  expandTransaction,
  expandOrder,
  expandReport,
};
