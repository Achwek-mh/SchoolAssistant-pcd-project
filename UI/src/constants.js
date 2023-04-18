import { createContext } from "react";
export const USER_TYPES = {
  PROF: 'PROF',
  STUDENT: 'STUDENT',
  PUBLIC: 'PUBLIC',
  UNKNOWN: 'UNKNOWN'
};

export const USER=USER_TYPES.PUBLIC;
export const use=createContext(USER)