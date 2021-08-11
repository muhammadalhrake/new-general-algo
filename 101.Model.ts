export interface PossibilityTree {
  [key: number]: {
    [key: number]: {
      [key: string]: string[];
    };
  };
}
export interface monad {
  answers: number[];
  firstNumber: number;
  secondNumber: number;
}
