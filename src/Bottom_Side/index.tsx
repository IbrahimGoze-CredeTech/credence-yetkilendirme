import './BottomDataGridCss.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './BottomSide.tsx';

import themes from 'devextreme/ui/themes';
themes.initialized(() => ReactDOM.render(
  <App />,
  document.getElementById('app'),
));
