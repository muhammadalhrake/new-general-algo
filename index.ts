// Import stylesheets
import { PossibilityTree } from './101.Model';
import {
  generateForTwoNumber,
  generateForLastDigits
} from './possibilities-generater';
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
let possibilitiesArrForLastDigit = [0];
let currentNumbers = [''];

function mainGeneralGeneration(
  count: number,
  digitsForFirstNum: string[],
  digitsForSecondNum: string[],
  levels: string[]
) {
  let generationArray = new Array();
  for (let i = 0; i < count; ) {
    for (let j = 0; j < digitsForFirstNum.length && i < count; j++) {
      for (let k = 0; k < digitsForSecondNum.length && i < count; k++) {
        for (let l = 0; l < levels.length && i < count; l++) {
          //initial the settings
          const FNDigit = +digitsForFirstNum[j];
          const SNDigit = +digitsForSecondNum[k];
          const level = levels[l];
          const generator = generateForTwoNumber(
            possibilityTree,
            possibilitiesArrForLastDigit,
            currentNumbers,
            FNDigit,
            SNDigit,
            level
          );
          //get the question value
          const question = generator.generatedQuestion;
          //Update global values to Preserve the probability values without repetition
          possibilityTree = generator.newpossibilities;
          currentNumbers = generator.allNumberGenerated;
          possibilitiesArrForLastDigit =
            generator.newpossibilitiesArrForLastDigit;
          //push the qustion value to our array question
          generationArray.push(question);
          i++;
        }
      }
    }
  }
  return generationArray;
}
//setInterval(()=>console.log(generateForLastDigits(possibilitiesArrForLastDigit,4,"Easy") ),300)
console.log(mainGeneralGeneration(40,['2'],['2','1'],['Difficult','Easy']))
//console.log(generateForTwoNumber(possibilityTree,possibilitiesArrForLastDigit,allNumberGenerated,1,1,'Easy').generatedQuestion);
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<h1>TypeScript Starter</h1>`;
