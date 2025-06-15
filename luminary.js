const { parse } = require('path');
const readline = require('readline/promises');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    const speedOfLight = 299792458; // Speed of light in m/s

async function luminary() {
    const distanceStr = await rl.question('Enter the distance in meters: ');
    
    console.log('Calculating the time it takes for lights to travel...');

    const distance = parseFloat(distanceStr)

    const time = distance / speedOfLight; // Time in seconds

    let readableTime

    if (time < 1e-6) {
        readableTime = (time * 1e9).toFixed(2) + ' nanoseconds';
    } else if (time < 1e-3) {
        readableTime = (time * 1e6).toFixed(2) + ' microseconds';
    } else if (time < 1) {
        readableTime = (time * 1e3).toFixed(2) + ' milliseconds';
    } else {
        readableTime = time.toFixed(3) + ' seconds';
    }

    console.log(`It takes approximately ${readableTime} for light to travel ${distance} meters.`);

    const again = await rl.question('Do you want to try again? (y/n): ');
    if (again.trim().toLowerCase() === 'y') {
        await luminary(); // 👈 recursive call
    } else if (again.trim().toLowerCase() === 'n'){
        rl.close();
    } else {
        console.log('Invalid input. Please enter "y" or "n".');
        await luminary(); // 👈 recursive call for invalid input
    }
}

luminary();

