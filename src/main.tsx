import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { ModalContextWrapper } from './context';

ReactDOM.render(
  <React.StrictMode>
    <ModalContextWrapper>
      <App />
    </ModalContextWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
