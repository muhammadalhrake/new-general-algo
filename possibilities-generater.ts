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

function generateNumberWithSpesificDigits(digits: number, level: string) {
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
  return +numbers.join('');
}

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
// generate for first three digits
export const generateForFirstThreeDigits = (
  possibilityTree: PossibilityTree,
  numOrder: number,
  digits: number,
  level: string
) => {
  if (possibilityTree[numOrder][digits][level][0] == '') {
    possibilityTree[numOrder][digits][level].splice(0, 1);
  }
  if (possibilityTree[numOrder][digits][level].length == 0) {
    possibilityTree = possibilitiesGenerator(
      possibilityTree,
      numOrder,
      digits,
      level
    );
  }

  let copyArr = {
    possibel: possibilityTree,
    numberGenerate: 1
  };
  try {
    let randomSelect = between(
      0,
      possibilityTree[numOrder][digits][level].length - 1
    );
    let num = possibilityTree[numOrder][digits][level][randomSelect];
    copyArr.possibel[numOrder][digits][level] = possibilityTree[numOrder][
      digits
    ][level].filter(value => value != num);
    //console.log(copyArr.possibel[numOrder][digits][level]);
    copyArr.numberGenerate = +num;
  } catch (err) {
    throw Error(err);
  }
  return copyArr;
};

//possibilities for mor then three digits of number
export function generateForLastDigits(
  arr: number[],
  digitsForFirstNum: number,
  digitsForSecondNum: number,
  level: string
) {
  let copyOf = {
    generationArr: [0],
    fNum: 1
  };
  let fNum = generateNumberWithSpesificDigits(digitsForFirstNum, level);
  if (arr.indexOf(fNum) == -1) {
    arr.push(fNum);
    copyOf.generationArr = arr;
    copyOf.fNum = fNum;
  } else {
    return generateForLastDigits(
      arr,
      digitsForFirstNum,
      digitsForSecondNum,
      level
    );
  }

  return copyOf;
}

function generateForTwoNumber(
  possibilities: PossibilityTree,
  allGenerateNum: string[],
  digitsForFirstNum: string[],
  digitsForSecondNum: string[],
  level: string[]
) {}
