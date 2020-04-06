import {
  ADD_NOTE,
  DRAGANDDROP_NOTE,
  SELECT_NOTE,
  DELETE_NOTE,
  DELETE_NOTES_IN_FOLDER,
  EDIT_NOTE,
} from './types';

export const addNote = (folderID) => {
  return { type: ADD_NOTE, payload: folderID };
};

export const dragAndDropNote = (id, folderID) => {
  return { type: DRAGANDDROP_NOTE, payload: { id, folderID } };
};

export const selectNote = (id) => {
  return { type: SELECT_NOTE, payload: id };
};

export const deleteNote = (id) => {
  return { type: DELETE_NOTE, payload: id };
};

export const deleteNotesInFolder = (folderID) => {
  return { type: DELETE_NOTES_IN_FOLDER, payload: folderID };
};

export const editNote = (text) => {
  return { type: EDIT_NOTE, payload: text };
};
