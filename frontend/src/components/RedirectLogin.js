import React from 'react';
import { Redirect } from 'react-router-dom';

export default function redirectLogin() {
  return <Redirect to="/signin"> </Redirect>;
}
