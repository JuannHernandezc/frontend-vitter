//Imports Default 
import React from 'react';
import {createRoot} from 'react-dom/client';

//Imports CSS
import './index.css'

//Imports add by Vitter
import 'normalize.css';

//Imports Components
import { Main } from './Main';



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
