import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import DeleteIcon from '@material-ui/icons/Delete';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { deleteFolder } from '../actions/foldersActions';
import {
  addNote,
  deleteNote,
  deleteNotesInFolder,
} from '../actions/notesActions';

const useStyles = makeStyles({
  grid: {
    position: 'fixed',
    right: 0,
    left: 0,
    background: '#d9d9d9',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
  },
  paddingLeft: {
    paddingLeft: '25vw',
  },
  button: {
    margin: '0 15px',
    background: '#f4f4f4',
    borderRadius: 5,
    padding: '5px 10px',
    cursor: 'pointer',
    ' &:hover': {
      background: '#ffffff',
    },
  },
});

const UpperMenu = ({
  showSwitch,
  show,
  deleteFolder,
  selectedFolder,
  selectedNote,
  addNote,
  deleteNote,
  deleteNotesInFolder,
}) => {
  const classes = useStyles();

  const deleteHandler = () => {
    if (selectedNote) {
      deleteNote(selectedNote);
    }
    if (!selectedNote && selectedFolder) {
      deleteFolder(selectedFolder);
      deleteNotesInFolder(selectedFolder);
    }
  };

  return (
    <Grid
      className={`${classes.grid} ${show && classes.paddingLeft}`}
      item
      xs={12}
    >
      <IconButton onClick={showSwitch} className={classes.button}>
        <ListIcon />
      </IconButton>
      <IconButton
        onClick={() => deleteHandler()}
        className={classes.button}
        disabled={!selectedFolder}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        onClick={() => addNote(selectedFolder)}
        className={classes.button}
        disabled={!selectedFolder}
      >
        <NoteAddIcon />
      </IconButton>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  selectedFolder: state.folders.selected,
  selectedNote: state.notes.selected,
});

export default connect(mapStateToProps, {
  deleteFolder,
  addNote,
  deleteNote,
  deleteNotesInFolder,
})(UpperMenu);

UpperMenu.propTypes = {
  showSwitch: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  selectedFolder: PropTypes.string.isRequired,
  selectedNote: PropTypes.string.isRequired,
  addNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  deleteNotesInFolder: PropTypes.func.isRequired,
};
