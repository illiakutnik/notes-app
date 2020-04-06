import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { useDrag } from 'react-dnd';

import { deleteNote, selectNote } from '../actions/notesActions';
import Note from './Note';
import { ItemTypes } from '../utils/items';

const useStyles = makeStyles({
  listitem: {
    borderBottom: '2px solid #f0f0ee',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  dragOpacity: {
    opacity: '0.5',
  },
  selected: {
    background: '#ffffb3',
  },
  note: {
    background: 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    color: '#707070',
  },
  noteMain: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  noteSecondary: {
    display: 'flex',
  },
  textSpan: {
    paddingLeft: 10,
  },
  modal: {
    position: 'fixed',
    zIndex: 1300,
    right: '20px !important',
    top: '20px !important',
    left: '20px !important',
  },
});

const NoteListItem = ({
  selectNote,
  selectedNote,
  name,
  text,
  id,
  createdAt,
  deleteNote,
}) => {
  const [showModal, setShowModal] = useState(false);

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const dblClickHandler = () => {
    if (isMobile && selectedNote === id) {
      setShowModal(true);
    }
  };

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <ListItem
      onClick={() => selectNote(id)}
      onDoubleClick={dblClickHandler}
      ref={drag}
      className={`${classes.listitem} ${isDragging && classes.dragOpacity} ${
        selectedNote === id && classes.selected
      }`}
    >
      <div className={classes.note}>
        <div className={classes.noteMain}>
          <p>{name || 'New Note'}</p>
          <div className={classes.noteSecondary}>
            <p>{createdAt}</p>
            <p className={classes.textSpan}>{text || 'no additional text'}</p>
          </div>
        </div>
        {isMobile && selectedNote === id && (
          <>
            <div>
              <IconButton onClick={() => setShowModal(true)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => deleteNote(selectedNote)}>
                <DeleteIcon />
              </IconButton>
            </div>
            <Modal
              className={classes.modal}
              open={showModal}
              onClose={() => setShowModal(false)}
            >
              <div>
                <Note closeModal={() => setShowModal(false)} />
              </div>
            </Modal>
          </>
        )}
      </div>
    </ListItem>
  );
};

const mapStateToProps = (state) => ({
  selectedNote: state.notes.selected,
});

export default connect(mapStateToProps, { selectNote, deleteNote })(
  NoteListItem
);

NoteListItem.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  selectedNote: PropTypes.string.isRequired,
  deleteNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
};
