// Import stylesheets
import { PossibilityTree } from './101.Model';
import './style.css';
let possibilityTree: PossibilityTree = {
  1: {
    1: { Easy: [''], Difficult: [''], medium: [''] },
    2: { Easy: [''], Difficult: [''], medium: [''] },
    3: { Easy: [''], Difficult: [''], medium: [''] }
  },
  2: {
    1: { Easy: [''], Difficult: [''], medium: [''] },
    2: { Easy: [''], Difficult: [''], medium: [''] },
    3: { Easy: [''], Difficult: [''], medium: [''] }
  }
};
let possibilitiesArrForLastDigit = [''];
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
