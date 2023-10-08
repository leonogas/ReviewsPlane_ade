"use client"

import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const ButtonRoot = styled(MuiButton)(({ theme, size }) => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'white',
  color: "black",
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: 'white',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'white',
    borderColor: 'white',
  },
  '&:focus': {
    boxShadow: 'black',
  },
}));

// See https://mui.com/guides/typescript/#usage-of-component-prop for why the types uses `C`.
function Button(props) {
  return <ButtonRoot {...props} />;
}

export default Button;