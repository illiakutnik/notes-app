import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import {
  ADD_NOTE,
  DRAGANDDROP_NOTE,
  EDIT_NOTE,
  SELECT_NOTE,
  DELETE_NOTE,
  DELETE_NOTES_IN_FOLDER,
} from '../actions/types';

const initialState = {
  selected: '',
  list: [],
};

const notesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NOTE: {
      const uniqID = uuidv4();
      return {
        selected: uniqID,
        list: [
          ...state.list,
          {
            name: '',
            id: uniqID,
            folder: payload,
            createdAt: moment().format('M/D/YY'),
            text: '',
          },
        ],
      };
    }

    case DRAGANDDROP_NOTE: {
      const newList = state.list.slice();
      const index = newList.findIndex((item) => item.id === payload.id);
      newList[index].folder = payload.folderID;
      return {
        ...state,
        list: newList,
      };
    }

    case EDIT_NOTE: {
      const newList = state.list.slice();
      const index = newList.findIndex((item) => item.id === state.selected);
      const newName = payload.split('\n')[0];
      newList[index].name = newName;
      newList[index].text = payload;
      return {
        ...state,
        list: newList,
      };
    }

    case SELECT_NOTE:
      return {
        ...state,
        selected: payload,
      };

    case DELETE_NOTE: {
      const deletedIsSelected = payload === state.selected;
      return {
        selected: deletedIsSelected ? '' : state.selected,
        list: state.list.filter((note) => note.id !== payload),
      };
    }
    case DELETE_NOTES_IN_FOLDER: {
      const deletedIsSelected =
        state.selected &&
        payload ===
          state.list.find((note) => note.id === state.selected).folder;
      return {
        selected: deletedIsSelected ? '' : state.selected,
        list: state.list.filter((note) => note.folder !== payload),
      };
    }
    default:
      return state;
  }
};

export default notesReducer;
