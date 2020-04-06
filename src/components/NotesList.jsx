import React, { useCallback, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';
import List from '@material-ui/core/List';
import update from 'immutability-helper';
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

const NotesList = ({ filteredNotes }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  const [notes, setNotes] = useState(filteredNotes);

  useEffect(() => {
    setNotes(filteredNotes);
  }, [filteredNotes]);

  const moveNote = useCallback(
    (dragIndex, hoverIndex) => {
      const dragNote = notes[dragIndex];
      setNotes(
        update(notes, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragNote],
          ],
        })
      );
    },
    [notes]
  );

  return (
    <div
      className={cn(
        { [classes.wrapper]: !isMobile },
        {
          [`${classes.wrapperMobile} ${classes.wrapper}`]:
            isMobile && filteredNotes.length,
        },
        { [classes.zeroHeight]: isMobile && filteredNotes.length === 0 }
      )}
    >
      <List className={`${isMobile && classes.listMobile}`}>
        {notes.map((note, index) => {
          const { id, name, createdAt, text } = note;
          return (
            <NoteListItem
              text={text.split('\n').length >= 2 ? text.split('\n')[1] : ''}
              name={name}
              key={id}
              id={id}
              createdAt={createdAt}
              index={index}
              moveNote={moveNote}
              className={classes.listitem}
            />
          );
        })}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => {
  const filteredNotes = state.notes.list
    .filter((note) => note.folder === state.folders.selected)
    .reverse();
  return {
    filteredNotes,
  };
};

export default connect(mapStateToProps)(NotesList);

NotesList.propTypes = {
  filteredNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
