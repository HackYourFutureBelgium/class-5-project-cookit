import React, { useState, useEffect, Component } from 'react';
import Select from 'react-select';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import ingredients from './ingredients';




let IngredientComponent = ({ item, remove, save }) => {

  let clearClicked = () => { remove(item) }
  let addClicked = () => { save(item) }
  return (
    <Paper className="classes.paper" style={{ width: '50%', marginTop: '10px', marginBottom: '10px', marginLeft: '1px', position: 'relative', zIndex: 1 }} >
      <Grid container wrap="nowrap" style={{ alignItems: 'center', padding: '10px' }} >
        <Grid item xs>
          <Typography>{item}</Typography>
        </Grid>
        <ClearRoundedIcon onClick={clearClicked} />
        <AddRoundedIcon onClick={addClicked} />
      </Grid>
    </Paper>
  )
}


let SearchIngredient = ({ searchClicked, setSearchClicked }) => {
  let [value, setValue] = useState('');

  return (
    <div
      className="ingredients_search"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: '38px', borderWidth: '1px', borderColor: "grey", borderStyle: 'solid', borderRadius: '5px' }}
      onClick={() => {
        setSearchClicked(!searchClicked);
      }}
    >
      <input
        className="ingredients_searchInput"
        type="search"
        placeholder="Search"
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
        style={{ border: 0, outline: 'none', paddingLeft: '10px', width: '100%', fontFamily: '"Roboto"', fontSize: '1.1rem', fontWeight: 400 }}
      >
      </input >
      <p style={{ paddingRight: '3px', fontSize: '1.5rem', fontWeight: 150, margin: 0, paddingBottom: '5px' }}>|</p>
      <KeyboardArrowDownRoundedIcon style={{ paddingRight: '6px' }} />
    </div>)
}


let PopUpSelect = ({ selected, searchClicked, add }) => {

return (
<ul style={{ width: '30vw', maxHeight: '30vw', backgroundColor: 'white', overflow: 'scroll', listStyle: "none", marginTop: '6px', padding: 0, borderWidth: '1px', borderColor: "grey", borderStyle: 'solid', borderRadius: '5px', display: searchClicked ? 'inline-block' : 'none', position: 'absolute', zIndex: 2 }}>
{ingredients.map((item, key) => selected.includes(item) ?
  <li
    key={key}
    onClick={() => { add(item) }}
    style={{ padding: '5px', backgroundColor: 'yellow' }}
  >
    {item}
  </li> :
  <li
    key={key}
    onClick={() => { add(item) }}
    style={{ padding: '5px' }}
  >
    {item}
  </li>

)}
</ul>
)
}

let SelectedIngredientsDisplay = ({ selected, remove, save }) => {
return (
<div style={{ height: '30vw', overflow: 'scroll' }}>
{selected.map((item, key) => <IngredientComponent key={key} item={item} remove={remove} save={save} />)}
</div>
)
}



let Body = () => {
let [selected, setSelected] = useState([]);
let [saved, setSaved] = useState([]);
let [searchClicked, setSearchClicked] = useState(0);

console.log('Selected: ', selected);

function remove(item) {
let arr = selected.filter(i => i !== item);
setSelected(arr);
}

function add(item) {
let arr = selected;
arr.push(item);
setSaved(arr);
}

function save(item) {
let arr = saved;
arr.push(item);
setSaved(arr);
}

return (
<div style={{ width: "30vw", margin: '30px', height: '30vw' }}>

<SearchIngredient searchClicked={searchClicked} setSearchClicked={setSearchClicked} />
<PopUpSelect selected={selected} searchClicked={searchClicked} add={add} />
<SelectedIngredientsDisplay selected={selected} remove={remove} save={save} />

</div >
)
}

export default Body;