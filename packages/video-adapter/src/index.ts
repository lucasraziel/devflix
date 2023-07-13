import sum from '@devflix/core/test/index';

const convertSumToString = (a: number):string => {
    const b = sum(a, 2);
    return b.toString();
}

export default convertSumToString;