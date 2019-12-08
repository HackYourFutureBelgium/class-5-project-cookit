import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ButtonBase from '@material-ui/core/ButtonBase';
import InputBase from '@material-ui/core/InputBase';
import ingredients from '../ingredients';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

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
  },
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

let IngredientComponent = ({ item, remove, save }) => {
  let clearClicked = () => {
    remove(item);
  };
  let addClicked = () => {
    save(item);
  };
  return (
    <Paper
      className="classes.paper"
      style={{
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '1px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Grid container wrap="nowrap" style={{ alignItems: 'center', padding: '10px' }}>
        <Grid item xs>
          <Typography>{item}</Typography>
        </Grid>
        <ClearRoundedIcon onClick={clearClicked} />
        <AddRoundedIcon onClick={addClicked} />
      </Grid>
    </Paper>
  );
};

export default function SecondSection({ setIngredients }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState([]);
  const [saved, setSaved] = React.useState([]);
  const [pendingValue, setPendingValue] = React.useState([]);
  setIngredients(value);

  const handleClick = event => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  function remove(item) {
    let arr = value.filter(i => i !== item);
    setValue(arr);
  }

  function save(item) {
    let arr = saved;
    arr.push(item);
    setSaved(arr);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'github-label' : undefined;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ButtonBase
          disableRipple
          className={classes.button}
          aria-describedby={id}
          onClick={handleClick}
        >
          <span>Select Ingredients</span>
        </ButtonBase>
        {value.map(item => (
          <IngredientComponent key={item} item={item} remove={remove} save={save} />
        ))}
      </div>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}
      >
        <Autocomplete
          open
          onClose={handleClose}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          onChange={(event, newValue) => {
            setPendingValue(newValue);
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
      </Popper>
    </React.Fragment>
  );
}

const labels = ingredients;
