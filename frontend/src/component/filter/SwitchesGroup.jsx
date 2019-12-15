import React, { Component }from 'react';
import Switch from "react-switch";
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class SwitchesGroup extends Component {
  constructor() {
    super();
    this.state = { 
      glutenfree: false,
      vegan: false,
      diet: false,
     };
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
  }

  handleChange1(glutenfree) {
    this.setState({ glutenfree });
  }
  handleChange2(vegan) {
    this.setState({ vegan });
  }
  handleChange3(diet) {
    this.setState({ diet });
  }

  render() {
    return (
      <FormControl component="fieldset" style={{marginLeft: '2em',width:'80%' , height: '80%'}}>
      <FormLabel component="legend" style={{marginBottom: '1.5em'}} >Dietary </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={ <Switch
            onChange={this.handleChange1}
            checked={this.state.glutenfree}
            className="react-switch"
          />}
          label="Gluten Free"
          style={{marginBottom:'16px'}}
        />
        <FormControlLabel
          control={<Switch
            onChange={this.handleChange2}
            checked={this.state.vegan}
            className="react-switch"
          />}
          label="Vegan"
          style={{marginBottom:'16px'}}
        />
        <FormControlLabel
          control={
            <Switch
            onChange={this.handleChange3}
            checked={this.state.diet}
            className="react-switch"
          />
          }
          label="Diet"
          style={{marginBottom:'16px'}}
        />
      </FormGroup>
    </FormControl>
  );
};
}