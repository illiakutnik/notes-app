import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { useDrag, useDrop } from 'react-dnd';

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
    cursor: 'move',
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
  index,
  moveNote,
}) => {
  const [showModal, setShowModal] = useState(false);

  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const dblClickHandler = () => {
    if (isMobile && selectedNote === id) {
      setShowModal(true);
    }
  };

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveNote(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.CARD,
      id,
      index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <ListItem
      onClick={() => selectNote(id)}
      onDoubleClick={dblClickHandler}
      ref={ref}
      className={cn(
        classes.listitem,
        { [classes.dragOpacity]: isDragging },
        { [classes.selected]: selectedNote === id }
      )}
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
  index: PropTypes.number.isRequired,
  moveNote: PropTypes.func.isRequired,
};
