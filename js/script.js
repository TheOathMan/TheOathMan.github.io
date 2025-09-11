
document.querySelectorAll('nav .dropdown-menu a').forEach(link => {
  link.addEventListener('click', (e) => {
    // console.log(`Link clicked: ${link.getAttribute('href')}`);
    if(!link.hash) { // Check if it's not an anchor link (#)
      e.preventDefault();
      const page = link.getAttribute('href');
      loadPage("pages/template.html",page);
    //   history.pushState({ page }, '', page);
    }
  });
});

function loadPage(page,tag,pushhistory=true) {
  fetch(page)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const section = doc.querySelector('.section');
      section.id=tag
      const sectionId = section ? section.id : null;
      document.querySelector('.section').innerHTML = section.innerHTML;

             // Add the section ID as a query parameter to the URL
      closeDropdowns();
      if (sectionId) {
        const newUrl = `${location.pathname}?app=${sectionId}`;
        if (pushhistory) 
          history.pushState({ page }, '', newUrl);
        process_tokens();
      }
      
        
    });
}


// // Handle browser back/forward
window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('app')){
      const appId = urlParams.get('app');
      loadPage("pages/template.html",appId,false)
    }
    else if(!window.location.hash)
      window.location.href = 'index.html'

    console.log('im not supposed to be here:'+window.location);
});


// // Handle browser reload
document.addEventListener('DOMContentLoaded', () => {
  // loadPage(location.pathname);
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('app')){
    const appId = urlParams.get('app');
    loadPage("pages/template.html",appId,false);
    // console.log('im not supposed to be here');
  }
  console.log('Document loaded, loading initial page...'+urlParams);
});


document.querySelectorAll('nav ul li.dropdown').forEach(link => {
  link.addEventListener('click', function(e) {
    closeDropdowns();
    console.log(e);    
    
    const dropdownMenu = this.querySelector('.dropdown-menu');
    if (dropdownMenu) 
      dropdownMenu.classList.toggle('open');
    
      // Stop event from bubbling up to document
    e.stopPropagation();
    e.preventDefault();
  });
});

function closeDropdowns() {
  document.querySelectorAll('nav ul li.dropdown .dropdown-menu.open').forEach(menu => {
    menu.classList.remove('open');
  });
}

document.addEventListener('click', function(e) {
    closeDropdowns();
});



//------------------- Process Tokens -------------------
// Process tokens and load app data based on URL parameters

function process_tokens() {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('app');
    console.log(`App ID from URL: ${appId}`);
    // Fallback if no app is specified
    if (!appId || !APPS[appId]) {
    document.querySelector('.app-content').innerHTML = `
        <div class="container">
        <h2>App not found</h2>
        <p>Try visiting <a href="?app=earthpi">?app=earthpi</a> or <a href="?app=moon">?app=moon</a>.</p>
        </div>
    `;
    exit;
    }

    const app = APPS[appId];
    console.log(`Loading app: ${app.name} (${appId})`);
    // Fill in the content
    document.getElementById('app-name').textContent = app.name;
    document.getElementById('short-name').textContent = app.name;
    document.getElementById('short-name-2').textContent = app.name;
    document.getElementById('short-name-3').textContent = app.name;
    document.getElementById('app-tagline').textContent = app.tagline;
    document.getElementById('app-intro').textContent = app.intro;
    document.getElementById('app-pic').src = app.pic;
    if(app.onWeb == false) {
      document.getElementById('web-link').style.display = 'none';
    }

    // Fill features
    const featureList = document.getElementById('feature-list');
    featureList.innerHTML = '';
    app.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = `${feature}`;
      featureList.appendChild(li);
    });

    // Fill steps
    // const stepsList = document.getElementById('steps-list');
    // stepsList.innerHTML = '';
    // app.steps.forEach(step => {
    //   const li = document.createElement('li');
    //   li.textContent = step;
    //   stepsList.appendChild(li);
    // });
    // document.getElementById('guide-pic1').src = app.guidePics[0];
    
    fetch(app.guide_html)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const guide = doc.getElementById("GuideContainer");
        const howToElement = document.getElementById("how-to");

        if (guide && howToElement) {
          // Clear the existing content of "how-to" if needed
          // howToElement.innerHTML = '';
          // Append the entire GuideContainer element
          howToElement.appendChild(guide);
          const script = document.createElement('script');
          script.src = '/guide/guide.js';
          script.onload = () => {
        // Call the loadGuide function after the script is loaded
            if (typeof PopulateHotspots === 'function') {
              PopulateHotspots(appId);
            } else {
              console.error("loadGuide function is not defined in /guide/guide.js");
            }
        };
          document.body.appendChild(script);
        }
      });
    // document.getElementById('guide-pic2').src = app.guidePics[0];



    // Fill download links
    document.getElementById('android-link').href = app.downloadAndroid;
    document.getElementById('ios-link').href = app.downloadIOS;

    // Version
    document.getElementById('version-info').textContent = 
    `Version ${app.version} • Updated ${app.updated}`;
}


//------------------- Apps Data -------------------

const APPS = {
  flatearth: {
  name: "Flat Earth",
  tagline: "Flat Earth App.",
  pic:"pics/Flat Earth.png",
  intro: "Flat Earth is an application that display Sun, moon ,earth and other celestial bodies real time at any date and time on a simple geocentric presentation.",
  features: [
    "View real-time 3D renderings of Sun, Earth, and Moon phases.", 
    "See the real-time overhead positions of the Sun, Moon, Venus, and other planets.", 
    "Track the Moon's accurate size and orbit (Lunar Perigee and Apogee).", 
    "Use an on-screen compass to find the current sky position for all celestial bodies.", 
    "View altitude, azimuth, and zenith data for any body at any time.", 
    "See a visualization of daylight coverage on Earth and the cycle of seasons for any time.", 
    "Get rise and set times for the Sun, Moon, and planets for any location on Earth.", 
    "Function in all time zones without an internet connection.", 
    "View Moon libration and orientation for any date, time, and location.", 
    "Access a weather forecast layer with a time controller.", 
    "Explore unlimited Sun, Earth, and Moon data for any date in the past or future.", 
    "See a calendar of lunar events (phases, apogee, perigee) for any year.", 
    "Take and share high-resolution screenshots.", 
    "Set custom notifications for specific celestial events.", 
    "Run the app as a live wallpaper."],
    // instructin:["hello there"," do this"],
  // guidePics:[
  //   "pics/guideFE1.png"
  // ],
  // steps: [
  //   "Download and install",
  //   "Open the app",
  //   "Set your daily goal",
  //   "Tap to log each glass"
  // ],
  guide_html: "/guide/guide.html",
  downloadAndroid: "https://play.google.com/store/apps/details?id=com.OProjects.FLS&hl=en",
  downloadIOS: "https://apps.apple.com/app/flat-earth-pro/id1664580677?uo=4",
  version: "2.2.1",
  updated: "July 2025",
  onWeb:false
},
  earthpi: {
    name: "EarthPi",
    tagline: "Stay hydrated with gentle reminders.",
    pic:"pics/Earthpi.png",
    intro: "EarthPi is a an educational app designed to provide users with a detailed and interactive way to explore Earth through various map projections. The app allow users to study and visualize Earth from multiple perspectives.",
    features: [
      "Variety of Earth Projections: Choose from a variety of earth map projections.",
      "Smooth Projection Transitions: Switch between projections seamlessly with fluid animations.",
      "Time Control: Adjust the time to observe the dynamic interaction of sunlight with Earth’s surface across all projections.",
      "Celestial Tracking: View the real-time positions of our solar system's celestial bodies based on any selected time instance.",
      "Live Wallpaper: Set any projection as a live wallpaper on Android devices.",
      "Screenshot: Capture and save images of any projection for further use or sharing."
    ],
    guide_html: "/guide/guide.html",
    // guidePics:[
    //   "pics/guideEarthPi.png"
    // ],
    // steps: [
    //   "This is the time Widget to show the current app time. Changing time from the time controller panel will update this time widget. Press the Widget to open date/time picker. Also once time has changed, a rest button will appear next to the Widget to reset time back to current time.",
    //   "These are the side toggle buttons to change projection's visual settings. The sun button toggles sunlight on/off. The grid button toggles latitude/longitude grid on/off. The circles button toggles tissot's indicatrix on/off. The location button toggles location marker on/off.",
    //   "The sun position on the map (or any other celestial body) indicates their real time zenith (overhead) position over earth relative to the selected time.",
    //   "These are the main menu bottoms. From left to right: the tools looking button is for additional features, time button is for showing time control panel, the projection button is for showing projections picker panel, then the projection preset button to change/customize projection settings, and finally the settings button for app settings.",
    // ],
    downloadAndroid: "https://play.google.com/store/apps/details?id=com.oproject.earthpi&hl=en",
    downloadIOS: "https://apps.apple.com/app/earthpi/id6741358020?uo=4",
    version: "1.0.4",
    updated: "Aug 2025",
    onWeb:true
  },
  moon: {
  name: "The Moon",
  tagline: "watch the moon.",
  pic:"pics/The Moon.png",
  intro: "The Moon App displays accurate, real-time data and visualizations of the Moon's phases, position, and orbital details.",
  features: [
    "Render the Moon's current phase, libration, and orbit (apogee/perigee) in real-time.",
    "Control time with a slider to animate the Moon's motion or jump to a specific date and time.",
    "View a highly realistic and accurate depiction of the Moon's behavior with an intuitive interface.",
    "Display a calendar of moon phases (full, new, quarter) for any year with precise times.",
    "Jump to any lunar event (phases, max declination, apogee, perigee) from the calendar.",
    "Set the current Moon phase as a live wallpaper on Android, with minimal battery usage.",
    "View the Moon's current subpoint (overhead position) on an interactive Earth map.",
    "Select a location on the map to see the Moon's parallactic angle from that specific viewpoint."
],
  // guidePics:[
  //   "pics/guideTheMoon.png"
  // ],
  // steps: [
  //   "Download and install",
  //   "Open the app",
  //   "Set your daily goal",
  //   "Tap to log each glass"
  // ],
  guide_html: "/guide/guide.html",
  downloadAndroid: "https://play.google.com/store/apps/details?id=com.oproject.themoon&hl=en",
  downloadIOS: "https://apps.apple.com/app/the-moon-simulation/id6526486262?uo=4",
  version: "1.0.5",
  updated: "July 2025",
  onWeb:false
}
};