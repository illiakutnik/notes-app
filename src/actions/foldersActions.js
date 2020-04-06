import {
  ADD_FOLDER,
  EDIT_FOLDER,
  EDIT_MODE_ON,
  SELECT_FOLDER,
  DELETE_FOLDER,
} from './types';

export const addFolder = () => {
  return { type: ADD_FOLDER };
};

export const editFolder = (id, newName) => {
  return { type: EDIT_FOLDER, payload: { id, newName } };
};

export const editModeOn = (id) => {
  return { type: EDIT_MODE_ON, payload: id };
};

export const selectFolder = (id) => {
  return { type: SELECT_FOLDER, payload: id };
};

export const deleteFolder = (id) => {
  return { type: DELETE_FOLDER, payload: id };
};
