import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import ingredients from '../ingredients';
import { maxHeight } from '@material-ui/system';
import GlobalCss from './GlobalCss';



const useStyles = makeStyles(theme => ({
  root: {
    width: 221,
    fontSize: 13,
  },
  button: {
    fontSize: 13,
    width: '100%',
    textAlign: 'center',
    paddingBottom: 8,
    color: '#586069',
    fontWeight: 600,
    '&:hover,&:focus': {
      color: '#0366d6',
    },
    '& span': {
      width: '100%',
    },
    '& svg': {
      width: 16,
      height: 16,
    },
    border: '1px solid rgba(27,31,35,.15)',
    boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    borderRadius: 3,
    width: 300,
    marginLeft: 5,
  },
  tag: {
    marginTop: 3,
    height: 20,
    padding: '.15em 4px',
    fontWeight: 600,
    lineHeight: '15px',
    borderRadius: 2,
  },
  popper: {
    border: '1px solid rgba(27,31,35,.15)',
    boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    borderRadius: 3,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: '#586069',
    backgroundColor: '#f6f8fa',
  },
  header: {
    borderBottom: '1px solid #e1e4e8',
    padding: '8px 10px',
    fontWeight: 600,
  },
  inputBase: {
    padding: 10,
    width: '100%',
    borderBottom: '1px solid #dfe2e5',
    '& input': {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      border: '1px solid #ced4da',
      fontSize: 14,
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  paper: {
    boxShadow: 'none',
    margin: 0,
    color: '#586069',
    fontSize: 13,
    height: '65vh',
    maxHeight: 'none !important' ////
  },
  //ingredient options
  option: {
    minHeight: 'auto',
    alignItems: 'flex-start',
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: 'transparent',
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  listbox: {
    maxHeight: 'none',
  },
  popperDisablePortal: {
    position: 'relative',
  },
  iconSelected: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginLeft: -2,
  },
  color: {
    width: 14,
    height: 14,
    flexShrink: 0,
    borderRadius: 3,
    marginRight: 8,
    marginTop: 2,
  },
  text: {
    flexGrow: 1,
  },
  close: {
    opacity: 0.6,
    width: 18,
    height: 18,
  },
}));




export default function SearchPart({ setIngredients }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([]);
  const [saved, setSaved] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);

  setIngredients(value);

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  return (
    <div className='select_ingredients'>
      <GlobalCss />
      <Autocomplete
        open
        onClose={handleClose}
        multiple
        classes={{
          paper: classes.paper,
          option: classes.option,
          popperDisablePortal: classes.popperDisablePortal,
          listbox: classes.listbox,
        }}
        value={pendingValue}
        onChange={(event, newValue) => {
          setPendingValue(newValue);
          setValue(newValue);
        }}
        disableCloseOnSelect
        disablePortal
        renderTags={() => null}
        noOptionsText="No labels"
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <DoneIcon
              className={classes.iconSelected}
              style={{ visibility: selected ? 'visible' : 'hidden' }}
            />
            <span className={classes.color} style={{ backgroundColor: option.color }} />
            <div className={classes.text}>{option}</div>
            <CloseIcon
              className={classes.close}
              style={{ visibility: selected ? 'visible' : 'hidden' }}
            />
          </React.Fragment>
        )}
        options={[...labels].sort((a, b) => {
          // Display the selected labels first.
          let ai = value.indexOf(a);
          ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
          let bi = value.indexOf(b);
          bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
          return ai - bi;
        })}
        getOptionLabel={option => option}
        renderInput={params => (
          <InputBase
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            className={classes.inputBase}
          />
        )}
      />
      <Button
        variant="contained"
        onClick={() => { setSaved(value) }}
        style={{ marginTop: '5px' }}
      >
        Save List
      </Button>
      {console.log('SAVED :', saved)}
    </div>
  );
}

const labels = ingredients;




