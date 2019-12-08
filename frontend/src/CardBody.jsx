import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import { Icon } from 'antd';
import { Badge } from 'react-bootstrap';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

const CardBody = () => {
  return (
    <div class="card mb-3">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src={logo} class="card-img" alt="..." />
        </div>
        <div class="col-md-7">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <Badge variant="danger">ingredients needed</Badge>
            <Badge variant="success">ingredients in stock</Badge>
          </div>
        </div>
        <div className="col-md-1 text-center">
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <FavoriteIcon className="text-muted" />
            </Grid>
            <Grid item xs={12}>
              <Icon type="double-right" className="text-muted" />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CardBody;
