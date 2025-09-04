document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input");
    const inputUnits = document.getElementById("inputUnits");
    const outputUnits = document.getElementById("outputUnits");
    const specificGravity = document.getElementById("specificGravity");

    const updateResult = () => {
        const inputValue = parseFloat(input.value) || 0;
        const inputUnitValue = inputUnits.value;
        const outputUnitValue = outputUnits.value;
        const sgValue = parseFloat(specificGravity.value) || 1;
        const result = selectMethod(inputValue, inputUnitValue, outputUnitValue, sgValue);
        document.getElementById("result").textContent = result;
    };

    input.addEventListener("input", updateResult);
    inputUnits.addEventListener("change", updateResult);
    outputUnits.addEventListener("change", updateResult);
    specificGravity.addEventListener("input", updateResult);
});

const units = {
atm: {name:"atm", type:"pressure", conversion:14.6959},
bar: {name:"bar", type:"pressure", conversion:14.5038},
psi: {name:"psi", type:"pressure", conversion:1},
ksi: {name:"ksi", type:"pressure", conversion:1000},
Pa: {name:"Pa", type:"pressure", conversion: 0.000145038},
kPa: {name:"kPa", type:"pressure", conversion: 0.145038},
MPa: {name:"MPa", type:"pressure", conversion: 145.038},
ftH20: {name:"ftH20", type:"head", conversion: 1},
mH20: {name:"mH20", type:"head", conversion: 3.28084},
inHg: {name:"inHg", type:"head", conversion: 1.13496},
mmHg: {name:"mmHg", type:"head", conversion: 0.0446836},
kg_cm2: {name:"kg/cm2", type: "pressure", conversion: 14.2233},
kg_m2: {name:"kg/m2", type:"pressure", conversion: 0.00142255},
kg_mm2: {name:"kg/mm2", type:"pressure", conversion: 1422.33},
kN_m2: {name:"kN/m2", type:"pressure", conversion:0.145038},
N_m2: {name:"N/m2", type:"pressure", conversion: 0.000145038}
};

const headToHead = (input, inputUnits, outputUnits) => {
    let conversionFactor1 = units[inputUnits].conversion;
    let standardValue = input * conversionFactor1;
    let conversionFactor2 = units[outputUnits].conversion;
    let output = standardValue / conversionFactor2;
    return output;
};

const headToPressure = (input, inputUnits, outputUnits, specificGravity) => {
    let conversionFactor1 = units[inputUnits].conversion;
    let standardValue = input * conversionFactor1 / 2.31 / specificGravity; 
    let conversionFactor2 = units[outputUnits].conversion;
    let output = standardValue / conversionFactor2;
    return output;
};

const pressureToPressure = (input, inputUnits, outputUnits) => {
    let conversionFactor1 = units[inputUnits].conversion;
    let standardValue = input * conversionFactor1; 
    let conversionFactor2 = units[outputUnits].conversion;
    let output = standardValue / conversionFactor2;
    return output;
};

const pressureToHead = (input, inputUnits, outputUnits, specificGravity) => {
    let conversionFactor1 = units[inputUnits].conversion;
    let standardValue = input * conversionFactor1 * 2.31 * specificGravity; 
    let conversionFactor2 = units[outputUnits].conversion;
    let output = standardValue / conversionFactor2;
    return output;
};

const selectMethod = (input, inputUnits, outputUnits, specificGravity) => {
    let inputType = units[inputUnits].type;
    let outputType = units[outputUnits].type;
    switch (inputType) {
        case "head":
            if (outputType === "head") {
                return headToHead(input, inputUnits, outputUnits);
            } else {
                return headToPressure(input, inputUnits, outputUnits, specificGravity);
            }
        case "pressure":
            if (outputType === "pressure") {
                return pressureToPressure(input, inputUnits, outputUnits);
            } else {
                return pressureToHead(input, inputUnits, outputUnits, specificGravity);
            }
    }
}