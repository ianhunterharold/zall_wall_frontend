import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// first test on a manual array

const arrEx = ['React Native', 'MeteorJS'];

test('The list of course mentions React Native and MeteorJS', ()=> {
  expect(['React Native','MeteorJS','React']).toEqual(expect.arrayContaining(arrEx));
});
