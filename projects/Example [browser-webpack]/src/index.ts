import './index.css';

const app = document.getElementsByClassName('App')[0];

const element = document.createElement('div');
element.className = 'App-text';
element.innerHTML = 'Example [browser-webpack]';

app.appendChild(element);
