document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('app');
    if (!appId) {
        console.error("No app specified in URL parameters.");
        return;
    }
    PopulateHotspots(appId);
});


function ActivateHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    const explanations = document.querySelectorAll('.explanation');
    
    // Function to activate an explanation
    function activateExplanation(number) {
        // Remove active class from all explanations
        explanations.forEach(exp => {
            exp.classList.remove('active');
        });
        
        // Add active class to the targeted explanation
        const targetExplanation = document.getElementById(`exp-${number}`);
        if (targetExplanation) {
            targetExplanation.classList.add('active');
            
            // Scroll to the explanation
            targetExplanation.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    
    // Add click event to each hotspot
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            const targetNumber = this.getAttribute('data-target');
            activateExplanation(targetNumber);
        });
    });
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key >= 1 && e.key <= 5) {
            activateExplanation(e.key);
        }
    });
}




function addHotspotAndExplanation(hotspotTop, hotspotLeft, targetNumber, title, text) {
    // Add the hotspot
    const hotspotContainer = document.querySelector('.screenshot-container');
    const hotspot = document.createElement('div');
    hotspot.className = 'hotspot';
    hotspot.style.top = hotspotTop;
    hotspot.style.left = hotspotLeft;
    hotspot.dataset.target = targetNumber;
    hotspot.textContent = targetNumber;
    hotspotContainer.appendChild(hotspot);

    // Add the explanation
    const explanationsContainer = document.querySelector('.explanations');
    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.id = `exp-${targetNumber}`;
    explanation.innerHTML = `
        <h3><span class="number">${targetNumber}</span>${title}</h3>
        <p>${text}</p>
    `;
    explanationsContainer.appendChild(explanation);
}


function clearHotspotsAndExplanations() {
    // Clear all hotspots
    const hotspotContainer = document.querySelectorAll('.hotspot')
    hotspotContainer.forEach(hotspot => hotspot.remove());

    // Clear all explanations
    const explanationsContainer = document.querySelector('.explanations');
    explanationsContainer.innerHTML = '';
}

function PopulateHotspots(type){
    if (type === 'earthpi') {
        document.getElementById('screenshot').src = '/pics/guideEarthPi.png';
        addHotspotAndExplanation('7%', '20%',  1, 'Time Widget', 'This is the time Widget to show the current app time. Changing time from the time controller panel will reflect on this widget. Press the Widget to open date/time picker. Also once time has changed, a rest button will appear next to the Widget to reset time back to current time.');
        addHotspotAndExplanation('30%', '85%', 2, 'Side Toggle Buttons', "Side toggle buttons change projection's visual settings. from the top, the sun button toggles sunlight on/off. The grid button toggles latitude/longitude grid on/off. The circles button toggles tissot's indicatrix on/off. The location button toggles location marker on/off.");
        addHotspotAndExplanation('39%', '33%', 3, 'Celestial Bodies', 'The sun position on the map (or any other celestial body) indicates their real time zenith (overhead) position over earth relative to the selected time.');
        addHotspotAndExplanation('92%', '47%', 4, 'Navigation Tabs', 'The Navigation Tabs, from left to right; tools tab for additional features, time tab for showing time control panel, map projections tab for showing projections picker panel, then the projection preset tab to change/customize projection settings, and finally the settings tab for app settings.');
        ActivateHotspots();
    }
    if (type === 'flatearth') {
        // addHotspotAndExplanation('3%', '50%', 1, 'Top UI', 'The section on the top is a basic interface that shows general astronomical information. On the left, it shows a view of the tracked object. On the right, it shows its phase then right below that, a basic latitude graph that shows the current latitude of the rest of the available celestial bodies relative to the app time. If you tapped on the left view, the tracked object will be at full screen. If you press and swiped left or right on the latitude graph, you can change time by days. Tap the latitude graph to show equator and tropics lines on the map.');
        //addHotspotAndExplanation('15%', '20%', 1, "");
        make_pages(
            [()=>{
                console.log("page 1");
                document.getElementById('screenshot').src = '/pics/guideFE1.png';
                addHotspotAndExplanation('15%', '20%', 1, 'Telescope View', "This shows a view of the tracked celestial body. If you tapped on it, the tracked object will be the main display in the middle while earth will be minimized. Tap the minimized earth view to go back to normal view. The eye button on the bottom right of the telescope view toggles between adding the viewer's parallactic angle or not.");
                addHotspotAndExplanation('7%', '75%', 2, 'Info UI', "This interface Shows the phase of the tracked body. Below that a basic latitude graph that shows the current latitude of the rest of the available celestial bodies relative to the app time. If you press and swiped left or right on the latitude graph, you can change time by days. Tap the latitude graph to show equator and tropics lines on the earth's map.");
                addHotspotAndExplanation('20%', '70%', 3, 'Scale Slider', "The Astronomical Scale Slider shows how far the tracked object is from the observer. if the indicator is nearing the left, then the tracked object is closer to its nearest recorded distance to the observer, but if it's nearing the right, then it's closer to its farthest recorded distance to the observer. The Astronomical Scale Slider is relative to the app time.");
                addHotspotAndExplanation('53%', '25%', 4, 'Celestial Bodies', 'The sun position on the map (or any other celestial body) indicates their real time zenith (overhead) position over earth relative to the selected time.');
                addHotspotAndExplanation('90%', '47%', 5, 'Time UI', "The Time Interface shows the current app time and date. Tap on the interface to open the date/time picker panel. The button on the left resets time back to current time. The button on the right change map's visual mode.");
                // console.log("page 1");
                ActivateHotspots();
            },
            ()=>{
                console.log("page 2");
                document.getElementById('screenshot').src = '/pics/guideFE2.png';
                addHotspotAndExplanation('24%', '75%', 1,'Navigation Mode', "Once you press the navigation mode button, the info UI changes to navigation mode. In this mode, you can utilize the compass or find celestial bodies position relative to a specific location on earth.");
                addHotspotAndExplanation('88%', '90%', 2,'Auto Location Finder', "The auto location finder button uses your device's GPS to find your location and set it as the observer's location.");
                addHotspotAndExplanation('24%', '8%', 3,'Manual Location Finder', "The manual location finder button allows you to manually set the observer's location by entering latitude and longitude coordinates or by tabbing on the map to set the observer's location.");
                addHotspotAndExplanation('53%', '50%', 4,"Observer's Sky Dome", "The sky dome appears over the observer on the map when you enter navigation mode. It shows the visible sky above the observer's horizon. Celestial bodies that are above the horizon will appear inside the dome while those below the horizon will be outside the dome. Celestial bodies that appears inside the sky dome relative to your location are direction accurate but not overhead(zenith) accurate. Due to atmospheric refraction, celestial bodies appears slightly higher in the sky than their actual geometric position. The sky dome is just a visual representation to help you find the direction of celestial bodies relative to your location.");

                ActivateHotspots();
            },
            // ()=>{
            //     console.log("page 3");
            // }
        ]);

        addControlGuide('Touch Tips:', [
            "Use two fingers to pan and zoom the map.",
            "Use one finger and rotate clockwise or counterclockwise around the north pole to move time forward or backward.",
            "Use one finger on the edge to rotate the map."]);
    }
    if(type == 'moon'){
        document.getElementById('screenshot').src = '/pics/guideTheMoon.png';
        addHotspotAndExplanation('15%', '48%',  1, 'Main Info panel', "This is the main info panel that shows the current app time and date. Below on the left is the current moon phase and below on the right is the current moon altitude. The eye icon next to the altitude indicates whether the moon is above or below the horizon. Tap on the panel to open the date/time picker panel.");
        // addHotspotAndExplanation('15%', '80%',  2, '', "");
        addHotspotAndExplanation('78%', '48%',  2, 'Visual Toggles', "These three buttons toggle the moon's visual settings. From left to right; the first button toggles the atmosphere on/off. The second button toggles the viewer's parallactic angle effect on the moon's orientation on/off. The third button is for moon's metrics visualization (subsolar point, subearth point and pole position angle).");
        addHotspotAndExplanation('86%', '48%',  3, 'Time Control', "This panel allows you to control time. The play button plays/pauses time as well as reset time back to the current time. The slider allows you to change the speed of time. The faster the speed, the faster time changes.");

        ActivateHotspots();
    }

    
}

// Example usage:

function make_pages(funcs){
    funcs[0]();
    const dotsContainer = document.getElementById('dots-container');
    for (let i = 0; i < funcs.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => set_dot(i,funcs[i]));
        dotsContainer.appendChild(dot);
    }
}

function set_dot(index,func){
    document.querySelectorAll('.dot').forEach((dot, i) => {
    if (i === index) {
        clearHotspotsAndExplanations();
        dot.classList.add('active');
        func();
    } else {
        dot.classList.remove('active');
    }
    });
}

function addControlGuide(title, instructions) {
    // Create the Control-Guide container
    const controlGuide = document.createElement('div');
    controlGuide.className = 'Control-Guide';

    // Add the title
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    controlGuide.appendChild(titleElement);

    // Add the instructions as a list
    const instructionList = document.createElement('ul');
    instructionList.className = 'tips-list';
    instructions.forEach(instruction => {
        const listItem = document.createElement('li');
        listItem.textContent = instruction;
        instructionList.appendChild(listItem);
    });
    controlGuide.appendChild(instructionList);

    const guideContainer = document.querySelector('.image-section');
    if (guideContainer) {
        guideContainer.appendChild(controlGuide);
    } else {
        console.error('No element with class "image-section" found.');
    }
}
