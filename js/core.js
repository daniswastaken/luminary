let distance;
let unitType;

const speedOfLight = 299792458; // Speed of light in m/s

// Get the data once page loaded
window.onload = function () {
    unitType = Number(document.getElementById('unitType').value);
};

document.getElementById('unitType').onchange = function() {
    unitType = Number(document.getElementById('unitType').value);
}

document.getElementById('calculate').onclick = function() {
    let distanceInput = document.getElementById('distance').value;
    distance = distanceInput.trim() === "" ? 0 : Number(distanceInput);
    luminary();
}

async function unitCheck() {
    if (unitType === 1) {
        window.alert("It's kilometers");
    } else if (unitType === 2) {
        window.alert("It's meters");
    }
}

async function luminary() {
    let distanceValue = parseFloat(distance)
    let unitName
    if (unitType === 1) {
        unitName = 'kilometers';
        distanceValue = distanceValue * 1000;
    } else {
        unitName = 'meters';
    }

    const time = distanceValue / speedOfLight; // Time in seconds

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

    document.getElementById('results').textContent = `${readableTime}`
}