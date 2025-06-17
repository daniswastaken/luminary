const { parse } = require('path');
const readline = require('readline/promises');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const speedOfLight = 299792458; // Speed of light in m/s

async function luminary() {
    const unit = await rl.question(
        `Choose the unit to count the distance in:
        1) Kilometers
        2) Meters
        > `)
    let unitType
    let unitNum = Number(unit);
    if (unitNum === 1) {
        unitType = 'kilometer';
    } else if (unitNum === 2) {
        unitType = 'meter';
    } else {
        console.log('Invalid input. Please enter "1" or "2" next time.');
        await luminary(); // recursive call for invalid input
    }

    const distanceStr = await rl.question(`Enter the distance in ${unitType}: `);

    console.log('Calculating the time it takes for lights to travel...');

    let distantValue = parseFloat(distanceStr)
    let distance = distantValue

    if (unitNum === 1) {
        distance = distance * 1000;
    }

    // console.log(`${unitNum}`)
    // console.log(`${distance} meters`)

    const time = distance / speedOfLight; // Time in seconds

    let readableTime

    if (time < 1e-6) {
        readableTime = (time * 1e9).toFixed(2) + ' nanoseconds';
    } else if (time < 1e-3) {
        readableTime = (time * 1e6).toFixed(2) + ' microseconds';
    } else if (time < 1) {
        readableTime = (time * 1e3).toFixed(2) + ' milliseconds';
    } else if (time <= 1) {
        readableTime = time.toFixed(3) + ' seconds';
    } else {
        readableTime = (time / 60).toFixed(2) + ' minutes';
    }

    console.log(`It takes approximately ${readableTime} for light to travel ${distantValue} ${unitType}`);
}

async function askRepeat() {
    while (true) {
        const again = await rl.question('Do you want to calculate another? (y/n): ');
        let ans = again.trim().toLowerCase();

        if (ans === 'y') return true;
        if (ans === 'n') return false;

        console.log('Invalid input. Please enter "y" or "n".')
    }
}

async function main() {
    while (true) {
        await luminary();
        const shouldRepeat = await askRepeat();
        if (!shouldRepeat) {
            rl.close();
            break;
        }
    }
}

main();