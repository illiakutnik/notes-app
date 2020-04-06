import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import cn from 'classnames';

import UpperMenu from './UpperMenu';
import FolderList from './FolderList';
import NotesList from './NotesList';
import Note from './Note';

const useStyles = makeStyles({
  grid: {
    minHeight: '100vh',
    paddingTop: 60,
  },
  foldersHide: {
    display: 'none',
  },
});

function App() {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const classes = useStyles();
  const [showFolders, setShowFolders] = useState(true);

  return (
    <DndProvider backend={Backend}>
      {isMobile ? (
        <FolderList />
      ) : (
        <Grid container>
          <UpperMenu
            show={showFolders}
            showSwitch={() => setShowFolders((prevState) => !prevState)}
          />
          <Grid
            item
            xs={3}
            className={cn(classes.grid, {
              [classes.foldersHide]: !showFolders,
            })}
          >
            <FolderList />
          </Grid>
          <Grid item xs={3} className={classes.grid}>
            <NotesList />
          </Grid>
          <Grid item xs={showFolders ? 6 : 9} className={classes.grid}>
            <Note />
          </Grid>
        </Grid>
      )}
    </DndProvider>
  );
}

export default App;
