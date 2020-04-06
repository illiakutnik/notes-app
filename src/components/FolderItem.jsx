import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDrop } from 'react-dnd';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import {
  editFolder,
  addFolder,
  editModeOn,
  selectFolder,
  deleteFolder,
} from '../actions/foldersActions';
import {
  addNote,
  dragAndDropNote,
  deleteNotesInFolder,
} from '../actions/notesActions';
import { ItemTypes } from '../utils/items';
import NotesList from './NotesList';

const useStyles = makeStyles({
  contextMenu: {
    padding: '4px 2px',
    background: '#d9d9d9',
    zIndex: 1,
    borderRadius: 10,
    fontSize: 15,
  },
  contextMenuItem: {
    padding: 10,
    borderRadius: 10,
    '&:hover': {
      background: '#e6e6e6',
    },
  },
  divider: {
    height: 2,
    background: '#707070',
  },
  listItem: {
    cursor: 'pointer',
    borderRadius: 5,
  },
  listItemMobile: {
    height: 50,
  },
  listItemSelected: {
    background: '#ededed',
  },
  width: {
    width: '100%',
  },
  drop: {
    background: '#d9d9d9',
  },
  mobile: {
    display: 'flex',
    alignItems: 'center',
    height: 35,
  },
});

const FolderItem = ({
  name,
  id,
  editFolder,
  editMode,
  addFolder,
  editModeOn,
  selectFolder,
  selectedFolder,
  deleteFolder,
  dragAndDropNote,
  deleteNotesInFolder,
  addNote,
}) => {
  const [newName, setNewName] = useState(name);

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => dragAndDropNote(item.id, id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleEnter = (e) => {
    if (e.key === 'Enter' && newName.trim()) {
      editFolder(id, newName);
    }
  };

  const deleteHandler = () => {
    deleteFolder(selectedFolder);
    deleteNotesInFolder(selectedFolder);
  };

  const editField = (
    <TextField
      inputProps={{
        style: { fontSize: 18 },
      }}
      value={newName}
      autoFocus
      onFocus={(e) => e.target.select()}
      onChange={(e) => setNewName(e.target.value)}
      onBlur={() => newName.trim() && editFolder(id, newName)}
      onKeyDown={(e) => handleEnter(e)}
    />
  );

  const defaultField = (
    <div className={classes.width}>
      {!isMobile ? (
        <div>
          <ContextMenuTrigger id={id}>
            <div
              role="presentation"
              onClick={() => selectFolder(id)}
              className={classes.width}
            >
              {name}
            </div>
          </ContextMenuTrigger>
          <ContextMenu className={classes.contextMenu} id={id}>
            <MenuItem
              className={classes.contextMenuItem}
              data={{ foo: 'bar' }}
              onClick={() => editModeOn(id)}
            >
              Rename folder...
            </MenuItem>
            <MenuItem
              className={classes.contextMenuItem}
              data={{ foo: 'bar' }}
              onClick={() => deleteHandler()}
            >
              Delete folder...
            </MenuItem>
            <MenuItem className={classes.divider} />
            <MenuItem
              className={classes.contextMenuItem}
              data={{ foo: 'bar' }}
              onClick={() => addFolder()}
            >
              New folder
            </MenuItem>
          </ContextMenu>
        </div>
      ) : (
        <div className={classes.mobile}>
          <div
            role="presentation"
            onClick={() => selectFolder(id)}
            className={classes.width}
          >
            {name}
          </div>
          {selectedFolder === id && (
            <>
              <IconButton
                onClick={() => addNote(selectedFolder)}
                className={classes.button}
              >
                <NoteAddIcon />
              </IconButton>
              <IconButton
                onClick={() => editModeOn(id)}
                className={classes.button}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deleteHandler()}
                className={classes.button}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <ListItem
        ref={drop}
        className={cn(
          classes.listItem,
          classes.listItemMobile,
          {
            [classes.listItemSelected]: selectedFolder === id && !editMode,
          },
          { [classes.drop]: isOver }
        )}
      >
        {editMode ? editField : defaultField}
      </ListItem>
      {selectedFolder === id && isMobile && <NotesList />}
    </>
  );
};

const mapStateToProps = (state) => ({
  selectedFolder: state.folders.selected,
});

export default connect(mapStateToProps, {
  editFolder,
  addFolder,
  editModeOn,
  selectFolder,
  deleteFolder,
  dragAndDropNote,
  deleteNotesInFolder,
  addNote,
})(FolderItem);

FolderItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  editFolder: PropTypes.func.isRequired,
  addFolder: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  editModeOn: PropTypes.func.isRequired,
  selectFolder: PropTypes.func.isRequired,
  selectedFolder: PropTypes.string.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  dragAndDropNote: PropTypes.func.isRequired,
  deleteNotesInFolder: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
};
