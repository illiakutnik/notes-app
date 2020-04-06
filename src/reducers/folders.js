import { v4 as uuidv4 } from 'uuid';

import {
  ADD_FOLDER,
  EDIT_FOLDER,
  EDIT_MODE_ON,
  SELECT_FOLDER,
  DELETE_FOLDER,
} from '../actions/types';

const initialState = {
  selected: '',
  list: [],
};

const generateName = (state, index = 1) => {
  const isExist = state.find((item) => item.name === `New Folder ${index}`);
  return isExist ? generateName(state, index + 1) : `New Folder ${index}`;
};

const foldersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_FOLDER: {
      const uniqID = uuidv4();
      return {
        selected: uniqID,
        list: [
          ...state.list,
          { name: generateName(state.list), id: uniqID, editMode: true },
        ],
      };
    }

    case EDIT_FOLDER: {
      const newList = state.list.slice();
      const index = newList.findIndex((item) => item.id === payload.id);
      newList[index].name = payload.newName;
      newList[index].editMode = false;
      return {
        ...state,
        list: newList,
      };
    }
    case EDIT_MODE_ON: {
      const newList = state.list.slice();
      const index = newList.findIndex((item) => item.id === payload);
      newList[index].editMode = true;
      return {
        ...state,
        list: newList,
      };
    }
    case SELECT_FOLDER:
      return {
        ...state,
        selected: payload,
      };
    case DELETE_FOLDER: {
      const deletedIsSelected = payload === state.selected;
      return {
        selected: deletedIsSelected ? '' : state.selected,
        list: state.list.filter((folder) => folder.id !== payload),
      };
    }
    default:
      return state;
  }
};

export default foldersReducer;
