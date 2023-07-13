import sum from '@devflix/core/test';

const convertSumToString = (a: number):string => {
    const b = sum(a, 2);
    return b.toString();
}

console.log(convertSumToString(2)   );


export default convertSumToString;