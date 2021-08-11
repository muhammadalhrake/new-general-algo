function possibilitiesGenerator(
  possibilityTree: PossibilityTree,
  rules: number,
  digits: number,
  level: string
) {
  //console.log(rules);
  const ez1 = ['1', '2', '3', '4'];
  const ez2 = ['0', ...ez1];
  const hard = ['5', '6', '7', '8', '9'];
  let generateNum: string[] = [''];
  if (level == 'Easy') {
    if (digits == 1) {
      generateNum = ez1;
    } else if (digits == 2) {
      let merged = ez1.map(f => ez2.map(s => f + s));
      generateNum = merged.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
      );
    } else if (digits == 3) {
      let merged = ez1
        .map(f => ez2.map(s => ez2.map(th => f + s + th)))
        .reduce((accumulator, value) => accumulator.concat(value), []);
      generateNum = merged.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
      );
      //console.log(generateNum);
    }
  } else if (level == 'medium') {
    if (digits == 1) {
      generateNum = ez1;
    } else if (digits == 2) {
      let merged = hard.map(f => ez2.map(s => f + s));
      generateNum = merged.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
      );
    } else if (digits == 3) {
      let merged = hard
        .map(f => ez2.map(s => hard.map(th => f + s + th)))
        .reduce((accumulator, value) => accumulator.concat(value), []);
      generateNum = merged.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
      );
    }
  } else if (level == 'Difficult') {
    if (digits == 1) {
      generateNum = hard;
    } else if (digits == 2) {
      let merged = hard.map(f => hard.map(s => f + s));
      generateNum = merged.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
      );
    } else if (digits == 3) {
      let merged = hard
        .map(f => ez2.map(s => ez2.map(th => f + s + th)))
        .reduce((accumulator, value) => accumulator.concat(value), []);
      generateNum = merged.reduce(
        (accumulator, value) => accumulator.concat(value),
        []
      );
    }
  }
  possibilityTree[rules][digits][level] = generateNum;

  return possibilityTree;
}
