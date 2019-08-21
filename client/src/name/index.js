import Chance from 'chance';

const nameGetter = new Chance();
//get a random name
export const getAName = () => nameGetter.first();