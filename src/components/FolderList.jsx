import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { addFolder } from '../actions/foldersActions';

import FolderItem from './FolderItem';

const useStyles = makeStyles({
  wrapper: {
    background: '#f6f6f6',
    padding: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#687087',
    fontSize: 18,
  },
  wrapperMobile: {
    height: '100vh',
    overflow: 'scroll',
  },
  listItem: {
    paddingTop: 12,
  },
  txt: {
    padding: 12,
  },
  button: {
    borderRadius: 10,
  },
});

const FolderList = ({ folders, addFolder }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div className={`${isMobile && classes.wrapperMobile} ${classes.wrapper}`}>
      {folders.length < 1 ? (
        <p className={classes.txt}>
          You do not have any folders yet, please add some by clicking the
          button below...
        </p>
      ) : (
        <List>
          {folders.map((folder) => {
            const { id, editMode, name } = folder;
            return (
              <FolderItem
                key={id}
                className={classes.listItem}
                name={name}
                id={id}
                editMode={editMode}
              />
            );
          })}
        </List>
      )}

      <Button
        onClick={(e) => addFolder(e)}
        className={classes.button}
        startIcon={<AddCircleOutlineIcon />}
      >
        New Folder
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  folders: state.folders.list,
});

export default connect(mapStateToProps, { addFolder })(FolderList);

FolderList.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object).isRequired,
  addFolder: PropTypes.func.isRequired,
};
