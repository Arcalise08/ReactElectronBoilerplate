import React from 'react';
import {createStore} from 'redux';
import globalState from './reducers';

export default createStore(globalState)
