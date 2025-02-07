export type System = 'metric' | 'imperial';

interface BMIValues {
    height: number;
    weight: number;
    type: System;
}

const isSystem = (value: any): value is System => {
    return value === 'metric' || value === 'imperial';
};

const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 5) throw new Error('Not enough arguments');
    if (args.length > 5) throw new Error('Too many arguments');
    
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3])) && isSystem(args[4])) {
        return {
            height: Number(args[2]),
            weight: Number(args[3]),
            type: args[4],
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export default { isSystem, parseArguments };