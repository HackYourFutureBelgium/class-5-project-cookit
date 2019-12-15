import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
    padding: "1px"
  },
}));

export default function CheckboxesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    oil: true,
    salt: true,
    water: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { oil, salt, water } = state;
  

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Default Ingredients</FormLabel>
        <FormGroup style={{width:'80%' , height: '80%'}}>
          <FormControlLabel
          disabled
            control={<Checkbox checked={oil} onChange={handleChange('oil')} value="oil" />}
            label="Oil"
          />
          <FormControlLabel
          disabled
            control={<Checkbox checked={salt} onChange={handleChange('salt')} value="salt" />}
            label="Salt"
          />
          <FormControlLabel
          disabled
            control={
              <Checkbox checked={water} onChange={handleChange('water')} value="water" />
            }
            label="Water"
          />
        </FormGroup>
      </FormControl>
 
    </div>
  );
}
