import { PossibilityTree } from './101.Model';
import random from 'random';
import * as _ from 'lodash';
import { ansArray } from './general-answer';
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
  digitsForNum: number,
  level: string
) {
  let copyOf = {
    generationArr: [0],
    numberGenerate: 1
  };
  let fNum = generateNumberWithSpesificDigits(digitsForNum, level);
  if (arr.indexOf(fNum) == -1) {
    arr.push(fNum);
    copyOf.generationArr = arr;
    copyOf.numberGenerate = fNum;
    return copyOf;
  } else {
    return generateForLastDigits(arr, digitsForNum, level);
  }
}
/* function for generate  two number with spesific digits 
  {(ARGUMENT OF FUNCTION )=(possibilityTree:for first three digits in both number )
    ,(possibilitiesArrForLastDigit : for last digit bigger than three digits),
    (allGenerateNum:The mixture of probabilities between the first and second numbers combined in the same generated question =>mumber be like 45*32),(digitsForFirstNum:The number of digits in the first number),
    (digitsForSecondNum:The number of digits in the second number)
  }, 
*/
function generateForTwoNumber(
  possibilities: PossibilityTree,
  possibilitiesArrForLastDigit: number[],
  allGenerateNum: string[],
  digitsForFirstNum: number,
  digitsForSecondNum: number,
  level: string
) {
  let generatorBag = {
    newpossibilities: possibilities,
    newpossibilitiesArrForLastDigit: possibilitiesArrForLastDigit,
    allNumberGenerated: allGenerateNum,
    generatedQuestion: {
      answers: [1, 1, 1, 1],
      firstNumber: 1,
      secondNumber: 1
    }
  };
  const firstGeneratedNumber = generateNumber(
    possibilities,
    possibilitiesArrForLastDigit,
    digitsForFirstNum,
    1,
    level
  );
  const secondGeneratedNumber = generateNumber(
    possibilities,
    possibilitiesArrForLastDigit,
    digitsForSecondNum,
    2,
    level
  );
  const AmultiplyB =
    firstGeneratedNumber.numberGenerated.toString() +
    '*' +
    secondGeneratedNumber.numberGenerated.toString();
  /* to confirm that the generated question  is not generated before */
  if (allGenerateNum.indexOf(AmultiplyB) == -1) {
    allGenerateNum.push();
    generatorBag.allNumberGenerated = allGenerateNum;
    generatorBag.newpossibilities[1][digitsForFirstNum][level] =
      firstGeneratedNumber.newPossibilitiesTree[1][digitsForFirstNum][level];
    generatorBag.newpossibilities[2][digitsForSecondNum][level] =
      secondGeneratedNumber.newPossibilitiesTree[2][digitsForSecondNum][level];
    generatorBag.newpossibilitiesArrForLastDigit = _.intersection(
      firstGeneratedNumber.newPossibilitiesArrForLastDigit,
      secondGeneratedNumber.newPossibilitiesArrForLastDigit
    );
    generatorBag.generatedQuestion.answers = ansArray(
      firstGeneratedNumber.numberGenerated,
      secondGeneratedNumber.numberGenerated
    );
    generatorBag.generatedQuestion.firstNumber =
      firstGeneratedNumber.numberGenerated;
    generatorBag.generatedQuestion.secondNumber =
      secondGeneratedNumber.numberGenerated;
    return generatorBag;
  } else {
    return generateForTwoNumber(
      possibilities,
      possibilitiesArrForLastDigit,
      allGenerateNum,
      digitsForFirstNum,
      digitsForSecondNum,
      level
    );
  }
}
//// To create one from two numbers
function generateNumber(
  possibilities: PossibilityTree,
  possibilitiesArrForLastDigit: number[],
  digitsForNum: number,
  wichNumber: number,
  level: string
) {
  let copyOf = {
    newPossibilitiesTree: possibilities,
    newPossibilitiesArrForLastDigit: possibilitiesArrForLastDigit,
    numberGenerated: 1
  };
  if (digitsForNum <= 3) {
    const originNumber = generateForFirstThreeDigits(
      possibilities,
      wichNumber,
      digitsForNum,
      level
    );
    copyOf.newPossibilitiesTree = originNumber.possibel;
    copyOf.numberGenerated = originNumber.numberGenerate;
    return copyOf;
  } else {
    const originNumber = generateForLastDigits(
      possibilitiesArrForLastDigit,
      digitsForNum,
      level
    );
    copyOf.newPossibilitiesArrForLastDigit = originNumber.generationArr;
    copyOf.numberGenerated = originNumber.numberGenerate;
    return copyOf;
  }
}
