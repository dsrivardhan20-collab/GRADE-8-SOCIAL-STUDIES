/* ==========================================================================
   JAVASCRIPT CORE ENGINE: Srivardhan Chapters 1-10 Learning Platform
   ========================================================================== */

// Global App State
let activeChapterIdx = 0; // 0 to 9
let activeTopicIdx = 0;   // Always 0 (1 main topic per chapter)
let activeTab = "read";
let watchSubMode = "animation"; 
let watchAnimationId = null;
let activeExploreAnimationId = null;

let quizTimerInterval = null;
let examTimerInterval = null;
let currentQuizQuestionIdx = 0;
let quizAnswers = Array(5).fill(null);
let quizSecondsElapsed = 0;

let currentExamQIdx = 0;
let examAnswers = [];
let examSecondsRemaining = 1200; // 20 minutes
let examQuestionsList = [];

// User Progress Structure
let userProgress = {
    studentName: "",
    completedChapters: {}, // maps "chapIdx" -> boolean
    examHighScores: {}     // maps "exam" -> score
};

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem("srivardhan_scert_multichap_progress");
    if (saved) {
        try {
            userProgress = JSON.parse(saved);
        } catch(e) {
            console.error("Progress parsing failed", e);
        }
    }
}

function saveProgress() {
    localStorage.setItem("srivardhan_scert_multichap_progress", JSON.stringify(userProgress));
}

// Utility: Shuffle array in place
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* ==========================================================================
   THEMATIC DATABASE: Chapters 1 to 10 Syllabus
   ========================================================================== */
const syllabusData = [
    {
        chapterNum: 1,
        title: "Reading and Analysis of Maps",
        summary: "Introduction to historical cartography, coordinate systems, contours, and GIS.",
        description: "Master maps through the ages, coordinate grids, contour heights, and satellite GIS overlays.",
        topics: [
            {
                topicNum: 1,
                title: "Evolution of Maps and Contour Lines",
                youtubeId: "32Y2V23t6V0", 
                explanation: `
                    <h3>1. Ancient Beginnings & Sumerian Clay Tablets</h3>
                    <p>The story of mapmaking begins thousands of years ago with the oldest known maps <span class="underlined-concept">engraved on Sumerian clay tablets</span> around 4,000 years ago. These early cartographers created drawings to record <span class="keyword-tooltip" data-tooltip="Temple estates and land holdings that were surveyed and mapped for taxation.">temple land ownership</span>. These tablets were baked hard in the sun to preserve local agricultural borders.</p>

                    <h3>2. Greek Coordinate Grids & Ptolemy</h3>
                    <p>The ancient <strong>Greeks</strong>, particularly geographers like Anaximander and Hecataeus, laid the mathematical foundation of geography by dividing the known world into three continents: Europe, Asia, and Libya. The famous Greco-Egyptian mathematician <strong>Ptolemy</strong> introduced the system of <span class="underlined-concept">latitudes and longitudes</span>, allowing cartographers to locate points on a coordinate grid.</p>

                    <h3>3. Medieval Map Orientations</h3>
                    <p>During the Middle Ages, map orientations varied based on cultural perspectives. The medieval Arab scholar <strong>Al-Idrisi</strong> drew a detailed world map in 1154 AD that placed <span class="underlined-concept">South at the top of the map</span>. In contrast, European medieval cartographers drew <strong>T-O maps</strong> that placed <span class="underlined-concept">East (and Jerusalem) at the top</span>, associating the East with the Garden of Eden.</p>

                    <h3>4. Elevation and Contour Lines</h3>
                    <p>To represent three-dimensional elevations on flat paper, geographers developed <strong>contour lines</strong>. A contour line is an <span class="keyword-tooltip" data-tooltip="An isoline is a map line connecting points that share the exact same measured value, like height or heat.">isoline</span> that connects all locations on a map that share the exact same height above sea level. When contour lines are drawn close together, it indicates a steep slope. When they are spaced far apart, it represents a gentle slope.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>engraved on Sumerian clay tablets</strong>: Wet clay blocks were carved with sharp reeds to record land boundaries, then sun-baked to make permanent, unalterable tax records.</li>
                            <li><strong>latitudes and longitudes</strong>: Imaginary horizontal and vertical coordinate lines that intersect to pinpoint locations anywhere on Earth's sphere.</li>
                            <li><strong>South at the top of the map</strong>: Islamic cartographers placed South at the top so the Arabian Peninsula and Mecca would be positioned towards the upper half of the map.</li>
                            <li><strong>East (and Jerusalem) at the top</strong>: Christian mapmakers oriented T-O maps with East on top because they believed the Garden of Eden lay in the East.</li>
                        </ul>
                    </div>

                    <div class="comparison-card">
                        <h4><i class="fa-solid fa-code-compare"></i> Map Orientations: Al-Idrisi vs. European T-O Maps</h4>
                        <div class="table-responsive">
                            <table class="comp-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Al-Idrisi Map (1154 AD)</th>
                                        <th>European T-O Maps (Medieval)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Top Direction</strong></td>
                                        <td>South is placed at the top.</td>
                                        <td>East is placed at the top.</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Centerpoint</strong></td>
                                        <td>Arabian Peninsula.</td>
                                        <td>Jerusalem (religious center).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: Steep vs. Gentle Slopes</div>
                        <div class="vs-content">
                            A <span class="vs-highlight">Steep Slope</span> is represented by tightly packed contour lines because elevation rises rapidly over a short distance, whereas a <span class="vs-highlight">Gentle Slope</span> is shown by widely spaced contour lines.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 2: Understanding</span></div>
                            <div class="blooms-q-text">Why can contour lines never cross or branch on a topographic map?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Because a single point on Earth's surface cannot have two different elevations at the same time.</div>
                        </div>
                    </div>
                `,
                remember: "Sumerians made the oldest clay boundary maps, but Greek scholars developed coordinates, and modern cartography uses satellite GIS overlays.",
                vocab: [
                    { word: "Cartography", meaning: "The scientific art of drawing and analyzing maps." },
                    { word: "Contour Line", meaning: "A line on a map connecting points of equal height above sea level." },
                    { word: "Isoline", meaning: "A line connecting points experiencing equal values of a specific measure." },
                    { word: "GIS", meaning: "Geographic Information System—software that overlays digital map layers." },
                    { word: "T-O Map", meaning: "Medieval European maps shaping Asia, Europe, and Africa with Jerusalem at the center." }
                ],
                summary: [
                    "Sumerians engraved the oldest known boundary maps on clay tablets 4,000 years ago.",
                    "Ptolemy introduced coordinate lines of latitude and longitude for location mapping.",
                    "Al-Idrisi drew a detailed world map with South oriented at the top.",
                    "Contour lines connect points of equal elevation and never cross each other.",
                    "Modern GIS maps stack data layers (elevation, roads, population) for spatial planning."
                ],
                funFact: "Ancient mapmakers often drew sea monsters in blank ocean sections to warn sailors of dangerous currents!",
                realLife: "Telangana state administrators use GIS map layers to monitor forest reserves and water pipelines in rural zones.",
                quiz: [
                    {
                        q: "Who were the earliest recorded mapmakers in history?",
                        options: ["Babylonians", "Sumerians", "Greeks", "Romans"],
                        correct: 1,
                        exp: "Sumerians engraved the oldest maps on clay tablets 4,000 years ago to record temple land borders."
                    },
                    {
                        q: "What direction was placed at the top of medieval T-O maps?",
                        options: ["North", "South", "East", "West"],
                        correct: 2,
                        exp: "T-O maps placed East at the top, associating it with the location of the biblical Garden of Eden."
                    },
                    {
                        q: "Which cartographer introduced the coordinate grid system of latitude and longitude?",
                        options: ["Anaximander", "Al-Idrisi", "Ptolemy", "Gerardus Mercator"],
                        correct: 2,
                        exp: "Ptolemy introduced coordinates (latitudes and longitudes) to plot places accurately on maps."
                    },
                    {
                        q: "What terrain slope is represented by closely spaced contour lines?",
                        options: ["Flat Plain", "Gentle Slope", "Steep Slope", "River Valley"],
                        correct: 2,
                        exp: "Closely spaced contours indicate that height changes rapidly, showing a steep slope or cliff."
                    },
                    {
                        q: "What does GIS stand for in modern geography?",
                        options: ["Global Internet Source", "Geographic Information System", "Geological Image Sensor", "General Industrial Survey"],
                        correct: 1,
                        exp: "GIS stands for Geographic Information System, which organizes data into stackable digital map layers."
                    }
                ],
                flashcards: [
                    { q: "What is cartography?", a: "The science and art of drawing maps." },
                    { q: "Who made the earliest clay maps?", a: "The Sumerians, around 4,000 years ago for temple land records." },
                    { q: "What top direction did Al-Idrisi use?", a: "South, placing the Arabian Peninsula at the top." },
                    { q: "What is a contour line?", a: "A line connecting points of equal height above sea level." },
                    { q: "Can contour lines cross?", a: "No, because a single coordinate cannot have two heights at once." }
                ]
            }
        ]
    },
    {
        chapterNum: 2,
        title: "Energy from the Sun",
        summary: "Study of solar radiation, insolation, temperature zones, and seasonal heating differences.",
        description: "Explore solar insolation, earth's curve, and why temperatures vary from the Equator to the Poles.",
        topics: [
            {
                topicNum: 1,
                title: "Solar Insolation and Temperature Zones",
                youtubeId: "kIID5FDi2JQ",
                explanation: `
                    <h3>1. Solar Radiation and Insolation</h3>
                    <p>The Sun constantly emits energy in the form of electromagnetic waves, known as <strong>solar radiation</strong>. The portion of this solar energy that actually reaches the surface of the Earth is called <span class="underlined-concept">insolation</span> (Incoming Solar Radiation).</p>

                    <h3>2. The Angle of Incidence & Earth's Curve</h3>
                    <p>Because the Earth is a sphere, solar rays hit the surface at different angles. Near the Equator, the Sun's rays strike vertically at a <span class="underlined-concept">90-degree angle of incidence</span>, focusing intense energy over a small area. Near the poles, the rays hit at a slant, spreading the same amount of heat over a much larger area, which results in colder temperatures.</p>

                    <h3>3. Global Temperature Zones</h3>
                    <p>Due to unequal insolation, the Earth is divided into three distinct thermal zones: the <strong>Torrid Zone</strong> (hot, near Equator), the <strong>Temperate Zone</strong> (moderate heating), and the <strong>Frigid Zone</strong> (permanently cold, near the poles).</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>insolation</strong>: The measured quantity of solar energy intercepted by a unit area of Earth's surface over a given time.</li>
                            <li><strong>90-degree angle of incidence</strong>: Straight vertical rays that pass through less atmosphere and concentrate their thermal energy on a narrow surface.</li>
                        </ul>
                    </div>

                    <div class="comparison-card">
                        <h4><i class="fa-solid fa-code-compare"></i> Sample Comparison: Vertical vs. Slanted</h4>
                        <div class="table-responsive">
                            <table class="comp-table">
                                <thead>
                                    <tr>
                                        <th>Ray Type</th>
                                        <th>Angle of Incidence</th>
                                        <th>Atmospheric Path</th>
                                        <th>Heating Intensity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Vertical Rays</strong></td>
                                        <td>90° (Direct)</td>
                                        <td>Short path (less scattering)</td>
                                        <td>Very High (concentrated)</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Slanted Rays</strong></td>
                                        <td>Low angle (Slanted)</td>
                                        <td>Long path (more scattering)</td>
                                        <td>Low (spread out)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 4: Analyzing</span></div>
                            <div class="blooms-q-text">Why does land heat up and cool down much faster than deep ocean waters?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Land is solid and absorbs heat only on the surface, while water is fluid, allows heat to circulate deeply, and evaporates to dissipate heat.</div>
                        </div>
                    </div>
                `,
                remember: "Direct vertical rays near the Equator cause intense heating, while slanted rays near the poles cause cold climates.",
                vocab: [
                    { word: "Insolation", meaning: "Incoming solar radiation intercepted by the Earth." },
                    { word: "Radiation", meaning: "Transmission of energy in the form of waves or particles." },
                    { word: "Angle of Incidence", meaning: "The angle at which the Sun's rays strike the Earth's surface." },
                    { word: "Torrid Zone", meaning: "The hot region of Earth surrounding the Equator between the tropics." },
                    { word: "Convection", meaning: "Heat transfer in fluids or gases through the movement of heated particles." }
                ],
                summary: [
                    "Solar radiation is the energy emitted by the Sun, while insolation is the heat reaching Earth.",
                    "Earth's spherical shape causes sunlight to strike at vertical or slanted angles.",
                    "Vertical rays cover less area and heat more intensely than slanted rays.",
                    "The Equator receives the highest annual insolation, while polar regions receive the least.",
                    "Thermal zones classify Earth into hot Torrid, moderate Temperate, and frozen Frigid belts."
                ],
                funFact: "The sand in deserts can reach over 70°C during the day, but can drop close to freezing at night because dry sand cannot hold heat!",
                realLife: "Solar panels are installed at a tilt angle matching the local latitude to maximize the vertical angle of incidence of solar rays.",
                quiz: [
                    {
                        q: "What is the term for the solar energy that reaches the Earth's surface?",
                        options: ["Outflow", "Insolation", "Refraction", "Convection"],
                        correct: 1,
                        exp: "Insolation stands for Incoming Solar Radiation, which is the heat intercepted by Earth."
                    },
                    {
                        q: "Why do polar regions receive less heat than equatorial regions?",
                        options: ["They are further from the Sun", "Sun rays strike at a slanted angle", "They have more mountains", "The wind is stronger there"],
                        correct: 1,
                        exp: "At the poles, the spherical curve forces rays to strike at a slanted angle, spreading heat over a larger area."
                    },
                    {
                        q: "Which ray type has the shortest path through the atmosphere?",
                        options: ["Vertical Rays", "Slanted Rays", "Horizontal Rays", "Reflected Rays"],
                        correct: 0,
                        exp: "Vertical rays (90°) pass directly downward, traveling the shortest distance through the scattering atmosphere."
                    },
                    {
                        q: "Which thermal zone contains the hottest climates on Earth?",
                        options: ["Frigid Zone", "Temperate Zone", "Torrid Zone", "Polar Zone"],
                        correct: 2,
                        exp: "The Torrid Zone, located near the Equator, receives direct vertical solar rays year-round, making it the hottest."
                    },
                    {
                        q: "What happens to solar radiation that is bounced back into space without heating Earth?",
                        options: ["Insolation", "Absorption", "Albedo (Reflection)", "Conduction"],
                        correct: 2,
                        exp: "Albedo is the measure of solar reflection, where rays bounce off clouds, ice, or dust without heating the ground."
                    }
                ],
                flashcards: [
                    { q: "What is insolation?", a: "Incoming Solar Radiation reaching the Earth." },
                    { q: "What is the angle of incidence?", a: "The angle at which the Sun's rays strike the ground." },
                    { q: "Where does the Sun strike at 90 degrees?", a: "Near the Equator, causing maximum concentrated heat." },
                    { q: "Name the three thermal zones.", a: "Torrid (hot), Temperate (moderate), and Frigid (cold)." },
                    { q: "Why is snow highly reflective?", a: "Clean snow has a high albedo, reflecting up to 90% of solar radiation." }
                ]
            }
        ]
    },
    {
        chapterNum: 3,
        title: "Earth Movements and Seasons",
        summary: "Analysis of Earth's rotation, tilted orbit, solstices, and equinoxes that generate seasons.",
        description: "Learn how the Earth's 23.5-degree axial tilt and annual orbit create the seasons.",
        topics: [
            {
                topicNum: 1,
                title: "Axial Tilt and Solstices",
                youtubeId: "vVqC3u2S7hU",
                explanation: `
                    <h3>1. Rotation and Revolution</h3>
                    <p>The Earth exhibits two primary movements. <strong>Rotation</strong> is the spinning of Earth on its axis once every 24 hours, causing day and night. <strong>Revolution</strong> is the orbit of Earth around the Sun once every 365.25 days, which outlines our calendar year.</p>

                    <h3>2. The Tilted Axis</h3>
                    <p>Crucially, the Earth's axis of rotation is <span class="underlined-concept">tilted at an angle of 23.5 degrees</span> relative to its orbital plane. This tilt remains pointed in the same direction in space (Polaris) as Earth orbits the Sun, a phenomenon called axis parallelism.</p>

                    <h3>3. Solstices and Equinoxes</h3>
                    <p>As a result of this tilt, different hemispheres lean toward the Sun at different points in the orbit. During the <strong>Summer Solstice</strong> (June 21), the Northern Hemisphere tilts toward the Sun, causing the longest day of the year. During the <strong>Winter Solstice</strong> (December 21), it tilts away. During the <strong>Equinoxes</strong> (March 21 and September 23), <span class="underlined-concept">neither hemisphere tilts toward the Sun</span>, resulting in equal 12-hour day and night everywhere.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>tilted at an angle of 23.5 degrees</strong>: Earth's rotational axis is not perpendicular, but leans, meaning one hemisphere receives more sunlight than the other for half of the orbit.</li>
                            <li><strong>neither hemisphere tilts toward the Sun</strong>: The tilt is sideways relative to the Sun, aligning the solar rays directly above the Equator.</li>
                        </ul>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: Rotation vs. Revolution</div>
                        <div class="vs-content">
                            <span class="vs-highlight">Rotation</span> is the Earth spinning on its own axis, creating the 24-hour day/night cycle, whereas <span class="vs-highlight">Revolution</span> is the Earth orbiting around the Sun, which takes 365.25 days and creates the seasonal calendar.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 5: Evaluating</span></div>
                            <div class="blooms-q-text">What would happen to the seasons if Earth's axis had zero tilt?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> There would be no seasons. Every location would experience the same climate and equal 12-hour days and nights all year round.</div>
                        </div>
                    </div>
                `,
                remember: "Earth's 23.5° tilt causes the Northern and Southern hemispheres to experience opposite seasons as Earth orbits the Sun.",
                vocab: [
                    { word: "Rotation", meaning: "The spinning of the Earth on its axis once every 24 hours." },
                    { word: "Revolution", meaning: "The movement of Earth around the Sun taking 365.25 days." },
                    { word: "Solstice", meaning: "The two points in orbit when the Sun is furthest north or south of the Equator." },
                    { word: "Equinox", meaning: "The two days in the year when day and night are equal everywhere on Earth." },
                    { word: "Orbit", meaning: "The elliptical path followed by Earth around the Sun." }
                ],
                summary: [
                    "Earth's rotation on its axis causes day and night cycles every 24 hours.",
                    "Earth revolves around the Sun in an elliptical orbit once a year.",
                    "The axis is tilted at 23.5 degrees, pointing towards the North Star.",
                    "Solstices mark the peak of summer and winter when one hemisphere leans closest to the Sun.",
                    "Equinoxes occur in spring and autumn when the Sun shines directly on the Equator."
                ],
                funFact: "Because the Northern and Southern hemispheres lean in opposite directions, Christmas occurs in the middle of summer in Australia!",
                realLife: "Farming cycles in India, like the Kharif and Rabi crops, are directly aligned with the solar seasons and monsoons.",
                quiz: [
                    {
                        q: "What causes the daily cycle of day and night?",
                        options: ["Earth's Orbit", "Earth's Rotation", "Earth's Revolution", "The Sun's Rotation"],
                        correct: 1,
                        exp: "Earth's rotation (spinning on its axis once every 24 hours) causes different parts of the globe to face the Sun."
                    },
                    {
                        q: "At what angle is the Earth's axis tilted?",
                        options: ["0 degrees", "23.5 degrees", "45 degrees", "90 degrees"],
                        correct: 1,
                        exp: "The Earth's axis of rotation is tilted at 23.5 degrees relative to its orbital plane."
                    },
                    {
                        q: "On what day does the Northern Hemisphere experience its longest day (Summer Solstice)?",
                        options: ["March 21", "June 21", "September 23", "December 21"],
                        correct: 1,
                        exp: "On June 21, the Northern Hemisphere tilts closest to the Sun, experiencing the longest day."
                    },
                    {
                        q: "What is true about the Equinox?",
                        options: ["Day is longer than night", "Night is longer than day", "Day and night are equal everywhere", "It only happens at the poles"],
                        correct: 2,
                        exp: "During the equinox, the Sun is directly over the Equator, making day and night equal (12 hours) globally."
                    },
                    {
                        q: "How long does it take for Earth to complete one full revolution around the sun?",
                        options: ["24 hours", "30 days", "365.25 days", "10 years"],
                        correct: 2,
                        exp: "Earth takes 365 days and 6 hours (365.25 days) to revolve around the Sun, forming our calendar year."
                    }
                ],
                flashcards: [
                    { q: "What causes day and night?", a: "Earth spinning on its axis (rotation)." },
                    { q: "What is the angle of Earth's tilt?", a: "23.5 degrees." },
                    { q: "What does equinox mean?", a: "Equal night (day and night are equal to 12 hours everywhere)." },
                    { q: "When is the Winter Solstice in the North?", a: "December 21, when the Northern hemisphere tilts away from the Sun." },
                    { q: "Why is there a leap year?", a: "To account for the extra 6 hours (.25 day) of orbit each year, adding a day every 4 years." }
                ]
            }
        ]
    },
    {
        chapterNum: 4,
        title: "The Polar Regions",
        summary: "Introduction to the Tundra, cold climates, midnight sun, and the lifestyles of the Eskimos.",
        description: "Study the freezing Tundra biome, the Midnight Sun phenomenon, and polar survival strategies.",
        topics: [
            {
                topicNum: 1,
                title: "The Tundra and Polar Livelihoods",
                youtubeId: "pvw5ZM1OKcY",
                explanation: `
                    <h3>1. The Tundra Biome</h3>
                    <p>The regions surrounding the North Pole are known as the <strong>Tundra</strong>. This biome is characterized by an extremely cold climate, minimal precipitation, and a permanently frozen subsoil layer called <span class="underlined-concept">permafrost</span>. Tree growth is impossible due to the freezing cold, leaving only moss, lichens, and small shrubs.</p>

                    <h3>2. The Midnight Sun & Polar Darkness</h3>
                    <p>Because of Earth's tilt, the polar regions experience extreme light conditions. During summer, the sun never sets for several months, a phenomenon known as the <span class="underlined-concept">Midnight Sun</span>. Conversely, in winter, the sun never rises above the horizon, leaving the region in constant freezing darkness.</p>

                    <h3>3. The Eskimos (Inuit & Yupik)</h3>
                    <p>Human survival in the Tundra is represented by the <strong>Eskimos</strong>, consisting of the Inuit and Yupik groups. Traditionally, they survived by hunting seals, walruses, and caribou, living in temporary snow houses called <strong>igloos</strong> during winter hunting trips, and tents made of animal skins in the summer.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>permafrost</strong>: A thick subsurface layer of soil that remains frozen solid throughout the entire year, preventing plant roots from digging deep.</li>
                            <li><strong>Midnight Sun</strong>: A natural occurrence where the Sun remains visible at local midnight because the pole is tilted fully towards the Sun.</li>
                        </ul>
                    </div>

                    <div class="comparison-card">
                        <h4><i class="fa-solid fa-code-compare"></i> Seasons: Tundra Winter vs. Tundra Summer</h4>
                        <div class="table-responsive">
                            <table class="comp-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Tundra Winter</th>
                                        <th>Tundra Summer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Daylight</strong></td>
                                        <td>24 Hours of Darkness</td>
                                        <td>24 Hours of Light (Midnight Sun)</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Shelters</strong></td>
                                        <td>Igloos (snow blocks) or sod houses</td>
                                        <td>Tupiks (animal skin tents)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 3: Applying</span></div>
                            <div class="blooms-q-text">How do modern technologies affect the traditional hunting and travel practices of the Inuit?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Snowmobiles and motorboats have replaced dog sleds and kayaks, speeding up travel but increasing dependency on fuel and imports.</div>
                        </div>
                    </div>
                `,
                remember: "The Tundra has a frozen permafrost layer, experiences months of constant daylight or darkness, and is home to the Inuit people.",
                vocab: [
                    { word: "Tundra", meaning: "A vast, flat, treeless Arctic region where the subsoil is permanently frozen." },
                    { word: "Permafrost", meaning: "Permanently frozen ground beneath the Earth's surface in polar zones." },
                    { word: "Midnight Sun", meaning: "The continuous 24-hour daylight experienced in summer in polar circles." },
                    { word: "Igloo", meaning: "A dome-shaped winter dwelling built from blocks of hard-packed snow." },
                    { word: "Harpoon", meaning: "A barbed spear used by the Inuit to hunt seals and whales." }
                ],
                summary: [
                    "The Tundra is a freezing, treeless plain surrounding the North Pole.",
                    "Permafrost is the frozen subsoil that limits plant growth to mosses and lichens.",
                    "Summer brings continuous daylight (Midnight Sun), while winter brings complete darkness.",
                    "Eskimos are indigenous polar groups who adapted to live in these extreme climates.",
                    "Traditional Inuit hunted marine mammals and lived in igloos during winter cycles."
                ],
                funFact: "Igloos can be 40 degrees warmer inside than outside because compact snow acts as a highly efficient heat insulator, trapping body heat!",
                realLife: "Global warming is causing Arctic permafrost to melt, which collapses building foundations and releases ancient trapped carbon gases.",
                quiz: [
                    {
                        q: "What is the name of the permanently frozen subsoil layer in the Tundra?",
                        options: ["Glacier", "Iceberg", "Permafrost", "Silt"],
                        correct: 2,
                        exp: "Permafrost is the layer of soil that remains frozen solid for consecutive years in polar zones."
                    },
                    {
                        q: "Which phenomenon describes 24 hours of sun during the Arctic summer?",
                        options: ["Solar Flare", "Midnight Sun", "Aurora Borealis", "Polar Twilight"],
                        correct: 1,
                        exp: "The Midnight Sun is when the sun remains above the horizon even at midnight in summer circles."
                    },
                    {
                        q: "What name do the polar people use to refer to themselves instead of 'Eskimo'?",
                        options: ["Maori", "Inuit", "Sherpa", "Bedouin"],
                        correct: 1,
                        exp: "The term 'Inuit' (meaning 'the people') is preferred by the indigenous inhabitants of the Arctic regions."
                    },
                    {
                        q: "What is a traditional winter house made of snow blocks called?",
                        options: ["Tupik", "Igloo", "Yurt", "Wigwam"],
                        correct: 1,
                        exp: "An igloo is the traditional winter dome built from dense blocks of snow by Inuit hunters."
                    },
                    {
                        q: "Which animal was NOT traditionally hunted by the Inuit for survival?",
                        options: ["Seal", "Walrus", "Bengal Tiger", "Caribou"],
                        correct: 2,
                        exp: "Bengal Tigers are native to tropical Asian forests, whereas seals, walruses, and caribou are polar animals."
                    }
                ],
                flashcards: [
                    { q: "What is the Tundra?", a: "A cold, dry, treeless polar biome." },
                    { q: "What is permafrost?", a: "Permanently frozen subsoil that prevents tree roots from growing." },
                    { q: "What is the Midnight Sun?", a: "Constant 24-hour daylight during the polar summer." },
                    { q: "What is an igloo?", a: "A dome-shaped shelter built from blocks of frozen snow." },
                    { q: "What animal skin is used for summer tents?", a: "Caribou or seal skins, creating tents called tupiks." }
                ]
            }
        ]
    },
    {
        chapterNum: 5,
        title: "Forests: Using and Protecting Them",
        summary: "Analysis of forest types, evergreen vs deciduous trees, deforestation, and community conservation.",
        description: "Study tropical evergreen and deciduous forests, tribal rights, and state protection initiatives.",
        topics: [
            {
                topicNum: 1,
                title: "Forest Types and Conservation Laws",
                youtubeId: "vVqC3u2S7hU",
                explanation: `
                    <h3>1. Forest Classifications</h3>
                    <p>Forests are categorized by their climatic adaptations. <strong>Evergreen Forests</strong> remain green all year because trees shed leaves at different times. <strong>Deciduous Forests</strong> drop all their leaves in the dry season to prevent water loss through transpiration. <strong>Thorny Scrub Forests</strong> grow in dry regions, featuring deep roots and spikes to store moisture.</p>

                    <h3>2. Reserve and Protected Forests</h3>
                    <p>To control exploitation, governments classify forests. <span class="underlined-concept">Reserve Forests</span> are strictly controlled by the state; no logging or grazing is permitted. <span class="underlined-concept">Protected Forests</span> allow local communities to collect dry firewood and graze livestock, under strict state licensing rules.</p>

                    <h3>3. Forest Rights Act (2006)</h3>
                    <p>For decades, tribal groups (Adivasis) were treated as encroachers. In 2006, the Indian government passed the <strong>Forest Rights Act (FRA)</strong>, recognizing the land rights of forest-dwelling communities and allowing them to protect and manage their traditional forest boundaries.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>Reserve Forests</strong>: Forests set aside for environmental protection where public access and logging are completely banned.</li>
                            <li><strong>Protected Forests</strong>: State forests where local dwellers are granted limited rights to gather forest produce without destroying the canopy.</li>
                        </ul>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: Evergreen vs. Deciduous</div>
                        <div class="vs-content">
                            <span class="vs-highlight">Evergreen Forests</span> grow in heavy rainfall zones and keep their leaves year-round, whereas <span class="vs-highlight">Deciduous Forests</span> grow in moderate rainfall zones and shed all leaves in winter or dry months to conserve water.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 4: Analyzing</span></div>
                            <div class="blooms-q-text">Explain the dual role of forests in maintaining ecological balance and supporting local livelihoods.</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Forests clean the air, preserve soil, and absorb carbon while simultaneously providing wood, bamboo, fruits, and honey to tribal families.</div>
                        </div>
                    </div>
                `,
                remember: "Reserve forests are off-limits for public use, deciduous forests shed leaves in the dry season, and the 2006 FRA protects tribal land rights.",
                vocab: [
                    { word: "Deciduous", meaning: "Trees that shed their leaves annually during the dry season to prevent water loss." },
                    { word: "Reserve Forest", meaning: "State forest land where public entry and logging are completely prohibited." },
                    { word: "FRA 2006", meaning: "Forest Rights Act, securing land ownership rights for forest-dwelling tribes." },
                    { word: "Deforestation", meaning: "The clearing and cutting down of forest cover for farming or industry." },
                    { word: "Podu Agriculture", meaning: "A traditional form of shifting cultivation practiced by tribes on hill slopes." }
                ],
                summary: [
                    "Evergreen forests remain lush green all year, growing in high-rainfall belts.",
                    "Deciduous forests shed all leaves during the dry summer to conserve moisture.",
                    "Reserve forests are strictly protected, whereas protected forests allow limited community access.",
                    "Tribal groups have historically depended on forest products like honey, bamboo, and seeds.",
                    "The Forest Rights Act of 2006 returned land management rights to traditional tribes."
                ],
                funFact: "One mature tree can absorb over 22 kilograms of carbon dioxide every year, purifying the air for an entire household!",
                realLife: "The Telangana government runs the 'Haritha Haram' program, planting millions of trees to increase the state's green cover to 33%.",
                quiz: [
                    {
                        q: "Which forest type is characterized by trees that shed leaves during the dry season?",
                        options: ["Evergreen Forests", "Deciduous Forests", "Thorny Scrub Forests", "Coniferous Forests"],
                        correct: 1,
                        exp: "Deciduous trees shed leaves during dry months to minimize water loss through transpiration."
                    },
                    {
                        q: "In which forest classification is grazing and logging completely banned?",
                        options: ["Protected Forests", "Reserve Forests", "Private Forests", "Community Forests"],
                        correct: 1,
                        exp: "Reserve Forests are strictly protected by government departments, and logging and grazing are banned."
                    },
                    {
                        q: "In what year did the Indian Parliament pass the Forest Rights Act?",
                        options: ["1947", "1980", "2006", "2020"],
                        correct: 2,
                        exp: "The Forest Rights Act was passed in 2006 to recognize Adivasi land ownership."
                    },
                    {
                        q: "What is the traditional shifting cultivation practiced by tribes in Telangana called?",
                        options: ["Terracing", "Podu Agriculture", "Strip Farming", "Hydroponics"],
                        correct: 1,
                        exp: "Podu is the local name for slash-and-burn shifting cultivation on hill slopes."
                    },
                    {
                        q: "Which program was launched by the Telangana government to increase forest cover?",
                        options: ["Mission Kakatiya", "Arogyasri", "Telanganaku Haritha Haram", "Rythu Bandhu"],
                        correct: 2,
                        exp: "Telanganaku Haritha Haram is the state's afforestation program to plant saplings across Telangana."
                    }
                ],
                style: "afforestation",
                flashcards: [
                    { q: "What are evergreen forests?", a: "Rainy forests where trees keep green leaves all year." },
                    { q: "Why do deciduous trees shed leaves?", a: "To save water during dry seasons." },
                    { q: "What is a reserve forest?", a: "A government forest off-limits for public extraction." },
                    { q: "What is Podu?", a: "Shifting cultivation practiced by Adivasi tribes." },
                    { q: "What rights does the 2006 FRA secure?", a: "Land ownership rights for traditional forest tribes." }
                ]
            }
        ]
    },
    {
        chapterNum: 6,
        title: "Minerals and Mining",
        summary: "Understanding metallic/non-metallic ores, open-cast vs underground mining, and labor safety.",
        description: "Study mineral extraction methods, mineral ownership laws, and safety in coal mines.",
        topics: [
            {
                topicNum: 1,
                title: "Mineral Ores and Mining Methods",
                youtubeId: "32Y2V23t6V0",
                explanation: `
                    <h3>1. Ores and Minerals</h3>
                    <p>Minerals are naturally occurring inorganic substances. Rocks that contain a high concentration of a particular mineral are called <strong>ores</strong> (e.g. Iron ore, Bauxite, Coal). Minerals are divided into <strong>metallic</strong> (iron, copper) and <strong>non-metallic</strong> (mica, limestone).</p>

                    <h3>2. Mining Methods</h3>
                    <p>Minerals are extracted based on depth. <span class="underlined-concept">Open-cast mining</span> involves digging a wide, open pit near the surface to extract minerals. <span class="underlined-concept">Underground mining</span> requires drilling deep vertical shafts and tunnels to reach deep mineral seams, which is common in coal mines.</p>

                    <h3>3. Mineral Ownership & State Rights</h3>
                    <p>In India, all underground mineral resources belong to the government. Mining companies must pay a tax called a <strong>royalty</strong> to the state for every ton of minerals extracted.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>Open-cast mining</strong>: Surface extraction that creates giant stepped pits, destroying surface forests but keeping operations relatively safe.</li>
                            <li><strong>Underground mining</strong>: Shaft mining where workers labor in narrow, deep tunnels under risk of collapse and gas explosions.</li>
                        </ul>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: Open-cast vs. Underground Mining</div>
                        <div class="vs-content">
                            <span class="vs-highlight">Open-cast mining</span> is cheaper, safer, and done at the surface, leaving massive open craters, whereas <span class="vs-highlight">Underground mining</span> is expensive, hazardous, and goes deep beneath the Earth to retrieve resources.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 4: Analyzing</span></div>
                            <div class="blooms-q-text">Analyze the environmental impacts of surface mining compared to deep shaft mining.</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Surface mining clears topsoil and destroys forests, while shaft mining risks polluting groundwater and causing land subsidence.</div>
                        </div>
                    </div>
                `,
                remember: "Surface minerals are mined using open-cast pits, while deep coal seams are mined using shafts. Mineral royalties belong to the state.",
                vocab: [
                    { word: "Ore", meaning: "A natural rock deposit containing extractable metals or minerals." },
                    { word: "Open-cast Mining", meaning: "Surface mining that extracts mineral deposits from an open pit." },
                    { word: "Underground Mining", meaning: "Deep mining using vertical shafts and horizontal tunnels." },
                    { word: "Royalty", meaning: "Tax paid by mining companies to the government for extracting state minerals." },
                    { word: "SCCL", meaning: "Singareni Collieries Company Limited—Telangana's state-owned coal mining company." }
                ],
                summary: [
                    "Ores are mineral-bearing rocks extracted from the Earth's crust.",
                    "Minerals are classified into metallic elements and non-metallic resources.",
                    "Surface deposits are mined through wide open-cast pits.",
                    "Deep underground seams require vertical shafts and tunnels.",
                    "SCCL manages the major coal mining operations across the Godavari valley of Telangana."
                ],
                funFact: "Coal is actually the compressed remains of ancient swamp plants that grew over 300 million years ago, buried under mud and heated by Earth's crust!",
                realLife: "The electricity in our homes in Telangana is mostly generated by burning coal mined in Kothagudem by SCCL / Singareni workers.",
                quiz: [
                    {
                        q: "What is a rock that contains a high concentration of metallic minerals called?",
                        options: ["Lava", "Ore", "Sediment", "Fossil"],
                        correct: 1,
                        exp: "An ore is a rock containing enough mineral content to make mining economically viable."
                    },
                    {
                        q: "Which mining method creates a giant stepped pit open at the surface?",
                        options: ["Shaft Mining", "Drill Mining", "Open-cast Mining", "Underground Mining"],
                        correct: 2,
                        exp: "Open-cast mining digs out minerals directly from wide pits open to the sky."
                    },
                    {
                        q: "Who officially owns the minerals found beneath the ground in India?",
                        options: ["The landowner", "The local village panchayat", "The government", "The mining company"],
                        correct: 2,
                        exp: "Under Indian law, all sub-surface minerals are public property owned by the government."
                    },
                    {
                        q: "Which state-owned company operates coal mines in Telangana?",
                        options: ["Coal India Limited", "SCCL", "NTPC", "ONGC"],
                        correct: 1,
                        exp: "Singareni Collieries Company Limited (SCCL) is the public coal company of Telangana."
                    },
                    {
                        q: "What is the fee paid to the government by mining companies for mineral extraction?",
                        options: ["Subsidy", "Royalty", "Salary", "Custom Duty"],
                        correct: 1,
                        exp: "A royalty is a tax paid per ton of extracted mineral resources to the state government."
                    }
                ],
                flashcards: [
                    { q: "What is mineral ore?", a: "A rock containing valuable mineral deposits." },
                    { q: "What is open-cast mining?", a: "Digging minerals from an open pit at the surface." },
                    { q: "What is shaft mining?", a: "Underground mining using deep vertical shafts and tunnels." },
                    { q: "What is SCCL?", a: "Singareni Collieries, the major coal mining operator in Telangana." },
                    { q: "What is mining royalty?", a: "Tax paid to the government for extracting minerals." }
                ]
            }
        ]
    },
    {
        chapterNum: 7,
        title: "Money and Banking",
        summary: "Evolution of currency, barter exchanges, modern bank deposits, loans, and credit generation.",
        description: "Trace money from barter trade to digital coins, and explore how banks multiply credit.",
        topics: [
            {
                topicNum: 1,
                title: "Evolution of Money and Bank Credit",
                youtubeId: "kIID5FDi2JQ",
                explanation: `
                    <h3>1. The Barter System</h3>
                    <p>Before money, people used the <strong>barter system</strong>, directly exchanging goods for other goods (e.g. exchanging rice for cows). This required a <span class="underlined-concept">double coincidence of wants</span>—where both parties wanted what the other was offering, which was a rare occurrence.</p>

                    <h3>2. Evolution of Coinage</h3>
                    <p>To simplify trade, societies introduced money. First came commodity money (shells, salt), then precious metals (gold, silver coins), paper money (promissory notes), and finally, modern digital money. The <strong>Reserve Bank of India (RBI)</strong> regulates and issues all currency notes in India.</p>

                    <h3>3. Commercial Banking & Loans</h3>
                    <p>Banks act as intermediaries. They accept deposits from savers and pay them a small interest rate. They then lend this money to borrowers at a higher interest rate. The difference between these rates is the bank's profit, or spread. Through this process, banks generate <span class="underlined-concept">credit creation</span>.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>double coincidence of wants</strong>: The difficult requirement in barter where two traders must desire each other's specific products to complete an exchange.</li>
                            <li><strong>credit creation</strong>: The banking mechanism where a deposit is lent out repeatedly, generating new purchasing power across the economy.</li>
                        </ul>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: Barter vs. Monetary System</div>
                        <div class="vs-content">
                            The <span class="vs-highlight">Barter System</span> relies on directly swapping goods and requires a double coincidence of wants, while the <span class="vs-highlight">Monetary System</span> uses a standard medium of exchange (money) to buy any product instantly.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 4: Analyzing</span></div>
                            <div class="blooms-q-text">How does the RBI maintain trust in paper currency notes that have no intrinsic value?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> RBI prints a legal guarantee signed by the Governor, making it legal tender that everyone is legally required to accept for debts.</div>
                        </div>
                    </div>
                `,
                remember: "The barter system failed due to the double coincidence of wants. Banks accept deposits and multiply money through credit loans.",
                vocab: [
                    { word: "Barter System", meaning: "Direct exchange of goods for goods without using money." },
                    { word: "Double Coincidence", meaning: "When two trade partners desire each other's goods." },
                    { word: "RBI", meaning: "Reserve Bank of India—the central banking authority of India." },
                    { word: "Credit Creation", meaning: "The expansion of bank deposits through loan multiplication." },
                    { word: "Cheque", meaning: "A paper document instructing a bank to pay a specific amount from an account." }
                ],
                summary: [
                    "Barter trade required a double coincidence of wants, which made trading difficult.",
                    "Money evolved from commodity goods to precious metal coins and paper currency.",
                    "The Reserve Bank of India acts as the central bank that prints notes.",
                    "Commercial banks borrow from savers at low interest and lend to borrowers at higher rates.",
                    "Banks multiply deposits into multiple loans, expanding credit across the economy."
                ],
                funFact: "Historically, salt was so valuable that Roman soldiers were paid in salt. The word 'salary' comes from the Latin word for salt, 'sal'!",
                realLife: "Using UPI on smartphones to scan QR codes transfers digital money directly between bank accounts without paper notes.",
                quiz: [
                    {
                        q: "Which system relies on exchanging goods directly for other goods?",
                        options: ["Monetary System", "Credit System", "Barter System", "Banking System"],
                        correct: 2,
                        exp: "The barter system is the direct exchange of products without using currency."
                    },
                    {
                        q: "What is the main limitation of barter trade?",
                        options: ["Money is too heavy", "Double coincidence of wants", "Lack of shops", "High taxes"],
                        correct: 1,
                        exp: "Barter requires both traders to want what the other is selling, which is difficult to find."
                    },
                    {
                        q: "Which institution issues all paper currency notes in India?",
                        options: ["State Bank of India", "Reserve Bank of India", "Ministry of Finance", "Panchayat Board"],
                        correct: 1,
                        exp: "The Reserve Bank of India (RBI) is the central authority that controls currency issue."
                    },
                    {
                        q: "How do commercial banks earn their primary profits?",
                        options: ["Charging account fees", "Government donations", "Interest spread between deposits and loans", "Printing notes"],
                        correct: 2,
                        exp: "Banks charge higher interest on loans than they pay on deposits, keeping the difference as profit."
                    },
                    {
                        q: "What is a paper document instructing a bank to pay money from a deposit called?",
                        options: ["Currency Note", "Cheque", "Receipt", "Bond"],
                        correct: 1,
                        exp: "A cheque is a direct written instruction to a bank to transfer funds between accounts."
                    }
                ],
                flashcards: [
                    { q: "What is the barter system?", a: "Exchanging goods directly for other goods." },
                    { q: "What is the double coincidence of wants?", a: "When both trading parties want each other's goods." },
                    { q: "What is RBI?", a: "Reserve Bank of India, the central bank of India." },
                    { q: "What is bank spread?", a: "The difference between interest charged on loans and interest paid on deposits." },
                    { q: "What is digital money?", a: "Electronic bank balances accessed via cards or phone apps." }
                ]
            }
        ]
    },
    {
        chapterNum: 8,
        title: "Impact of Technology on Livelihoods",
        summary: "Analysis of technology in agriculture, handlooms vs powerlooms, and changing job patterns.",
        description: "Examine how mechanization boosts production speed but alters employment and jobs.",
        topics: [
            {
                topicNum: 1,
                title: "Agricultural Mechanization and Industrial Shifts",
                youtubeId: "32Y2V23t6V0",
                explanation: `
                    <h3>1. Agricultural Mechanization</h3>
                    <p>In recent decades, new machines have transformed farming. Wooden plows and bullocks are replaced by tractors, harvesters, and irrigation pumps. This <span class="underlined-concept">agricultural mechanization</span> allows a single farmer to complete days of weeding, tilling, and harvesting in hours, reducing dependency on manual labor.</p>

                    <h3>2. The Job Displacement Trade-Off</h3>
                    <p>While machines lower production costs, they create a major social challenge. Landless agricultural laborers lose their seasonal harvesting jobs. This forces many rural workers to migrate to cities to work as daily wage laborers in construction or services.</p>

                    <h3>3. Handloom vs. Powerloom Weavers</h3>
                    <p>In the textile sector, traditional <strong>handlooms</strong> (manually operated weaving frames) face intense competition from automated <strong>powerlooms</strong>. Powerlooms produce fabrics much faster and cheaper, leaving handloom weavers in distress unless they produce specialized silks like Pochampally.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>agricultural mechanization</strong>: The transition from manual farm tools to motorized machinery, raising crop output but reducing farm jobs.</li>
                        </ul>
                    </div>

                    <div class="comparison-card">
                        <h4><i class="fa-solid fa-code-compare"></i> Production: Handlooms vs. Powerlooms</h4>
                        <div class="table-responsive">
                            <table class="comp-table">
                                <thead>
                                    <tr>
                                        <th>Feature</th>
                                        <th>Handloom Weaving</th>
                                        <th>Powerloom Weaving</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Power Source</strong></td>
                                        <td>Manual human labor</td>
                                        <td>Electric power</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Production Speed</strong></td>
                                        <td>Slow (takes days per saree)</td>
                                        <td>Fast (multiple sarees per day)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 5: Evaluating</span></div>
                            <div class="blooms-q-text">Is technology a net benefit or a net harm to traditional rural artisans?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> It is mixed. It increases cheap goods for consumers, but can destroy the livelihood security of manual artisans.</div>
                        </div>
                    </div>
                `,
                remember: "Farm machines increase crop output but displace landless farm laborers. Powerlooms produce cheaper cloth, creating challenges for handloom weavers.",
                vocab: [
                    { word: "Mechanization", meaning: "Replacing manual human labor with machines." },
                    { word: "Handloom", meaning: "A manually operated weaving frame that weaves cloth using human power." },
                    { word: "Powerloom", meaning: "An automated weaving frame powered by electricity." },
                    { word: "Migration", meaning: "The movement of people from rural areas to cities in search of jobs." },
                    { word: "Livelihood", meaning: "A secure way of earning money to afford life's basic needs." }
                ],
                summary: [
                    "Motorized tractors and harvesters have replaced traditional draft animals.",
                    "Mechanization speeds up harvesting but reduces manual farming jobs.",
                    "Rural laborers migrate to urban areas in search of construction wages.",
                    "Powerlooms produce cheap textiles that undercut handloom goods.",
                    "Artisans must specialize in unique products like silk to survive in the market."
                ],
                funFact: "A modern combine harvester can harvest, thresh, and clean grain from an acre of wheat in under 30 minutes, a task that once took a team of ten people several days!",
                realLife: "The famous Pochampally ikat weavers of Telangana use handlooms to weave traditional designs that are protected under geographic registration laws.",
                quiz: [
                    {
                        q: "What is the primary effect of using tractors and combined harvesters in agriculture?",
                        options: ["Increases soil water", "Reduces crop yield", "Speeds up work but decreases manual jobs", "Changes crop colors"],
                        correct: 2,
                        exp: "Machinery accelerates agricultural operations but displaces landless farm laborers."
                    },
                    {
                        q: "Which power source operates a powerloom?",
                        options: ["Human muscle power", "Steam engine", "Electricity", "Solar water heating"],
                        correct: 2,
                        exp: "Powerlooms run on electricity, automating the weaving of threads into cloth at high speed."
                    },
                    {
                        q: "Why do rural farm laborers migrate to cities?",
                        options: ["To buy farmland", "Because machines replaced seasonal farm work", "To avoid summer heat", "To become cartographers"],
                        correct: 1,
                        exp: "Displaced by farm machinery, workers move to urban construction zones to secure wages."
                    },
                    {
                        q: "Which Telangana handloom center is globally famous for its Ikat sarees?",
                        options: ["Nirmal", "Secunderabad", "Pochampally", "Kothagudem"],
                        correct: 2,
                        exp: "Pochampally is famous for its hand-woven Ikat sarees that carry geographical indicators."
                    },
                    {
                        q: "What is the process of replacing human labor with machines called?",
                        options: ["Afforestation", "Siltation", "Mechanization", "Urbanization"],
                        correct: 2,
                        exp: "Mechanization refers to replacing human manual work with automated machines."
                    }
                ],
                flashcards: [
                    { q: "What is mechanization?", a: "Replacing manual human work with machines." },
                    { q: "How does farming machinery affect workers?", a: "It speeds up crops but displaces landless laborers." },
                    { q: "What is a handloom?", a: "A weaving loom operated manually by human muscles." },
                    { q: "What is a powerloom?", a: "An automated weaving loom operated by electricity." },
                    { q: "Why do displaced laborers move to cities?", a: "To find work as daily wage earners in urban industries." }
                ]
            }
        ]
    },
    {
        chapterNum: 9,
        title: "Public Health and the Government",
        summary: "Analysis of clean water, sanitation, public vs private healthcare, and state welfare policies.",
        description: "Study state healthcare systems, public clinics, preventative care, and rural health challenges.",
        topics: [
            {
                topicNum: 1,
                title: "Public Healthcare and State Welfare",
                youtubeId: "vVqC3u2S7hU",
                explanation: `
                    <h3>1. Health as a Human Right</h3>
                    <p>According to the Indian Constitution, the right to health is a fundamental aspect of the Right to Life. Health is not just being free from disease, but includes access to clean drinking water, sanitation, safe housing, and proper nutrition.</p>

                    <h3>2. Public vs. Private Healthcare Systems</h3>
                    <p>Healthcare is split into two systems. <span class="underlined-concept">Public Health Services</span> are run by the government, consisting of Primary Health Centers (PHCs) in villages and Area Hospitals in cities, providing free or low-cost treatment. <span class="underlined-concept">Private Health Services</span> are owned by individuals or corporations, offering advanced equipment but at high costs that can be difficult for poor families to afford.</p>

                    <h3>3. Preventative vs. Curative Care</h3>
                    <p>Preventative care focuses on preventing diseases before they happen (e.g. clean drinking water, vaccinations, mosquito control). Curative care focuses on treating sick patients. Governments must invest in preventative care to reduce the overall burden on hospitals.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>Public Health Services</strong>: Government clinic chains funded by taxpayer money to provide universal medical access to all citizens.</li>
                            <li><strong>Private Health Services</strong>: Corporate hospitals operated for profit, charging patient fees for diagnostic testing and surgeries.</li>
                        </ul>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: PHC vs. Private Hospital</div>
                        <div class="vs-content">
                            A <span class="vs-highlight">Primary Health Center (PHC)</span> is a free government village clinic focusing on basic treatments and vaccines, while a <span class="vs-highlight">Private Hospital</span> is a commercial facility offering specialized operations for high fees.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 4: Analyzing</span></div>
                            <div class="blooms-q-text">Why does lack of clean drinking water lead to a severe crisis in public healthcare?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Contaminated water spreads waterborne diseases like typhoid and cholera, leading to preventable hospitalizations that strain public clinics.</div>
                        </div>
                    </div>
                `,
                remember: "The Constitution guarantees the right to health. Public health clinics are government-run and free, while private clinics are corporate and expensive.",
                vocab: [
                    { word: "PHC", meaning: "Primary Health Center—a government-run basic clinic in rural areas." },
                    { word: "Waterborne Disease", meaning: "Diseases like cholera or typhoid spread by drinking contaminated water." },
                    { word: "Public Service", meaning: "A service provided by the government and funded by tax revenues." },
                    { word: "Generic Medicine", meaning: "Medicines containing the same chemical formula as branded drugs but sold at much lower prices." },
                    { word: "Sanitation", meaning: "Public hygiene systems, including toilet access and clean waste disposal." }
                ],
                summary: [
                    "Health requires clean water, proper nutrition, and sanitation alongside hospitals.",
                    "Public health systems use taxpayer funds to offer free basic medical care.",
                    "Private health systems offer advanced care but charge high fees.",
                    "PHCs provide basic medical services and immunization programs in rural zones.",
                    "Preventative health measures, like clean water, reduce the spread of infectious diseases."
                ],
                funFact: "Washing hands with soap and clean water regularly can prevent up to 40% of diarrheal infections globally, making it a highly effective health measure!",
                realLife: "Telangana's 'Mission Bhagiratha' program delivers treated, piped drinking water to rural homes to reduce waterborne infections.",
                quiz: [
                    {
                        q: "Which constitutional right in India covers the right to health?",
                        options: ["Right to Property", "Right to Education", "Right to Life (Article 21)", "Right to Freedom of Speech"],
                        correct: 2,
                        exp: "The Supreme Court has ruled that the Right to Life under Article 21 includes the right to health care."
                    },
                    {
                        q: "What is a rural government-run medical clinic called?",
                        options: ["Private Hospital", "Super Specialty Center", "Primary Health Center (PHC)", "Corporate Dispensary"],
                        correct: 2,
                        exp: "Primary Health Centers (PHCs) are established in rural blocks to provide free basic medical services."
                    },
                    {
                        q: "How are public healthcare services funded?",
                        options: ["Private donations", "Bank loans", "Tax revenues collected from citizens", "Corporate sponsorships"],
                        correct: 2,
                        exp: "Government-run public services are funded by taxpayer money collected from the public."
                    },
                    {
                        q: "Which disease is directly spread by drinking contaminated water?",
                        options: ["Malaria", "Typhoid", "Tuberculosis", "Scurvy"],
                        correct: 1,
                        exp: "Typhoid is a waterborne bacterial infection spread through contaminated water or food."
                    },
                    {
                        q: "What is the program designed to deliver piped drinking water to all Telangana households?",
                        options: ["Arogyasri", "Rythu Bandhu", "Mission Bhagiratha", "Mission Kakatiya"],
                        correct: 2,
                        exp: "Mission Bhagiratha is Telangana's clean water program to supply treated tap water to rural homes."
                    }
                ],
                flashcards: [
                    { q: "Is health a fundamental right?", a: "Yes, included under the Right to Life in Article 21 of the Constitution." },
                    { q: "What is a PHC?", a: "Primary Health Center, a village government clinic." },
                    { q: "How are public hospitals paid for?", a: "By public taxes collected by the government." },
                    { q: "Give an example of waterborne disease.", a: "Cholera, typhoid, or dysentery." },
                    { q: "What is preventative healthcare?", a: "Preventing illness through vaccinations, clean water, and sanitation." }
                ]
            }
        ]
    },
    {
        chapterNum: 10,
        title: "Landlords and Tenants under the Nizam and the British",
        summary: "Historical study of land systems, Zamindari, Ryotwari, Nizam's deshmukhs, and peasant revolts.",
        description: "Explore the historical land systems, high taxes, and peasant struggles in colonial Telangana.",
        topics: [
            {
                topicNum: 1,
                title: "Land Revenue Systems and Peasant Rebellions",
                youtubeId: "32Y2V23t6V0",
                explanation: `
                    <h3>1. Colonial Land Revenue Systems</h3>
                    <p>During the colonial era, the British and the Nizam introduced new land laws. The <strong>Zamindari System</strong> appointed landlords to collect taxes from entire districts. The <span class="underlined-concept">Ryotwari System</span> collected taxes directly from individual peasants (Ryots), though tax rates remained high.</p>

                    <h3>2. Oppression by Deshmukhs & Doras</h3>
                    <p>In the Hyderabad State under the Nizam, powerful local landlords called <strong>Deshmukhs</strong> or <strong>Doras</strong> controlled hundreds of villages. They acted as revenue collectors, judges, and security, forcing peasants to perform <span class="underlined-concept">Vetti (forced labor)</span> without pay.</p>

                    <h3>3. Peasant Resistances</h3>
                    <p>Oppressed by high taxes, debt, and eviction, peasants organized revolts. The historic <strong>Telangana Peasant Armed Struggle</strong> (1946-1951) was organized by rural communities to fight against the oppression of the Nizam's landlords (Doras), reclaiming land for local farmers.</p>

                    <div class="underlined-explanations-card">
                        <h4><i class="fa-solid fa-pen-nib"></i> Explanations of Underlined Concepts</h4>
                        <ul class="underlined-list">
                            <li><strong>Ryotwari System</strong>: Land tax system where the government registered land ownership directly to the farmer (Ryot) to collect taxes.</li>
                            <li><strong>Vetti (forced labor)</strong>: An exploitative practice where peasants were forced to work on the landlord's estate for free.</li>
                        </ul>
                    </div>

                    <div class="vs-container">
                        <div class="vs-title"><i class="fa-solid fa-circle-nodes"></i> Concept Check: Zamindari vs. Ryotwari</div>
                        <div class="vs-content">
                            In the <span class="vs-highlight">Zamindari System</span>, landlords acted as middlemen, owning the land and taxing peasants, while in the <span class="vs-highlight">Ryotwari System</span>, the state taxed individual peasants directly, bypassing intermediary landlords.
                        </div>
                    </div>

                    <div class="blooms-taxonomy-card">
                        <div class="blooms-header">
                            <div class="blooms-title"><i class="fa-solid fa-graduation-cap"></i> Bloom's Taxonomy Challenge Zone</div>
                        </div>
                        <div class="blooms-question-item">
                            <div class="blooms-q-meta"><span class="blooms-level-badge">Level 4: Analyzing</span></div>
                            <div class="blooms-q-text">Why did the colonial tax systems push peasants into permanent debt cycles?</div>
                            <div class="blooms-a-text"><strong>Answer:</strong> Taxes had to be paid in cash, forcing farmers to borrow money from moneylenders who charged high interest and seized land when loans failed.</div>
                        </div>
                    </div>
                `,
                remember: "Nizam's landlords (Doras) enforced forced unpaid labor (Vetti), which triggered the Telangana Peasant Armed Struggle in 1946.",
                vocab: [
                    { word: "Zamindar", meaning: "A landlord appointed to collect land revenues for the government." },
                    { word: "Ryot", meaning: "An individual farmer or peasant cultivator." },
                    { word: "Dora", meaning: "A powerful landlord in Telangana under the Nizam." },
                    { word: "Vetti", meaning: "Forced, unpaid labor extracted from peasants by landlords." },
                    { word: "Ryotwari System", meaning: "A direct land revenue settlement system between the state and the farmer." }
                ],
                summary: [
                    "Zamindars acted as tax collectors and landlords in colonial British India.",
                    "The Ryotwari system created direct tax settlements between the state and peasants.",
                    "Telangana Doras controlled village resources and extracted forced labor (Vetti).",
                    "High taxes and high interest rates pushed many farmers into debt and land loss.",
                    "The Telangana Peasant Armed Struggle (1946-1951) fought against the Doras and Nizam rule."
                ],
                funFact: "Some Telangana Doras lived in massive fortified mansions called 'Gadi' that had thick stone walls to defend against peasant attacks during revolts!",
                realLife: "Modern land registration systems in India, like Telangana's Dharani portal, digitize ownership records to protect farmers from land grabbing.",
                quiz: [
                    {
                        q: "Which land system collected tax directly from the cultivator (Ryot)?",
                        options: ["Zamindari System", "Ryotwari System", "Mahalwari System", "Jagirdari System"],
                        correct: 1,
                        exp: "The Ryotwari system settled taxes directly with the farmer, bypassing landlord middlemen."
                    },
                    {
                        q: "What were the powerful landlords in Telangana under the Nizam called?",
                        options: ["Zamindars", "Doras / Deshmukhs", "Ryots", "Subedars"],
                        correct: 1,
                        exp: "Local landlords in Hyderabad State were known as Doras or Deshmukhs, controlling entire villages."
                    },
                    {
                        q: "What was the system of forced, unpaid labor extracted by Telangana landlords called?",
                        options: ["Ryotwari", "Podu", "Vetti", "Dharani"],
                        correct: 2,
                        exp: "Vetti was the exploitative system of forced, unpaid labor imposed on low-caste peasants by Doras."
                    },
                    {
                        q: "In which year did the historic Telangana Peasant Armed Struggle begin?",
                        options: ["1919", "1942", "1946", "1957"],
                        correct: 2,
                        exp: "The armed rebellion against the oppressive Doras and Nizam rule began in 1946."
                    },
                    {
                        q: "Why did farmers lose land under colonial tax rules?",
                        options: ["They wanted to move to cities", "They traded land for gold", "High cash taxes forced them to borrow from moneylenders who seized land", "Tractors were too expensive"],
                        correct: 2,
                        exp: "Colonial taxes had to be paid in cash regardless of crop failure, forcing peasants into debt cycles."
                    }
                ],
                flashcards: [
                    { q: "What is a Ryot?", a: "A peasant farmer." },
                    { q: "What is the Zamindari system?", a: "Tax collection system where landlords collected revenues for the state." },
                    { q: "What is a Gadi?", a: "The fortified stone mansion of a Telangana Dora." },
                    { q: "What does Vetti mean?", a: "Forced unpaid labor extracted from peasants." },
                    { q: "When was the Telangana Peasant Struggle?", a: "From 1946 to 1951, fighting landlord oppression." }
                ]
            }
        ]
    }
];

function getActiveChapter() {
    return syllabusData[activeChapterIdx];
}

function getActiveTopic() {
    return getActiveChapter().topics[activeTopicIdx];
}

/* ==========================================================================
   NAVIGATION ENGINE & UI SETUP
   ========================================================================== */
window.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    initPreloader();
    populateChapterDropdown();
    selectChapter(0);
    renderSidebarAccordion();
    renderDashboardChapters();
    registerEventHandlers();
});

// 1. Magical preloader/gateway particle canvas
function initPreloader() {
    const canvas = document.getElementById("magic-canvas");
    const ctx = canvas.getContext("2d");
    
    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    // Create particles
    const particles = [];
    for(let i=0; i<85; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            d: Math.random() * 50 + 10,
            vy: Math.random() * 0.5 - 0.25,
            vx: Math.random() * 0.5 - 0.25,
            color: Math.random() > 0.5 ? "rgba(212, 175, 55, 0.45)" : "rgba(6, 182, 214, 0.3)"
        });
    }

    // Mouse interaction trail
    let mouse = { x: null, y: null };
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            
            // Move particles
            p.y += p.vy;
            p.x += p.vx;
            
            // Boundary wrap
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Connect lines to mouse
            if (mouse.x && mouse.y) {
                const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
                if (dist < 100) {
                    ctx.strokeStyle = `rgba(212, 175, 55, ${1 - dist/100})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// Populate Chapter dropdown in header
function populateChapterDropdown() {
    const dropdown = document.getElementById("chapter-select");
    dropdown.innerHTML = "";
    syllabusData.forEach((ch, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = `Ch ${ch.chapterNum}: ${ch.title}`;
        dropdown.appendChild(opt);
    });
    
    dropdown.onchange = (e) => {
        selectChapter(parseInt(e.target.value));
    };
}

// Render Sidebar topics accordion
function renderSidebarAccordion() {
    const container = document.getElementById("chapters-accordion");
    container.innerHTML = "";
    
    const list = document.createElement("ul");
    list.className = "sidebar-topic-list";
    
    const ch = getActiveChapter();
    ch.topics.forEach((t, tIdx) => {
        const li = document.createElement("li");
        const isCompleted = userProgress.completedChapters[activeChapterIdx] ? "completed" : "";
        const isActive = (tIdx === activeTopicIdx && document.getElementById("container-study-desk").classList.contains("active")) ? "active" : "";
        
        li.innerHTML = `
            <button class="sidebar-topic-btn ${isActive} ${isCompleted}" id="side-topic-btn-${tIdx}">
                <i class="${isCompleted ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                <span>Topic ${t.topicNum}: ${t.title}</span>
            </button>
        `;
        
        li.querySelector("button").onclick = () => {
            selectTopic(activeChapterIdx, tIdx);
        };
        list.appendChild(li);
    });
    container.appendChild(list);
}

// Render Dashboard chapter boxes
function renderDashboardChapters() {
    const grid = document.getElementById("dashboard-chapters-grid");
    grid.innerHTML = "";
    
    syllabusData.forEach((ch, idx) => {
        const card = document.createElement("div");
        card.className = "chapter-road-card";
        if (idx === activeChapterIdx) {
            card.style.borderColor = "var(--gold-color)";
            card.style.background = "rgba(212,175,55,0.02)";
        }
        card.onclick = () => {
            selectChapter(idx);
            selectTopic(idx, 0);
        };
        
        const isCompleted = userProgress.completedChapters[idx];
        const pct = isCompleted ? 100 : 0;
        
        let statusText = "Not Started";
        let statusClass = "active";
        if (isCompleted) {
            statusText = "Completed";
            statusClass = "completed";
        }
        
        card.innerHTML = `
            <div class="chapter-road-header">
                <span class="chapter-road-num">Chapter ${ch.chapterNum}</span>
                <span class="chapter-road-status-tag ${statusClass}">${statusText}</span>
            </div>
            <h3>${ch.title}</h3>
            <p>${ch.summary}</p>
            <div class="chapter-road-footer">
                <span class="chapter-road-progress-label">Status: ${pct}%</span>
                <span class="chapter-road-action-label" style="color:var(--gold-color);">Start Quest <i class="fa-solid fa-chevron-right"></i></span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Handle select chapter
function selectChapter(idx) {
    activeChapterIdx = idx;
    activeTopicIdx = 0;
    
    // Update Chapter Selector Dropdown value
    document.getElementById("chapter-select").value = idx;
    
    // Auto shift background theme class
    const body = document.body;
    body.className = body.classList.contains("light-theme") ? "light-theme" : "dark-theme";
    body.classList.add(`theme-ch-${idx + 1}`);
    
    // Update Dashboard Welcome Hero
    const ch = getActiveChapter();
    document.getElementById("dash-chapter-title").textContent = `Chapter ${ch.chapterNum}: ${ch.title}`;
    document.getElementById("dash-chapter-desc").textContent = ch.description;
    
    // Update Dashboard Metrics dynamically
    document.getElementById("stat-topics-count").textContent = `${ch.topics.length} Topics`;
    document.getElementById("stat-questions-count").textContent = `${ch.topics.length * 5} Questions`;
    
    // Update breadcrumbs
    document.getElementById("breadcrumb-chapter").textContent = `Chapter ${ch.chapterNum}: ${ch.title}`;
    document.getElementById("breadcrumb-topic").textContent = "Dashboard Overview";
    
    renderSidebarAccordion();
    renderDashboardChapters();
}

// Shift content container view
function selectTopic(chIdx, tIdx) {
    selectChapter(chIdx);
    activeTopicIdx = tIdx;
    
    // Set Sidebar Nav Active Highlighting
    document.querySelectorAll(".nav-item-btn").forEach(b => b.classList.remove("active"));
    renderSidebarAccordion();
    
    // Switch to workspace container
    document.querySelectorAll(".content-container").forEach(c => c.classList.remove("active"));
    document.getElementById("container-study-desk").classList.add("active");
    
    // Update breadcrumbs
    const ch = getActiveChapter();
    const t = getActiveTopic();
    document.getElementById("breadcrumb-chapter").textContent = `Chapter ${ch.chapterNum}: ${ch.title}`;
    document.getElementById("breadcrumb-topic").textContent = `Topic ${t.topicNum}: ${t.title}`;
    
    loadTopicData();
    selectTab("read");
}

function selectDashboard() {
    document.querySelectorAll(".nav-item-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("btn-nav-dashboard").classList.add("active");
    
    document.querySelectorAll(".content-container").forEach(c => c.classList.remove("active"));
    document.getElementById("container-dashboard").classList.add("active");
    
    clearAnimationLoops();
    
    const ch = getActiveChapter();
    document.getElementById("breadcrumb-chapter").textContent = `Chapter ${ch.chapterNum}: ${ch.title}`;
    document.getElementById("breadcrumb-topic").textContent = "Dashboard Overview";
    
    renderDashboardChapters();
    renderSidebarAccordion();
}

function selectExamDashboard() {
    document.querySelectorAll(".nav-item-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("btn-nav-exam").classList.add("active");
    
    document.querySelectorAll(".content-container").forEach(c => c.classList.remove("active"));
    document.getElementById("container-exam").classList.add("active");
    
    clearAnimationLoops();
    
    document.getElementById("breadcrumb-chapter").textContent = "Certification Center";
    document.getElementById("breadcrumb-topic").textContent = "Exam Registration";
    
    // Populate candidate name
    const input = document.getElementById("input-student-name");
    if (userProgress.studentName) {
        input.value = userProgress.studentName;
    }
    
    // Populate Exam Chapters description list
    const list = document.getElementById("exam-chapter-list");
    list.innerHTML = "";
    
    const row = document.createElement("div");
    row.className = "exam-chapter-radio checked-border";
    row.innerHTML = `
        <i class="fa-solid fa-circle-check" style="color:var(--gold-color);"></i>
        <span>Complete Course Exam (Chapters 1-10 Dynamic Test Pool)</span>
    `;
    list.appendChild(row);
    
    document.getElementById("exam-stage-panel").classList.add("hide");
    document.getElementById("exam-results-panel").classList.add("hide");
    document.querySelector(".exam-setup-box").classList.remove("hide");
    
    if (examTimerInterval) clearInterval(examTimerInterval);
}

// Tab navigation within study workspace
function selectTab(tabName) {
    activeTab = tabName;
    
    document.querySelectorAll(".tab-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === tabName) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
    
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    document.getElementById(`panel-${tabName}`).classList.add("active");
    
    clearAnimationLoops();
    
    if (tabName === "watch") {
        startWatchAnimation(activeChapterIdx);
    } else if (tabName === "explore") {
        initExploreSimulation(activeChapterIdx);
    } else if (tabName === "practice") {
        initPracticeQuiz(activeChapterIdx);
    }
}

// Clear any canvas rendering loops
function clearAnimationLoops() {
    if (watchAnimationId) {
        cancelAnimationFrame(watchAnimationId);
        watchAnimationId = null;
    }
    if (activeExploreAnimationId) {
        cancelAnimationFrame(activeExploreAnimationId);
        activeExploreAnimationId = null;
    }
}

// Load dynamic data into active topic desk tabs
function loadTopicData() {
    const ch = getActiveChapter();
    const t = getActiveTopic();
    
    // 1. Load READ tab
    document.getElementById("read-explanation").innerHTML = t.explanation;
    document.getElementById("read-remember").innerHTML = `<p>${t.remember}</p>`;
    
    const tbody = document.getElementById("read-vocab-list");
    tbody.innerHTML = "";
    t.vocab.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${v.word}</td><td>${v.meaning}</td>`;
        tbody.appendChild(tr);
    });
    
    // 2. Load REVISE tab
    const summaryUl = document.getElementById("revise-summary-list");
    summaryUl.innerHTML = "";
    t.summary.forEach(point => {
        const li = document.createElement("li");
        li.textContent = point;
        summaryUl.appendChild(li);
    });
    document.getElementById("revise-real-life").innerHTML = `<p>${t.realLife}</p>`;
    document.getElementById("revise-fun-fact").innerHTML = `<p>${t.funFact}</p>`;
    
    // Reset watch mode
    watchSubMode = "animation";
    const btnAnim = document.getElementById("btn-toggle-animation");
    const btnVid = document.getElementById("btn-toggle-video");
    if (btnAnim && btnVid) {
        btnAnim.classList.add("active");
        btnVid.classList.remove("active");
    }
    
    updateTopicProgressRing();
    document.getElementById("desk-footer-indicator").textContent = `Topic ${t.topicNum}: ${t.title}`;
}

function updateTopicProgressRing() {
    const isCompleted = userProgress.completedChapters[activeChapterIdx];
    const percentage = isCompleted ? 100 : 40;
    
    document.getElementById("desk-progress-percent").textContent = `${percentage}%`;
    const circle = document.getElementById("desk-progress-bar");
    if (circle) {
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}

// Event registration
function registerEventHandlers() {
    // Magic entrance portal enter button
    document.getElementById("btn-magic-enter").onclick = () => {
        const portal = document.getElementById("magic-entrance");
        portal.style.opacity = "0";
        setTimeout(() => {
            portal.classList.add("hide");
            document.querySelector(".app-container").classList.remove("hide");
            document.body.classList.remove("theme-landing");
            selectDashboard();
        }, 800);
    };

    // Sidebar navigation buttons
    document.getElementById("btn-nav-dashboard").onclick = selectDashboard;
    document.getElementById("btn-nav-exam").onclick = selectExamDashboard;
    
    // Welcome Hero start button
    document.getElementById("btn-start-learning").onclick = () => {
        selectTopic(activeChapterIdx, 0);
    };
    
    // Workspace tabs
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.onclick = () => {
            selectTab(btn.getAttribute("data-tab"));
        };
    });
    
    // Workspace desk prev/next footers
    document.getElementById("desk-prev-topic-btn").onclick = () => {
        const ch = getActiveChapter();
        if (activeTopicIdx > 0) {
            selectTopic(activeChapterIdx, activeTopicIdx - 1);
        } else if (activeChapterIdx > 0) {
            const prevCh = syllabusData[activeChapterIdx - 1];
            selectTopic(activeChapterIdx - 1, prevCh.topics.length - 1);
        } else {
            selectDashboard();
        }
    };
    
    document.getElementById("desk-next-topic-btn").onclick = () => {
        const ch = getActiveChapter();
        if (activeTopicIdx < ch.topics.length - 1) {
            selectTopic(activeChapterIdx, activeTopicIdx + 1);
        } else if (activeChapterIdx < 9) {
            selectTopic(activeChapterIdx + 1, 0);
        } else {
            selectExamDashboard();
        }
    };
    
    // Global dark/light theme toggle
    document.getElementById("theme-toggle-btn").onclick = () => {
        const body = document.body;
        const icon = document.getElementById("theme-toggle-btn").querySelector("i");
        
        if (body.classList.contains("light-theme")) {
            body.classList.remove("light-theme");
            body.classList.add("dark-theme");
            icon.className = "fa-solid fa-moon";
        } else {
            body.classList.remove("dark-theme");
            body.classList.add("light-theme");
            icon.className = "fa-solid fa-sun";
        }
    };
    
    // Exam launch settings
    document.getElementById("btn-launch-exam").onclick = startExamProcess;
    
    // Certificate Print Trigger
    document.getElementById("btn-print-action").onclick = () => {
        window.print();
    };
    
    document.getElementById("btn-close-cert-modal").onclick = () => {
        document.getElementById("certificate-modal").classList.add("hide");
    };
}

/* ==========================================================================
   WATCH: CANVAS ANIMATION LOOPS
   ========================================================================== */
function startWatchAnimation(chapIdx) {
    const mediaContainer = document.getElementById("watch-media-canvas");
    const mediaDesc = document.getElementById("watch-media-description");
    const t = getActiveTopic();
    
    const togglePanel = document.getElementById("watch-media-toggle");
    const btnAnim = document.getElementById("btn-toggle-animation");
    const btnVid = document.getElementById("btn-toggle-video");
    
    if (togglePanel) {
        if (t.youtubeId) {
            togglePanel.classList.remove("hide");
            if (watchSubMode === "video") {
                btnAnim.classList.remove("active");
                btnVid.classList.add("active");
            } else {
                btnAnim.classList.add("active");
                btnVid.classList.remove("active");
            }
        } else {
            togglePanel.classList.add("hide");
            watchSubMode = "animation";
        }
    }
    
    btnAnim.onclick = () => {
        watchSubMode = "animation";
        startWatchAnimation(chapIdx);
    };
    
    btnVid.onclick = () => {
        watchSubMode = "video";
        startWatchAnimation(chapIdx);
    };
    
    if (watchSubMode === "video" && t.youtubeId) {
        mediaContainer.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0" 
                    title="Educational Video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        `;
        mediaDesc.innerHTML = `<strong>Telangana SCERT Video:</strong> Learn about the core structures of <em>"${syllabusData[chapIdx].title}"</em>.`;
    } else {
        mediaContainer.innerHTML = `<canvas id="watch-canvas" width="680" height="360"></canvas>`;
        const canvas = document.getElementById("watch-canvas");
        const ctx = canvas.getContext("2d");
        let frame = 0;
        
        function loop() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGridBackground(ctx, canvas.width, canvas.height);
            
            const watchKey = activeChapterIdx + "-" + activeTopicIdx;
            
            switch (watchKey) {
                case "0-0":
                    drawCh1T1Watch(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Sumerian and Babylonian Mapping Eras:</strong> Visualizing how geographic representations evolved from clay tablet outlines of fields and religious disc concepts.";
                    break;
                case "0-1":
                    drawCh1T2Watch(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Cylindrical Map Projections:</strong> Projecting spherical lines onto a flat sheet stretches regions near the poles. Compass headings stay straight, but sizes are distorted.";
                    break;
                case "0-2":
                    drawCh1T3Watch(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Contour Ring Formations:</strong> Isolines represent 3D elevation. Slicing a hill at vertical intervals projects concentric height rings on a flat map.";
                    break;
                case "0-3":
                    drawCh1T4Watch(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Modern Satellite Remote Sensing & GIS:</strong> Satellite orbits Earth while capturing geospatial data in layers like terrain, infrastructure, and population grids.";
                    break;
                case "1-0":
                    drawCh2Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Solar Radiation Angles:</strong> Direct vertical rays near the Equator heat a small concentrated surface, while slanted rays spread warmth weakly near the cold poles.";
                    break;
                case "2-0":
                    drawCh3Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Earth Tilt Orbit Revolution:</strong> Moving Earth tilts at 23.5 degrees, pointing towards Polaris while orbiting the Sun to create seasonal solstices.";
                    break;
                case "3-0":
                    drawCh4Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Polar Midnight Sun Path:</strong> In summer, the Earth tilts fully toward the Sun, keeping it above the horizon for 24 hours of light.";
                    break;
                case "4-0":
                    drawCh5Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Forest Growth Cycles:</strong> Visualizing trees breathing in carbon dioxide and storing it in their trunks while releasing fresh oxygen.";
                    break;
                case "5-0":
                    drawCh6Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Underground Extraction shafts:</strong> Elevators descend deep shafts to dig out dark coal seams buried under dense rock layers.";
                    break;
                case "6-0":
                    drawCh7Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Double Coincidence Barter System:</strong> Barter requires a direct exchange match. If wants do not match, trade collapses until money solves the cycle.";
                    break;
                case "7-0":
                    drawCh8Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Agricultural Automation:</strong> Tractor plows and harvesters work field crops in minutes, replacing long days of hard manual labour.";
                    break;
                case "8-0":
                    drawCh9Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Public Health Clinic:</strong> PHC village clinics distribute generic medicines and immunizations, protecting families from waterborne disease.";
                    break;
                case "9-0":
                    drawCh10Anim(ctx, canvas.width, canvas.height, frame);
                    mediaDesc.innerHTML = "<strong>Feudal Estate Revenue:</strong> Historical Zamindars and Doras collected grain taxes and forced unpaid labor (Vetti) from poor ryots.";
                    break;
            }
            
            frame++;
            watchAnimationId = requestAnimationFrame(loop);
        }
        loop();
    }
}

// Background utility grid drawing
function drawGridBackground(ctx, w, h) {
    ctx.strokeStyle = document.body.classList.contains("light-theme") ? "rgba(212, 175, 55, 0.08)" : "rgba(212, 175, 55, 0.03)";
    ctx.lineWidth = 1;
    for(let x=0; x<w; x+=40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for(let y=0; y<h; y+=40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
}

/* ==========================================================================
   EXPLORE: 10 INTERACTIVE SIMULATORS
   ========================================================================== */
function initExploreSimulation(chapIdx) {
    const container = document.getElementById("explore-simulation-container");
    container.innerHTML = "";
    
    const controls = document.createElement("div");
    controls.className = "sim-controls-panel";
    
    const display = document.createElement("div");
    display.className = "sim-display-panel";
    display.innerHTML = `<canvas id="explore-canvas" width="410" height="400"></canvas>`;
    
    container.appendChild(controls);
    container.appendChild(display);
    
    const canvas = document.getElementById("explore-canvas");
    const ctx = canvas.getContext("2d");
    
    clearAnimationLoops();
    
    document.getElementById("reset-simulation-btn").onclick = () => {
        initExploreSimulation(chapIdx);
    };
    
    const simKey = activeChapterIdx + "-" + activeTopicIdx;
    
    switch (simKey) {
        case "0-0": runSimCh1T1(controls, ctx, canvas); break;
        case "0-1": runSimCh1T2(controls, ctx, canvas); break;
        case "0-2": runSimCh1T3(controls, ctx, canvas); break;
        case "0-3": runSimCh1T4(controls, ctx, canvas); break;
        case "1-0": runCh2Sim(controls, ctx, canvas); break;
        case "2-0": runCh3Sim(controls, ctx, canvas); break;
        case "3-0": runCh4Sim(controls, ctx, canvas); break;
        case "4-0": runCh5Sim(controls, ctx, canvas); break;
        case "5-0": runCh6Sim(controls, ctx, canvas); break;
        case "6-0": runCh7Sim(controls, ctx, canvas); break;
        case "7-0": runCh8Sim(controls, ctx, canvas); break;
        case "8-0": runCh9Sim(controls, ctx, canvas); break;
        case "9-0": runCh10Sim(controls, ctx, canvas); break;
    }
}

// 2. Chapter 2: Sun Insolation angle heating rate
function runCh2Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Solar Ray Angle Simulator</h4>
        <p class="sim-museum-desc">Adjust solar ray angle to observe heating rates:</p>
        <div class="sim-control-group">
            <label>Ray Angle: <span id="val-c2-a">90° (Direct)</span></label>
            <input type="range" class="sim-slider" id="c2-slider-a" min="15" max="90" value="90">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Heating Intensity: <strong id="c2-val-int" style="color:var(--gold-color);">100%</strong></p>
            <p style="margin-top:5px;">Estimated Climate: <strong id="c2-val-clim">Tropical Torrid</strong></p>
        </div>
    `;
    const sA = document.getElementById("c2-slider-a");
    
    function draw() {
        const angle = parseInt(sA.value);
        const rad = angle * Math.PI / 180;
        
        const pct = Math.round((angle / 90) * 100);
        document.getElementById("val-c2-a").textContent = `${angle}°`;
        document.getElementById("c2-val-int").textContent = `${pct}%`;
        
        let clim = "Frigid Polar";
        if (angle > 70) clim = "Tropical Torrid";
        else if (angle > 40) clim = "Temperate Belt";
        document.getElementById("c2-val-clim").textContent = clim;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw ground
        ctx.fillStyle = "#8c6535";
        ctx.fillRect(30, 350, cvs.width - 60, 20);
        
        // Draw rays hitting ground
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 4;
        const length = 150;
        const sx = cvs.width/2 - Math.cos(rad)*length;
        const sy = 350 - Math.sin(rad)*length;
        
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(cvs.width/2, 350);
        ctx.stroke();
        
        // Sun symbol
        ctx.fillStyle = "yellow";
        ctx.beginPath(); ctx.arc(sx, sy, 15, 0, Math.PI*2); ctx.fill();
    }
    sA.oninput = draw;
    draw();
}

// 3. Chapter 3: Solstice orbit rotation
function runCh3Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Seasons Orbit Simulator</h4>
        <p class="sim-museum-desc">Step Earth through its orbit around the Sun:</p>
        <button class="sim-btn" id="btn-c3-june">June Solstice (North Summer)</button>
        <button class="sim-btn-secondary" id="btn-c3-sept" style="margin-top:8px;">Sept Equinox (Equal Day)</button>
        <button class="sim-btn-secondary" id="btn-c3-dec" style="margin-top:8px;">Dec Solstice (North Winter)</button>
    `;
    let orbitMode = "june";
    
    function update() {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        const cx = cvs.width/2; const cy = cvs.height/2;
        // Sun
        ctx.fillStyle = "#ffd700";
        ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI*2); ctx.fill();
        
        // Earth positions
        let ex = cx; let ey = cy;
        let tiltRight = true;
        if(orbitMode === "june") {
            ex = cx - 130; ey = cy;
            tiltRight = false;
        } else if(orbitMode === "sept") {
            ex = cx; ey = cy + 70;
        } else {
            ex = cx + 130; ey = cy;
            tiltRight = true;
        }
        
        // Earth sphere
        ctx.fillStyle = "#0284c7";
        ctx.beginPath(); ctx.arc(ex, ey, 18, 0, Math.PI*2); ctx.fill();
        
        // Axis line
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(ex - 5, ey - 25); ctx.lineTo(ex + 5, ey + 25); ctx.stroke();
    }
    
    document.getElementById("btn-c3-june").onclick = () => {
        orbitMode = "june";
        document.getElementById("btn-c3-june").className = "sim-btn";
        document.getElementById("btn-c3-sept").className = "sim-btn-secondary";
        document.getElementById("btn-c3-dec").className = "sim-btn-secondary";
        update();
    };
    document.getElementById("btn-c3-sept").onclick = () => {
        orbitMode = "sept";
        document.getElementById("btn-c3-june").className = "sim-btn-secondary";
        document.getElementById("btn-c3-sept").className = "sim-btn";
        document.getElementById("btn-c3-dec").className = "sim-btn-secondary";
        update();
    };
    document.getElementById("btn-c3-dec").onclick = () => {
        orbitMode = "dec";
        document.getElementById("btn-c3-june").className = "sim-btn-secondary";
        document.getElementById("btn-c3-sept").className = "sim-btn-secondary";
        document.getElementById("btn-c3-dec").className = "sim-btn";
        update();
    };
    update();
}

// 4. Chapter 4: Polar Daylight Latitude Cycles
function runCh4Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Polar Daylight Simulator</h4>
        <div class="sim-control-group">
            <label>Latitude: <span id="val-c4-l">75° N</span></label>
            <input type="range" class="sim-slider" id="c4-slider-l" min="60" max="90" value="75">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Daylight Duration: <strong style="color:var(--gold-color);" id="c4-val-day">24 Hours (Midnight Sun)</strong></p>
        </div>
    `;
    const sL = document.getElementById("c4-slider-l");
    
    function draw() {
        const lat = parseInt(sL.value);
        document.getElementById("val-c4-l").textContent = `${lat}° N`;
        
        let hrs = 24;
        if(lat === 60) hrs = 18;
        else if (lat === 65) hrs = 21;
        document.getElementById("c4-val-day").textContent = hrs === 24 ? "24 Hours (Midnight Sun)" : `${hrs} Hours`;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw polar ice dome
        ctx.fillStyle = "#e0f2fe";
        ctx.beginPath(); ctx.arc(cvs.width/2, 400, 160 + (90-lat)*4, Math.PI, 0); ctx.fill();
    }
    sL.oninput = draw;
    draw();
}

// 5. Chapter 5: Deforestation Carbon level simulator
function runCh5Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Forest Canopy Simulator</h4>
        <div class="sim-control-group">
            <label>Deforestation Rate: <span id="val-c5-d">15%</span></label>
            <input type="range" class="sim-slider" id="c5-slider-d" min="0" max="50" value="15">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Remaining Forest: <strong id="c5-val-can" style="color:var(--gold-color);">85%</strong></p>
            <p style="margin-top:5px;">Soil Erosion Risk: <strong id="c5-val-ero">Low</strong></p>
        </div>
    `;
    const sD = document.getElementById("c5-slider-d");
    
    function draw() {
        const def = parseInt(sD.value);
        const rem = 100 - def;
        document.getElementById("val-c5-d").textContent = `${def}% / year`;
        document.getElementById("c5-val-can").textContent = `${rem}%`;
        
        let risk = "Low";
        if(def > 35) risk = "Critical Danger";
        else if(def > 15) risk = "Moderate";
        document.getElementById("c5-val-ero").textContent = risk;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw forest canopy green bubbles
        ctx.fillStyle = "#059669";
        for(let i=0; i<rem/3; i++) {
            const x = 50 + (i*12) % 300;
            const y = 180 + Math.sin(i)*15;
            ctx.beginPath(); ctx.arc(x, y, 18, 0, Math.PI*2); ctx.fill();
        }
    }
    sD.oninput = draw;
    draw();
}

// 6. Chapter 6: Mining Selector Excavator
function runCh6Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Excavator Selector Sandbox</h4>
        <button class="sim-btn" id="btn-c6-open">Open-Cast surface pit</button>
        <button class="sim-btn-secondary" id="btn-c6-shaft" style="margin-top:8px;">Deep Shaft tunnel</button>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Environment Impact: <strong id="c6-val-env" style="color:var(--gold-color);">High Pit</strong></p>
            <p style="margin-top:5px;">Operational Risk: <strong id="c6-val-risk">Low</strong></p>
        </div>
    `;
    let mode = "open";
    
    function update() {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        if (mode === "open") {
            document.getElementById("c6-val-env").textContent = "Severe Surface clearing";
            document.getElementById("c6-val-risk").textContent = "Very Low (Open Pit)";
            
            // Draw open steps
            ctx.fillStyle = "#854d0e";
            ctx.beginPath();
            ctx.moveTo(30, 100);
            ctx.lineTo(120, 100);
            ctx.lineTo(120, 200);
            ctx.lineTo(280, 200);
            ctx.lineTo(280, 100);
            ctx.lineTo(370, 100);
            ctx.lineTo(370, 350);
            ctx.lineTo(30, 350);
            ctx.closePath(); ctx.fill();
        } else {
            document.getElementById("c6-val-env").textContent = "Minimal Surface damage";
            document.getElementById("c6-val-risk").textContent = "High (Tunnel Collapse/Gas)";
            
            // Draw shaft lines
            ctx.strokeStyle = "#fff"; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(cvs.width/2, 100); ctx.lineTo(cvs.width/2, 300); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cvs.width/2 - 50, 300); ctx.lineTo(cvs.width/2 + 50, 300); ctx.stroke();
        }
    }
    
    document.getElementById("btn-c6-open").onclick = () => {
        mode = "open";
        document.getElementById("btn-c6-open").className = "sim-btn";
        document.getElementById("btn-c6-shaft").className = "sim-btn-secondary";
        update();
    };
    
    document.getElementById("btn-c6-shaft").onclick = () => {
        mode = "shaft";
        document.getElementById("btn-c6-open").className = "sim-btn-secondary";
        document.getElementById("btn-c6-shaft").className = "sim-btn";
        update();
    };
    update();
}

// 7. Chapter 7: Money multiplier and Reserve ratios
function runCh7Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Money Multiplier Calculator</h4>
        <div class="sim-control-group">
            <label>Reserve Ratio (LRR): <span id="val-c7-r">20%</span></label>
            <input type="range" class="sim-slider" id="c7-slider-r" min="10" max="50" value="20">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Initial Deposit: <strong>₹ 10,000</strong></p>
            <p style="margin-top:5px;">Credit Generated: <strong id="c7-val-tot" style="color:var(--gold-color);">₹ 50,000</strong></p>
        </div>
    `;
    const sR = document.getElementById("c7-slider-r");
    
    function draw() {
        const ratio = parseInt(sR.value);
        const mult = 100 / ratio;
        const total = 10000 * mult;
        
        document.getElementById("val-c7-r").textContent = `${ratio}%`;
        document.getElementById("c7-val-tot").textContent = `₹ ${total.toLocaleString()}`;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw multiple loan cylinders representing created money
        ctx.fillStyle = "rgba(16, 185, 129, 0.2)";
        ctx.strokeStyle = "var(--emerald-green)";
        for (let i = 0; i < Math.round(mult); i++) {
            const h = 120 - i*15;
            ctx.fillRect(80 + i * 35, 300 - h, 25, h);
            ctx.strokeRect(80 + i * 35, 300 - h, 25, h);
        }
    }
    sR.oninput = draw;
    draw();
}

// 8. Chapter 8: Mechanization Speed vs rural jobs
function runCh8Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Job Mechanization Index</h4>
        <div class="sim-control-group">
            <label>Tractors in Village: <span id="val-c8-m">5 Units</span></label>
            <input type="range" class="sim-slider" id="c8-slider-m" min="0" max="15" value="5">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Harvest Speed: <strong id="c8-val-spd" style="color:var(--gold-color);">Fast</strong></p>
            <p style="margin-top:5px;">Displaced Laborers: <strong id="c8-val-un">Low</strong></p>
        </div>
    `;
    const sM = document.getElementById("c8-slider-m");
    
    function draw() {
        const machines = parseInt(sM.value);
        document.getElementById("val-c8-m").textContent = `${machines} Units`;
        
        let spd = "Slow"; let un = "None";
        if(machines > 10) { spd = "Ultra-Fast"; un = "Critical (Mass Migration)"; }
        else if(machines > 4) { spd = "Moderate-Fast"; un = "Moderate Displacement"; }
        
        document.getElementById("c8-val-spd").textContent = spd;
        document.getElementById("c8-val-un").textContent = un;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw tractor wheels
        ctx.strokeStyle = "red"; ctx.lineWidth = 3;
        for(let i=0; i<machines; i++) {
            const x = 50 + (i * 22) % 300;
            ctx.beginPath(); ctx.arc(x, 200, 8, 0, Math.PI*2); ctx.stroke();
        }
    }
    sM.oninput = draw;
    draw();
}

// 9. Chapter 9: Public Health clinic budgets
function runCh9Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>PHC Health Budget Allocation</h4>
        <div class="sim-control-group">
            <label>Public Sanitation: <span id="val-c9-s">40%</span></label>
            <input type="range" class="sim-slider" id="c9-slider-s" min="10" max="80" value="40">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Disease Infection Rate: <strong id="c9-val-inf" style="color:var(--gold-color);">12%</strong></p>
        </div>
    `;
    const sS = document.getElementById("c9-slider-s");
    
    function draw() {
        const san = parseInt(sS.value);
        const inf = Math.max(1, Math.round(35 - san * 0.4));
        document.getElementById("val-c9-s").textContent = `${san}%`;
        document.getElementById("c9-val-inf").textContent = `${inf}%`;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw germs representation (smaller germs if sanitation is high)
        ctx.fillStyle = "rgba(239, 68, 68, 0.4)";
        for(let i=0; i<inf; i++) {
            const x = 60 + (i*18) % 280;
            const y = 100 + (i*24) % 200;
            ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI*2); ctx.fill();
        }
    }
    sS.oninput = draw;
    draw();
}

// 10. Chapter 10: Peasant Land Tax Rebellion
function runCh10Sim(ctrls, ctx, cvs) {
    ctrls.innerHTML = `
        <h4>Ryotwari Tax Rebellion risk</h4>
        <div class="sim-control-group">
            <label>Land Tax Rate: <span id="val-c10-t">30%</span></label>
            <input type="range" class="sim-slider" id="c10-slider-t" min="10" max="90" value="30">
        </div>
        <div class="sim-data-box" style="margin-top:15px;">
            <p>Peasant Income: <strong id="c10-val-inc">Moderate</strong></p>
            <p style="margin-top:5px;">Rebellion Risk Gauge: <strong id="c10-val-reb" style="color:var(--gold-color);">Safe</strong></p>
        </div>
    `;
    const sT = document.getElementById("c10-slider-t");
    
    function draw() {
        const tax = parseInt(sT.value);
        document.getElementById("val-c10-t").textContent = `${tax}%`;
        
        let inc = "High"; let reb = "Very Safe";
        if(tax > 70) { inc = "Starvation level"; reb = "Armed Revolt Rebellion Triggered!"; }
        else if (tax > 45) { inc = "Poverty Debt Cycle"; reb = "High Protest"; }
        
        document.getElementById("c10-val-inc").textContent = inc;
        document.getElementById("c10-val-reb").textContent = reb;
        
        ctx.clearRect(0,0,cvs.width,cvs.height);
        drawGridBackground(ctx, cvs.width, cvs.height);
        
        // Draw risk thermometer gauge
        ctx.fillStyle = "gray";
        ctx.fillRect(cvs.width/2 - 15, 80, 30, 240);
        ctx.fillStyle = tax > 70 ? "red" : (tax > 45 ? "orange" : "green");
        const fillH = (tax / 100) * 240;
        ctx.fillRect(cvs.width/2 - 15, 320 - fillH, 30, fillH);
    }
    sT.oninput = draw;
    draw();
}

/* ==========================================================================
   PRACTICE: QUIZZES AND FLASHCARDS ENGINES
   ========================================================================== */
function initPracticeQuiz(chapIdx) {
    document.getElementById("practice-quiz-section").querySelector(".quiz-card-container").classList.remove("hide");
    document.getElementById("quiz-prev-btn").classList.remove("hide");
    document.getElementById("quiz-next-btn").classList.remove("hide");
    document.getElementById("quiz-timer-box").classList.remove("hide");
    document.getElementById("quiz-complete-card").classList.add("hide");
    
    currentQuizQuestionIdx = 0;
    quizAnswers = Array(5).fill(null);
    quizSecondsElapsed = 0;
    
    const t = syllabusData[chapIdx].topics[activeTopicIdx];
    // Copy questions list
    quizQuestionsList = t.quiz.map(q => ({
        q: q.q,
        options: [...q.options],
        correct: q.correct,
        exp: q.exp
    }));
    
    // Generate step dots
    const container = document.getElementById("quiz-question-steps");
    container.innerHTML = "";
    for(let i=0; i<5; i++) {
        const dot = document.createElement("div");
        dot.className = (i === 0) ? "quiz-step-dot active" : "quiz-step-dot";
        container.appendChild(dot);
    }
    
    document.getElementById("quiz-time-elapsed").textContent = "0:00";
    if (quizTimerInterval) clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        quizSecondsElapsed++;
        const m = Math.floor(quizSecondsElapsed/60);
        const s = quizSecondsElapsed % 60;
        document.getElementById("quiz-time-elapsed").textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }, 1000);
    
    loadQuizQuestion(0);
}

function loadQuizQuestion(qIdx) {
    currentQuizQuestionIdx = qIdx;
    document.getElementById("quiz-q-num").textContent = `Question ${qIdx + 1} of 5`;
    const q = quizQuestionsList[qIdx];
    document.getElementById("quiz-question-text").textContent = q.q;
    
    const list = document.getElementById("quiz-options-list");
    list.innerHTML = "";
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerHTML = `<span class="option-badge">${["A","B","C","D"][idx]}</span> <span>${opt}</span>`;
        
        if (quizAnswers[qIdx] !== null) {
            btn.disabled = true;
            if(idx === q.correct) btn.classList.add("correct");
            else if(idx === quizAnswers[qIdx]) btn.classList.add("wrong");
        }
        
        btn.onclick = () => {
            handleQuizSelection(qIdx, idx);
        };
        list.appendChild(btn);
    });
    
    const expBox = document.getElementById("quiz-explanation-box");
    if(quizAnswers[qIdx] !== null) {
        expBox.classList.remove("hide");
        const corr = quizAnswers[qIdx] === q.correct;
        document.getElementById("quiz-exp-status").textContent = corr ? "Correct Answer!" : "Incorrect Answer!";
        document.getElementById("quiz-exp-status").className = corr ? "explanation-status pass" : "explanation-status fail";
        document.getElementById("quiz-explanation-text").textContent = q.exp;
    } else {
        expBox.classList.add("hide");
    }
    
    const prev = document.getElementById("quiz-prev-btn");
    const next = document.getElementById("quiz-next-btn");
    prev.disabled = qIdx === 0;
    next.disabled = quizAnswers[qIdx] === null;
    next.textContent = qIdx === 4 ? "Submit Quiz" : "Next Question";
    
    prev.onclick = () => { loadQuizQuestion(qIdx - 1); };
    next.onclick = () => {
        if(qIdx < 4) loadQuizQuestion(qIdx + 1);
        else finishTopicQuiz();
    };
    
    updateQuizDots(qIdx);
}

function handleQuizSelection(qIdx, optIdx) {
    quizAnswers[qIdx] = optIdx;
    const q = quizQuestionsList[qIdx];
    const corr = optIdx === q.correct;
    
    const dots = document.querySelectorAll(".quiz-step-dot");
    dots[qIdx].className = corr ? "quiz-step-dot correct" : "quiz-step-dot wrong";
    
    loadQuizQuestion(qIdx);
}

function updateQuizDots(activeIdx) {
    const dots = document.querySelectorAll(".quiz-step-dot");
    dots.forEach((dot, idx) => {
        if(!dot.classList.contains("correct") && !dot.classList.contains("wrong")) {
            dot.className = (idx === activeIdx) ? "quiz-step-dot active" : "quiz-step-dot";
        }
    });
}

function finishTopicQuiz() {
    clearInterval(quizTimerInterval);
    document.getElementById("practice-quiz-section").querySelector(".quiz-card-container").classList.add("hide");
    document.getElementById("quiz-prev-btn").classList.add("hide");
    document.getElementById("quiz-next-btn").classList.add("hide");
    document.getElementById("quiz-timer-box").classList.add("hide");
    
    let score = 0;
    quizQuestionsList.forEach((q, idx) => {
        if(quizAnswers[idx] === q.correct) score++;
    });
    const pct = Math.round((score/5)*100);
    
    document.getElementById("quiz-complete-card").classList.remove("hide");
    document.getElementById("quiz-score-val").textContent = `${score} / 5`;
    document.getElementById("quiz-percent-val").textContent = `${pct}%`;
    
    if(pct >= 80) {
        userProgress.completedChapters[activeChapterIdx] = true;
        saveProgress();
        updateTopicProgressRing();
    }
    
    document.getElementById("quiz-retry-btn").onclick = () => {
        initPracticeQuiz(activeChapterIdx);
    };
}

// Flashcards control
let currentFlashcardIdx = 0;
function initFlashcards(chapIdx) {
    currentFlashcardIdx = 0;
    const card = document.getElementById("flashcard-element");
    card.classList.remove("flipped");
    card.onclick = () => card.classList.toggle("flipped");
    
    document.getElementById("fc-prev-btn").onclick = () => {
        if (currentFlashcardIdx > 0) {
            currentFlashcardIdx--;
            card.classList.remove("flipped");
            setTimeout(() => loadFlashcard(chapIdx, currentFlashcardIdx), 150);
        }
    };
    document.getElementById("fc-next-btn").onclick = () => {
        if (currentFlashcardIdx < 4) {
            currentFlashcardIdx++;
            card.classList.remove("flipped");
            setTimeout(() => loadFlashcard(chapIdx, currentFlashcardIdx), 150);
        }
    };
    loadFlashcard(chapIdx, 0);
}

function loadFlashcard(chapIdx, idx) {
    const fc = syllabusData[chapIdx].topics[activeTopicIdx].flashcards[idx];
    document.getElementById("flashcard-front-text").textContent = fc.q;
    document.getElementById("flashcard-back-text").textContent = fc.a;
    document.getElementById("fc-counter-text").textContent = `${idx + 1} / 5`;
    
    document.getElementById("fc-prev-btn").disabled = idx === 0;
    document.getElementById("fc-next-btn").disabled = idx === 4;
}

document.getElementById("btn-toggle-quiz").onclick = () => {
    document.getElementById("btn-toggle-quiz").classList.add("active");
    document.getElementById("btn-toggle-flashcards").classList.remove("active");
    document.getElementById("practice-quiz-section").classList.remove("hide");
    document.getElementById("practice-flashcard-section").classList.add("hide");
    initPracticeQuiz(activeChapterIdx);
};

document.getElementById("btn-toggle-flashcards").onclick = () => {
    document.getElementById("btn-toggle-quiz").classList.remove("active");
    document.getElementById("btn-toggle-flashcards").classList.add("active");
    document.getElementById("practice-quiz-section").classList.add("hide");
    document.getElementById("practice-flashcard-section").classList.remove("hide");
    initFlashcards(activeChapterIdx);
};

/* ==========================================================================
   EXAM: COMPREHENSIVE COURSE GRADUATION
   ========================================================================== */
function startExamProcess() {
    const nameInput = document.getElementById("input-student-name");
    const nameVal = nameInput.value.trim();
    
    if(!nameVal) {
        document.getElementById("name-error-msg").classList.remove("hide");
        return;
    }
    document.getElementById("name-error-msg").classList.add("hide");
    
    userProgress.studentName = nameVal;
    saveProgress();
    
    currentExamQIdx = 0;
    examSecondsRemaining = 1200;
    buildExamQuestions();
    
    examAnswers = Array(20).fill(null);
    
    document.querySelector(".exam-setup-box").classList.add("hide");
    document.getElementById("exam-stage-panel").classList.remove("hide");
    document.getElementById("exam-results-panel").classList.add("hide");
    
    document.getElementById("exam-candidate-name").textContent = nameVal;
    document.getElementById("exam-timer-val").textContent = "20:00";
    
    if (examTimerInterval) clearInterval(examTimerInterval);
    examTimerInterval = setInterval(() => {
        examSecondsRemaining--;
        if(examSecondsRemaining <= 0) {
            clearInterval(examTimerInterval);
            finishExam();
        } else {
            const m = Math.floor(examSecondsRemaining/60);
            const s = examSecondsRemaining % 60;
            document.getElementById("exam-timer-val").textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
        }
    }, 1000);
    
    loadExamQuestion(0);
}

// Compile 20 questions from the chapters
function buildExamQuestions() {
    examQuestionsList = [];
    const allQ = [];
    syllabusData.forEach(ch => {
        ch.topics.forEach(t => {
            t.quiz.forEach(q => {
                allQ.push({
                    q: q.q,
                    options: [...q.options],
                    correct: q.correct,
                    exp: q.exp
                });
            });
        });
    });
    
    shuffleArray(allQ);
    
    // Pick 20 questions
    for (let i = 0; i < Math.min(20, allQ.length); i++) {
        const q = allQ[i];
        const optionsWithIndices = q.options.map((opt, idx) => ({ opt, originalIdx: idx }));
        shuffleArray(optionsWithIndices);
        q.options = optionsWithIndices.map(x => x.opt);
        q.correct = optionsWithIndices.findIndex(x => x.originalIdx === q.correct);
        examQuestionsList.push(q);
    }
}

function loadExamQuestion(qIdx) {
    currentExamQIdx = qIdx;
    document.getElementById("exam-q-counter").textContent = `Question ${qIdx + 1} of 20`;
    
    const progressFill = (qIdx / 20) * 100;
    document.getElementById("exam-progress-fill").style.width = `${progressFill}%`;
    
    const q = examQuestionsList[qIdx];
    document.getElementById("exam-question-text").textContent = q.q;
    
    const grid = document.getElementById("exam-options-grid");
    grid.innerHTML = "";
    
    q.options.forEach((opt, idx) => {
        const card = document.createElement("div");
        const select = examAnswers[qIdx] === idx;
        card.className = `exam-option-card ${select ? "selected" : ""}`;
        card.innerHTML = `
            <span class="option-badge">${["A","B","C","D"][idx]}</span>
            <span>${opt}</span>
        `;
        
        card.onclick = () => {
            examAnswers[qIdx] = idx;
            document.querySelectorAll(".exam-option-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
        };
        grid.appendChild(card);
    });
    
    const prev = document.getElementById("exam-prev-btn");
    const next = document.getElementById("exam-next-btn");
    prev.disabled = qIdx === 0;
    next.textContent = qIdx === 19 ? "Submit Examination" : "Next Question";
    
    prev.onclick = () => { loadExamQuestion(qIdx - 1); };
    next.onclick = () => {
        if(qIdx < 19) loadExamQuestion(qIdx + 1);
        else finishExam();
    };
}

function finishExam() {
    clearInterval(examTimerInterval);
    document.getElementById("exam-stage-panel").classList.add("hide");
    document.getElementById("exam-results-panel").classList.remove("hide");
    
    let correct = 0;
    examQuestionsList.forEach((q, idx) => {
        if (examAnswers[idx] === q.correct) correct++;
    });
    
    const pct = Math.round((correct / 20) * 100);
    const passed = pct >= 80;
    
    userProgress.examHighScores["course"] = Math.max(userProgress.examHighScores["course"] || 0, correct);
    saveProgress();
    
    document.getElementById("results-score-text").textContent = `${correct} / 20`;
    document.getElementById("results-percent-text").textContent = `${pct}%`;
    
    const status = document.getElementById("results-status-text");
    const medal = document.getElementById("results-medal-icon");
    const heading = document.getElementById("results-heading");
    const btnCert = document.getElementById("btn-generate-certificate");
    
    if (passed) {
        status.textContent = "PASSED";
        status.className = "val status-pass";
        medal.textContent = "🏆";
        heading.textContent = "Congratulations! You Passed!";
        btnCert.classList.remove("hide");
        btnCert.onclick = () => triggerCertificateModal(correct, pct);
    } else {
        status.textContent = "FAILED";
        status.className = "val status-fail";
        medal.textContent = "❌";
        heading.textContent = "Exam Not Passed";
        btnCert.classList.add("hide");
    }
    
    document.getElementById("btn-exam-reset").onclick = () => {
        selectExamDashboard();
    };
    
    renderDetailedReview();
}

function renderDetailedReview() {
    const list = document.getElementById("exam-review-list");
    list.innerHTML = "";
    
    examQuestionsList.forEach((q, idx) => {
        const item = document.createElement("div");
        const corr = examAnswers[idx] === q.correct;
        item.className = `review-item ${corr ? "correct" : "incorrect"}`;
        
        let choiceHTML = "";
        q.options.forEach((opt, oIdx) => {
            let choiceClass = "";
            if (oIdx === q.correct) choiceClass = "correct";
            else if (oIdx === examAnswers[idx]) choiceClass = "incorrect";
            
            choiceHTML += `
                <div class="review-choice ${choiceClass}">
                    <span class="option-badge">${["A","B","C","D"][oIdx]}</span>
                    <span>${opt}</span>
                </div>
            `;
        });
        
        item.innerHTML = `
            <span class="review-q-num">Question ${idx+1} (${corr ? "Correct" : "Wrong"})</span>
            <h4>${q.q}</h4>
            <div class="review-choices">${choiceHTML}</div>
            <p class="review-exp"><strong>Explanation:</strong> ${q.exp}</p>
        `;
        list.appendChild(item);
    });
}

function triggerCertificateModal(score, pct) {
    document.getElementById("certificate-modal").classList.remove("hide");
    document.getElementById("cert-display-name").textContent = userProgress.studentName;
    document.getElementById("cert-display-chapter").textContent = "Class 8 Social Studies Full Syllabus (Chapters 1-10)";
    
    let grade = "Grade B (Very Good)";
    if(pct >= 95) grade = "Grade A+ (Distinction)";
    else if(pct >= 85) grade = "Grade A (Excellent)";
    document.getElementById("cert-display-grade").textContent = `${grade} with ${pct}%`;
    
    const d = new Date();
    document.getElementById("cert-display-date").textContent = `${d.getDate()} ${["January","February","March","April","May","June","July","August","September","October","November","December"][d.getMonth()]} \${d.getFullYear()}`;
    
    const randID = `SRIV-C10-\${Math.floor(1000 + Math.random()*9000)}-\${Math.floor(1000 + Math.random()*9000)}`;
    document.getElementById("cert-display-uid").textContent = randID;
}