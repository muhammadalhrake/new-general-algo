import { PossibilityTree } from './101.Model';
import random from 'random';
///helper function
function between(min: number, max: number) {
  return random.int(min, max);
}
///random for easy digits
const firstEasyDigits = () => between(1, 4);
const lastEasyDigits = () => between(0, 4);
///for difficult digits
const firstDifficultDigits = () => between(5, 9);
const reduceArr = (arr: string[][]) => {
  return arr.reduce((accumulator, value) => accumulator.concat(value), []);
};
function possibilitiesGenerator(
  possibilityTree: PossibilityTree,
  rules: number,
  digits: number,
  level: string
) {
  ///range number generation digits for every difficulty
  const arrForFirstEasyDigits = ['1', '2', '3', '4'];
  const arrForlastEasyDigits = ['0', ...arrForFirstEasyDigits];
  const hard = ['5', '6', '7', '8', '9'];
  let generateNum: string[] = [''];
  if (level == 'Easy') {
    easyPossibilitiesGeneration();
  } else if (level == 'Middle') {
    middlePossibilitiesGeneration();
  } else if (level == 'Difficult') {
    difficultPossibliltiesGeneration();
  }
  possibilityTree[rules][digits][level] = generateNum;

  return possibilityTree;

  function difficultPossibliltiesGeneration() {
    if (digits == 1) {
      generateNum = hard;
    } else if (digits == 2) {
      let merged = hard.map(f => hard.map(s => f + s));
      generateNum = reduceArr(merged);
    } else if (digits == 3) {
      let merged = hard
        .map(f =>
          arrForlastEasyDigits.map(s =>
            arrForlastEasyDigits.map(th => f + s + th)
          )
        )
        .reduce((accumulator, value) => accumulator.concat(value), []);
      generateNum = reduceArr(merged);
    }
  }

  function middlePossibilitiesGeneration() {
    if (digits == 1) {
      generateNum = arrForFirstEasyDigits;
    } else if (digits == 2) {
      let merged = hard.map(f => arrForlastEasyDigits.map(s => f + s));
      generateNum = reduceArr(merged);
    } else if (digits == 3) {
      let merged = hard
        .map(f => arrForlastEasyDigits.map(s => hard.map(th => f + s + th)))
        .reduce((accumulator, value) => accumulator.concat(value), []);
      generateNum = reduceArr(merged);
    }
  }

  function easyPossibilitiesGeneration() {
    if (digits == 1) {
      generateNum = arrForFirstEasyDigits;
    } else if (digits == 2) {
      let merged = arrForFirstEasyDigits.map(f =>
        arrForlastEasyDigits.map(s => f + s)
      );
      generateNum = reduceArr(merged);
    } else if (digits == 3) {
      let merged = arrForFirstEasyDigits
        .map(f =>
          arrForlastEasyDigits.map(s =>
            arrForlastEasyDigits.map(th => f + s + th)
          )
        )
        .reduce((accumulator, value) => accumulator.concat(value), []);
      generateNum = reduceArr(merged);
    }
  }
}
