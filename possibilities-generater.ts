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
//possibilities for mor then three digits of number 
export function generateForLastDigits(
  arr: number[],
  rules: number,
  digits: number,
  level: string
) {
  let copyOf = {
    generationArr: [0],
    generate: {
      answers: [5, 5, 5, 5],
      firstNumber: 5,
      secondNumber: 5
    }
  };
  let numbers = [''];
  for (let digit = 1; digit <= digits; digit++) {
    let generation;
    if (level == 'Easy') {
      if (digit == 1) {
        generation = firstEasyDigits();
      } else {
        generation = lastEasyDigits();
      }
    } else if (level == 'medium') {
      if (digit % 2 == 0) {
        generation = firstEasyDigits();
      } else {
        generation = firstDifficultDigits();
      }
    } else if (level == 'Difficult') {
      generation = firstDifficultDigits();
    }
    numbers[digit] = generation;
  }
  let num = +numbers.join('');

  if (arr.indexOf(num) == -1) {
    let fNum = +(rules.toString() + '0' + rules.toString());
    let sNum = num;
    arr.push(num);
    copyOf.generationArr = arr;
    copyOf.generate.answers = ansArray(fNum, sNum);
    copyOf.generate.firstNumber = fNum;
    copyOf.generate.secondNumber = sNum;
  } else {
    return generateForLastDigits(arr, rules, digits, level);
  }

  return copyOf;
}
