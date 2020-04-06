import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import NoteListItem from './NoteListItem';

const useStyles = makeStyles({
  wrapper: {
    background: '#fafaf8',
    padding: 5,
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    borderRight: '2px solid #f0f0ee',
    borderLeft: '2px solid #f0f0ee',
  },
  zeroHeight: {
    height: 0,
  },
  wrapperMobile: {
    height: 'auto',
    paddingBottom: 0,
  },
  listMobile: {
    paddingBottom: 0,
  },
});

const NotesList = ({ notes, selectedFolder }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const filteredNotes = notes.filter((note) => note.folder === selectedFolder);

  return (
    <div
      className={`${!isMobile && classes.wrapper} ${
        isMobile && filteredNotes.length > 0 && classes.wrapperMobile
      } ${isMobile && filteredNotes.length > 0 && classes.wrapper} 
      ${isMobile && filteredNotes.length === 0 && classes.zeroHeight}`}
    >
      <List className={`${isMobile && classes.listMobile}`}>
        {filteredNotes.reverse().map((note) => {
          const { id, name, createdAt, text } = note;

          return (
            <NoteListItem
              text={text.split('\n').length >= 2 ? text.split('\n')[1] : ''}
              name={name}
              key={id}
              id={id}
              createdAt={createdAt}
              className={classes.listitem}
            />
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedNote: state.notes.selected,
  selectedFolder: state.folders.selected,
  notes: state.notes.list,
});

export default connect(mapStateToProps)(NotesList);

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFolder: PropTypes.string.isRequired,
};
