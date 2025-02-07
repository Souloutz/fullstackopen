import utils, { System } from "./utils/parse";

const calculateBMI = (height: number, weight: number, type: System) => {
    let BMI;

    switch (type) {
        case 'metric':
            let convertedHeight = height / 100;
            BMI = weight / (convertedHeight ** 2);
            break;
        case 'imperial':
            BMI = (weight / (height ** 2)) * 703;
            break;
        default:
            throw new Error("Not a valid system of measurement");
    }

    if (BMI < 16.0)
        return "Underweight (Severe thinness)";
    else if (16.0 <= BMI && BMI <= 16.9)
        return "Underweight (Moderate thinness)";
    else if (17.0 <= BMI && BMI <= 18.4)
        return "Underweight (Mild thinness)";
    else if (18.5 <= BMI && BMI <= 24.9)
        return "Normal range";
    else if (25.0 <= BMI && BMI <= 29.9)
        return "Overweight (Pre-obese)";
    else if (30.0 <= BMI && BMI <= 34.9)
        return "Obese (Class I)";
    else if (35.0 <= BMI && BMI <= 39.9)
        return "Obese (Class II)";
    else
        return "Obese (Classs III)";
}

export default calculateBMI;

// Only runs if module run directly
// Like Python's __name__ == "__main__"
if (require.main === module) {
    try {
        const { height, weight, type } = utils.parseArguments(process.argv);
        console.log(calculateBMI(height, weight, type));
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}