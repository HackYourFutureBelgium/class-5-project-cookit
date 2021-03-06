import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiAutocomplete-paper>ul': {
      maxHeight: 'unset',
      height: '100%',
      overflow: 'scroll',
      width: '100%'
    },
    '.MuiGrid-grid-lg-3': {
      zIndex: '1',
    },
    '.MuiGrid-grid-lg-8': {
      zIndex: '1',
    },
    '.MuiGrid-grid-xs-12': {
      zIndex: '2',
    },
  },
})(() => null);

export default GlobalCss;
