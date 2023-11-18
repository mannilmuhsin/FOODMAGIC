import React from 'react';
import { InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
 search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
 },
 searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
 },
 inputRoot: {
    color: 'inherit',
 },
 inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
 },
}));

const SearchBar = () => {
 const classes = useStyles();

 return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <i className="material-icons">search</i>
      </div>
      <InputBase
        placeholder="Search for a course…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
 );
};

export default SearchBar;