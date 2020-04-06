import { combineReducers } from 'redux';
import foldersReducer from './folders';
import notesReducer from './notes';

export default combineReducers({
  folders: foldersReducer,
  notes: notesReducer,
});
