import React from 'react';
import ExpansionPart from './ExpansionPart';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardBody from './CardBody';
import SearchBody from './SearchBody';

const MainBody = () => {
  return (
    <>
      <Grid container spacing={3} className="w-100 m-0">
        <Grid item xs={12}>
          <ExpansionPart />
        </Grid>
        <Grid item xs={6}>
          <SearchBody />
        </Grid>
        <Grid item xs={6}>
          <CardBody />
          <CardBody />
          <CardBody />
        </Grid>
      </Grid>
    </>
  );
};

export default MainBody;
