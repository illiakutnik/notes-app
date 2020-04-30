import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { editNote } from '../actions/notesActions';

const useStyles = makeStyles({
  textArea: {
    background: '#fafaf8',
    width: '100%',
    outline: 'none',
    border: 'none',
    resize: 'none',
    fontSize: '18px',
  },
  wrapper: {
    background: '#fafaf8',
    height: '100%',
    width: '100%',
  },
  mobileUp: {
    display: 'flex',
    height: 50,
    alignItems: 'center',
    background: '#f0f0ee',
    color: '#707070',
  },
  mobileUpText: {
    paddingLeft: 15,
  },
});

const Note = ({ selectedNote, notes, editNote, closeModal }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const renderNote = notes.find((note) => note.id === selectedNote);

  const changeHandler = (e) => {
    editNote(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      {isMobile && (
        <div className={classes.mobileUp}>
          <IconButton onClick={closeModal}>
            <ArrowBackIcon />
          </IconButton>
          <p className={classes.mobileUpText}>
            your changes is going be save automatically, it's ok!!!
          </p>
        </div>
      )}
      <TextareaAutosize
        rowsMin={isMobile ? 25 : 20}
        disabled={!selectedNote}
        className={classes.textArea}
        value={renderNote ? renderNote.text : ''}
        onChange={(e) => changeHandler(e)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedNote: state.notes.selected,
  notes: state.notes.list,
});

export default connect(mapStateToProps, { editNote })(Note);

Note.propTypes = {
  selectedNote: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  editNote: PropTypes.func.isRequired,
};
