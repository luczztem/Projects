import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//     <App />


//  https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);

// ReactDOM.render(
//   <App />,
//     document.getElementById('root')
//   );