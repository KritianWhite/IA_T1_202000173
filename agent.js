function reflexAgent(location, state) {
    if (state === "DIRTY") {
        return 'CLEAN';
    } else if (location === 'A') {
        return 'RIGHT';
    } else if (location === 'B') {
        return 'LEFT';
    }
}

function generateAllStates(locations, cleanliness) {
    let states = [];
    for (let loc of locations) {
        for (let stateA of cleanliness) {
            for (let stateB of cleanliness) {
                states.push([loc, stateA, stateB]);
            }
        }
    }
    return states;
}

function test(location, stateA, stateB) {
    let states = [location, stateA, stateB];
    let results = [];
    let interval = setInterval(() => {
        location = states[0];
        let state = (location === 'A') ? states[2] : states[1];
        let action = reflexAgent(location, state);
        results.push(`<li>Location: ${location} | Action: ${action}</li>`);

        if (states.slice(1).every(s => s === "CLEAN")) {
            results.push("<li>---------------------------------------------------</li>");
            clearInterval(interval);
            displayResults(results);
            return;
        }

        if (action === "CLEAN") {
            states[1] = "CLEAN";
            states[2] = "CLEAN";
        } else if (action === "RIGHT") {
            states[0] = 'B';
        } else if (action === "LEFT") {
            states[0] = 'A';
        }
    }, 1000);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    const ul = document.createElement('ul');
    ul.innerHTML = results.join('');
    resultsContainer.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", function() {
    let locations = ["A", "B"];
    let cleanliness = ["DIRTY", "CLEAN"];

    let possibleStates = generateAllStates(locations, cleanliness);

    for (let state of possibleStates) {
        test(...state);
    }
});
