// script.js - Srivardhan Telangana SCERT Class 8 Chapter 1 Interactive Learning Engine

// --- TOPICS DATABASE & SYLLABUS CONTENT ---
const topicsData = [
  {
    title: "Maps vs. Photographs",
    subtitle: "Understanding Cartographic Representation",
    readText: `
      <p>A <span class="keyword" data-tooltip="A representation of a region showing physical, political, or thematic characteristics.">map</span> is a model of the Earth's surface or a part of it. It differs fundamentally from a <span class="keyword" data-tooltip="A realistic image captured by a camera that shows all visible light objects.">photograph</span>. A satellite photograph captures all visible physical details—houses, trees, roads, and clouds—exactly as they appear to a camera lens. However, a map is a selective, symbolic representation.</p>
      <p>A <span class="keyword" data-tooltip="A person who studies and practices the science of map-making.">cartographer</span> (mapmaker) selects only specific details that are relevant to the map's theme, such as rainfall, soil type, or boundaries, and omits the rest. Maps use standard <span class="keyword" data-tooltip="Symbols, colors, and markers that represent objects on maps by mutual agreement.">symbols</span> and colors to represent these selected details. For example, a green patch represent a forest, whereas on a photograph it might just appear as dark green leaves.</p>
      <p>Furthermore, because the Earth is a three-dimensional sphere, representing it on a flat sheet of paper introduces distortions in size, shape, or distance. Cartographers use a mathematical technique called <span class="keyword" data-tooltip="A method used to represent the curved 3D surface of the Earth on a flat 2D map.">projection</span> to translate the curved surface into a flat layout, sacrificing some aspects of accuracy to maintain others.</p>
    `,
    remember: "A photograph shows everything visible, but a map shows only selected features that are important for its specific purpose. Maps are tools of representation, not just images.",
    funFact: "The earliest surviving map is the Babylonian Map of the World, carved on a clay tablet around 600 BC. It measures only about 12 cm tall and represents the world as a circular disk surrounded by water.",
    realLife: "If you open Google Maps and switch to 'Satellite View', you see actual houses, cars, and trees (a photo). Switch to 'Map View', and the houses disappear, replaced by yellow roads, blue rivers, and colored polygons. This simplified view is much easier to navigate!",
    vocab: [
      { word: "Cartography", definition: "The science, art, and practice of making maps." },
      { word: "Projection", definition: "A mathematical formula used to convert the Earth's spherical surface into a flat map." },
      { word: "Thematic Map", definition: "A map designed to illustrate a particular theme or topic, such as rainfall or density." },
      { word: "Symbolism", definition: "The use of simplified drawings, lines, or colors to represent real-life features." },
      { word: "Scale", definition: "The ratio of a distance on the map to the corresponding distance on the ground." }
    ],
    summary: [
      "A photograph shows all real-world details, while a map is highly selective.",
      "Maps use symbols, colors, and keys to simplify complex geographic layouts.",
      "A map focuses on a specific purpose or theme, making it a model rather than an image.",
      "Representing the 3D spherical Earth on 2D flat paper always causes some distortion.",
      "Cartographic projections are mathematical systems used to minimize these distortions."
    ],
    flashcards: [
      { word: "Cartography", definition: "The science and art of drawing maps." },
      { word: "Map", definition: "A selective, symbolic representation of a place on a flat surface." },
      { word: "Photograph", definition: "A realistic image of a scene captured by a camera." },
      { word: "Projection", definition: "The method of flattening a sphere into a map sheet." },
      { word: "Thematic Focus", definition: "Selecting only one topic (like rainfall or crops) to show on a map." }
    ],
    quiz: [
      {
        question: "What is the primary difference between a map and a photograph?",
        options: [
          "A map is black and white, while a photograph is always colored.",
          "A map shows only selected details for a theme, whereas a photograph captures all visible features.",
          "A photograph is more accurate for measuring long-distance spherical coordinates.",
          "Maps cannot represent roads or buildings, but photographs can."
        ],
        answerIndex: 1,
        explanation: "A map is a selective model that shows specific thematic features using symbols, while a photograph captures all visible physical details."
      },
      {
        question: "Who is a cartographer?",
        options: [
          "A scientist who studies rock formations.",
          "A professional who takes aerial photographs from planes.",
          "A person who designs and constructs maps.",
          "A surveyor who measures mountain elevations."
        ],
        answerIndex: 2,
        explanation: "Cartographer is the term for a mapmaker, derived from the French word 'carte' (map) and Greek 'graphia' (writing)."
      },
      {
        question: "Why does converting a globe into a flat map introduce errors?",
        options: [
          "Because paper is not strong enough to hold geographical data.",
          "Because you cannot represent a 3D sphere perfectly on a 2D flat surface without distortion.",
          "Because the Earth is expanding, making maps outdated instantly.",
          "Because different countries use different scales."
        ],
        answerIndex: 1,
        explanation: "It is mathematically impossible to flatten a sphere (3D) onto a plane (2D) without stretching, tearing, or distorting shapes, sizes, or distances."
      },
      {
        question: "Which of the following is NOT typically shown on a standard thematic road map?",
        options: [
          "Clouds and weather patterns at the moment of viewing",
          "Major state highways",
          "Interstate boundaries",
          "Distances between towns"
        ],
        answerIndex: 0,
        explanation: "Thematic road maps focus on static navigation routes. Dynamic elements like clouds are only captured by aerial photographs or weather maps."
      },
      {
        question: "What is 'Map Projection'?",
        options: [
          "A slide presentation showing ancient historical maps.",
          "A method of predicting future changes in country borders.",
          "A mathematical technique to translate the curved Earth onto a flat map.",
          "The shadow cast by a globe when light is shone through it."
        ],
        answerIndex: 2,
        explanation: "Map projection is the systematic and mathematical drawing of the Earth's grid lines (meridians and parallels) onto a flat surface."
      }
    ]
  },
  {
    title: "History of Map-Making",
    subtitle: "From Clay Tablets to Mercator Grid",
    readText: `
      <p>Map-making has evolved over thousands of years. Around 4000 years ago, the <span class="keyword" data-tooltip="An ancient civilization in Mesopotamia (modern Iraq) known for early writing.">Sumerians</span> made maps on clay tablets to record land ownership for tax collections. Later, <span class="keyword" data-tooltip="An ancient empire centered in Mesopotamia; creators of the oldest surviving world map.">Babylonian</span> clay maps represented the world as a flat disk surrounded by a 'Bitter River' (ocean), with Babylon placed at the absolute center.</p>
      <p>Ancient Greek geographers made map-making scientific. Geographers like <span class="keyword" data-tooltip="An ancient Greek philosopher credited with drawing the first map of the world.">Anaximander</span> and <span class="keyword" data-tooltip="An early Greek geographer who divided the world into Europe, Asia, and Libya.">Hecataeus</span> drew maps dividing the world into three continents: Europe, Asia, and Libya (Africa). <span class="keyword" data-tooltip="A Greek mathematician who laid the grid lines of latitude and longitude.">Ptolemy</span> revolutionized cartography by establishing the grid system of latitude and longitude, allowing specific coordinates to pin locations.</p>
      <p>During the medieval era, cultural perspectives shaped mapping. The Arab geographer <span class="keyword" data-tooltip="A medieval Muslim cartographer who built a detailed world map in 1154 AD.">Al-Idrisi</span> drew a famous world map in 1154 AD for King Roger II of Sicily, putting **South at the top** of the map. In contrast, European maps of the same era (like Hereford Mappa Mundi) placed East at the top, centering Jerusalem. In 1569 AD, Dutch cartographer <span class="keyword" data-tooltip="A Flemish geographer who designed the navigation map projection still used today.">Gerardus Mercator</span> solved navigation problems by creating the Mercator Projection, showing lines of latitude and longitude crossing at 90-degree angles. This allowed sailors to steer ships in straight lines using constant compass directions.</p>
    `,
    remember: "Ancient maps were not drawn for accuracy, but reflected religious beliefs, political power, trade interests, or navigation needs of their creators.",
    funFact: "In Al-Idrisi's map, South is placed at the top because Islamic scholars of Spain and North Africa at the time associated the South (the direction of Mecca for many of them) with the upper half of their horizons.",
    realLife: "The maps you see in modern schools have North at the top. But this is just a cartographic convention! If you rotate a map upside-down, it is still 100% geographically correct. It just looks unusual because we are trained to expect North at the top.",
    vocab: [
      { word: "Cuneiform", definition: "The wedge-shaped writing system used by ancient Sumerians on clay tablets." },
      { word: "Mappa Mundi", definition: "A medieval European map of the world, often containing religious illustrations." },
      { word: "Latitude", definition: "Horizontal imaginary lines running parallel to the equator, measuring north-south position." },
      { word: "Longitude", definition: "Vertical imaginary lines running from pole to pole, measuring east-west position." },
      { word: "Rhumb Line", definition: "A line on a map that crosses all meridians at the same angle, showing constant compass direction." }
    ],
    summary: [
      "Sumerians mapped boundaries on clay tablets to record land revenues for tax administration.",
      "Babylonians represented the world as a disk bordered by a 'Bitter River'.",
      "Greeks scientific geographers introduced latitude and longitude coordinate grids.",
      "Al-Idrisi's medieval map placed South at the top, showing Islamic cultural influence.",
      "Mercator's 1569 projection preserved angles, making it a critical tool for maritime navigators."
    ],
    flashcards: [
      { word: "Sumerians", definition: "First to map boundaries on clay tablets for tax tracking." },
      { word: "Al-Idrisi", definition: "Arab cartographer who placed South at the top of his 1154 AD map." },
      { word: "Ptolemy", definition: "Greek scholar who created the coordinate system of latitude and longitude." },
      { word: "Gerardus Mercator", definition: "Flemish cartographer who solved ship navigation grids in 1569." },
      { word: "Bitter River", definition: "The outer ocean surrounding the world in Babylonian belief." }
    ],
    quiz: [
      {
        question: "Why did Sumerians draw early maps on clay tablets?",
        options: [
          "To predict volcanic eruptions.",
          "To record land holdings for revenue and tax tracking.",
          "To document star constellations for sailors.",
          "To show routes for religious pilgrimages."
        ],
        answerIndex: 1,
        explanation: "Sumerians (in Mesopotamia) created map records of agricultural plots to determine ownership boundaries and calculate taxes."
      },
      {
        question: "In which medieval map was South placed at the top of the world?",
        options: [
          "The Hereford Mappa Mundi",
          "Ptolemy's Greek World Map",
          "Al-Idrisi's map drawn for King Roger II",
          "Sumerian boundary stones"
        ],
        answerIndex: 2,
        explanation: "Al-Idrisi's map of 1154 AD put South at the top, a common cartographic convention in medieval Islamic geography."
      },
      {
        question: "What major cartographic contribution is Ptolemy known for?",
        options: [
          "Carving the first map on stone tablets.",
          "Introducing latitude and longitude grid systems for precise coordinate mapping.",
          "inventing the magnetic compass.",
          "Creating the first physical relief maps using colors."
        ],
        answerIndex: 1,
        explanation: "Ptolemy was a Greek mathematician/astronomer who calculated the positions of places on Earth using latitude and longitude lines."
      },
      {
        question: "What is the primary benefit of the Mercator Projection (1569)?",
        options: [
          "It shows the correct size of polar regions like Greenland.",
          "It enables ships to navigate along constant compass bearings (straight lines).",
          "It represents the depth of the oceans using contour lines.",
          "It displays the distribution of global population density."
        ],
        answerIndex: 1,
        explanation: "Gerardus Mercator designed a cylinder-wrapped map projection where compass bearings remain straight lines, making ocean travel safe."
      },
      {
        question: "How did the ancient Babylonian world map represent the shape of the world?",
        options: [
          "As an infinite flat square with four corner pillars.",
          "As a round sphere floating in a solar system.",
          "As a flat circular disk surrounded by a 'Bitter River'.",
          "As a series of nested triangles."
        ],
        answerIndex: 2,
        explanation: "The Babylonian world map depicts a circular plane surrounded by a ring of salt water (Bitter River), with Babylon in the center."
      }
    ]
  },
  {
    title: "Maps in the Colonial Era",
    subtitle: "Mapping for Exploration and Conquest",
    readText: `
      <p>During the 15th to 19th centuries, European powers colonized vast parts of the world. Detailed maps became strategic tools for military conquest, political administration, and resource extraction. Knowing where rivers flowed, where timber existed, and how local populations were laid out allowed colonizers to exploit territories more efficiently than using army weapons alone.</p>
      <p>In India, the British East India Company established the <span class="keyword" data-tooltip="The oldest scientific department of the Government of India, tasked with surveying the land.">Survey of India</span>. In 1767, Robert Clive appointed <span class="keyword" data-tooltip="The first Surveyor General of India, who mapped Bengal and created early maps of Hindoostan.">James Rennell</span> as the first Surveyor General of India. Rennell spent years surveying routes and river systems to build the first comprehensive map of 'Hindoostan'.</p>
      <p>In 1802, the British launched the historic <span class="keyword" data-tooltip="A scientific project to measure the length of India and determine the spherical shape of the Earth.">Great Trigonometrical Survey</span>. Initiated by <span class="keyword" data-tooltip="A British surveyor who began the Great Trigonometrical Survey of India.">William Lambton</span> from Madras, this project mapped the subcontinent using a process called **triangulation** (measuring angles using a transit <span class="keyword" data-tooltip="An angle-measuring instrument used in surveying to establish grids.">theodolite</span>). This survey was completed by <span class="keyword" data-tooltip="The Surveyor General who completed the mapping of the Himalayas and calculated the height of Mt. Everest.">George Everest</span>, mapping the tallest peak in the Himalayas, which was later named in his honor.</p>
    `,
    remember: "Colonial mapping was not just about science; it was an exercise in power. Detailed maps allowed foreign empires to claim ownership, build railroads, extract timber, and collect taxes systematically.",
    funFact: "The Great Trigonometrical Survey of India took over 60 years to complete. The iron transit theodolite instrument used by Lambton weighed over 450 kilograms and had to be carried up hills by teams of 12 men!",
    realLife: "Think of how modern businesses decide where to open a shop. They look at map data of traffic, income levels, and competitors. In the same way, the British used maps to spot where high-quality cotton or coal was located to build railway lines straight to those spots.",
    vocab: [
      { word: "Surveying", definition: "The measurement of dimensional relationships (distances, directions, elevations) on the Earth's surface." },
      { word: "Triangulation", definition: "A surveying method that measures angles in a network of triangles to calculate precise locations." },
      { word: "Theodolite", definition: "A precision optical instrument used to measure horizontal and vertical angles." },
      { word: "Colonialism", definition: "The practice of acquiring political control over another country, occupying it, and exploiting it economically." },
      { word: "Subcontinent", definition: "A large, distinguishable part of a continent, such as India." }
    ],
    summary: [
      "European colonizers used maps as instruments of political control, navigation, and resource extraction.",
      "James Rennell was appointed as India's first Surveyor General in 1767 to map Bengal and routes.",
      "The Great Trigonometrical Survey (GTS) was started in 1802 to map India with mathematical rigor.",
      "Surveyors used triangulation, measuring angles with heavy steel theodolites across base towers.",
      "George Everest completed the survey, mapping the Himalayas and measuring Mount Everest."
    ],
    flashcards: [
      { word: "James Rennell", definition: "Appointed as the first Surveyor General of India in 1767." },
      { word: "William Lambton", definition: "Began the Great Trigonometrical Survey from Madras in 1802." },
      { word: "George Everest", definition: "Completed the survey of India and measured the highest Himalayan peak." },
      { word: "Triangulation", definition: "A geometric technique of measuring angles to calculate large distances." },
      { word: "Theodolite", definition: "The heavy surveying instrument used to measure angles in the GTS." }
    ],
    quiz: [
      {
        question: "Why did European colonial powers value detailed maps so highly?",
        options: [
          "To print and sell them to tourists.",
          "To locate minerals, timber, crops, and layout pathways for conquest and administration.",
          "To trace the historical migrations of ancient kings.",
          "To establish nature parks across their empires."
        ],
        answerIndex: 1,
        explanation: "Maps gave colonizers vital spatial intelligence on resource locations (forests, mines) and trade routes, helping them control and exploit territories."
      },
      {
        question: "Who was the first Surveyor General of India?",
        options: [
          "William Lambton",
          "George Everest",
          "James Rennell",
          "Robert Clive"
        ],
        answerIndex: 2,
        explanation: "James Rennell was appointed by Robert Clive in 1767 as the first Surveyor General of India to map Bengal and other parts."
      },
      {
        question: "The Great Trigonometrical Survey of India began in 1802 from which location?",
        options: [
          "Calcutta (Kolkata)",
          "Madras (Chennai)",
          "Bombay (Mumbai)",
          "Delhi"
        ],
        answerIndex: 1,
        explanation: "William Lambton began the Great Trigonometrical Survey from Madras (specifically near St. Thomas Mount) in 1802."
      },
      {
        question: "What is 'Triangulation' in surveying?",
        options: [
          "Dividing land into three parts for tax collection.",
          "Using a three-legged compass to draw circular boundaries.",
          "Measuring angles of triangles to calculate distances between coordinates.",
          "A method of building triangular watchtowers."
        ],
        answerIndex: 2,
        explanation: "Triangulation is a mathematical surveying method that calculates coordinates by measuring angles from known points in a grid of triangles."
      },
      {
        question: "For what achievement is Sir George Everest famous?",
        options: [
          "He designed the first steam engine in India.",
          "He completed the Great Trigonometrical Survey and measured the heights of the Himalayas.",
          "He was the first British governor of Hyderabad.",
          "He invented the Mercator map projection."
        ],
        answerIndex: 1,
        explanation: "George Everest succeeded William Lambton as Superintendent of the GTS, mapping the northern ranges and measuring the tallest peaks."
      }
    ]
  },
  {
    title: "Reading Thematic Maps",
    subtitle: "Decoding Relief, Rainfall, and Population Grids",
    readText: `
      <p>Maps can be divided into general-purpose maps and **thematic maps**. General maps show basic features like roads, towns, and political boundaries. Thematic maps, on the other hand, focus on a single theme or topic, such as rainfall distribution, soil classifications, or mineral deposits.</p>
      <p>A <span class="keyword" data-tooltip="A map representing the physical topography and heights of land features.">physical map</span> shows relief (land elevations and shapes) using color conventions. The standard system uses green for low plains (0 to 150 meters above sea level), yellow/orange for plateaus, and dark brown for high mountains. These colors show relief zones clearly.</p>
      <p>Other thematic maps show density using shades of color. A **population density** map shows the concentration of people per square kilometer. Cartographers divide values into ranges and assign lighter shades for sparse areas and darker shades (like red or dark blue) for high density. This representation style is called a <span class="keyword" data-tooltip="A thematic map that uses colors or patterns to show values of a variable in geographical regions.">choropleth map</span>. To read these maps accurately, the reader must consult the map's **Legend** or Key, which defines what each color shade represents.</p>
    `,
    remember: "Color codes on physical maps represent altitude above sea level, not the color of the soil. Green indicates flat plains, even if the region is a desert!",
    funFact: "Telangana is located on the Deccan Plateau. Therefore, physical relief maps represent most of Telangana using shades of yellow and light orange, showing its elevation range of 300 to 600 meters.",
    realLife: "Look at a rainfall map of India. The Western Ghats and Northeast states are colored deep blue (high rainfall), while Rajasthan is colored pale yellow (low rainfall). This shows at a glance where agricultural crops like rice (needs lots of water) or millet (needs less water) can grow.",
    vocab: [
      { word: "Relief Map", definition: "A map showing physical landforms and variations in elevation above sea level." },
      { word: "Choropleth", definition: "A mapping technique that colors geographic units based on a statistics range." },
      { word: "Legend", definition: "The key on a map explaining the meanings of the symbols and colors used." },
      { word: "Population Density", definition: "The measurement of population per unit area (typically people per square kilometer)." },
      { word: "Conventions", definition: "Standard symbols or colors universally agreed upon by cartographers." }
    ],
    summary: [
      "Thematic maps are designed to show a specific subject (such as temperature, vegetation, or crops).",
      "Physical maps show land relief (plains, plateaus, mountains) using standard elevation colors.",
      "Green represents low plains, yellow represents plateaus, and brown represents mountains.",
      "Choropleth mapping uses progressive color shades to represent statistical ranges like population.",
      "The map Legend is essential for translating color codes into actual numerical ranges."
    ],
    flashcards: [
      { word: "Physical Map", definition: "Shows land relief, heights, and physical structures." },
      { word: "Green color", definition: "Universal map convention for low elevation plains (0-150m)." },
      { word: "Yellow color", definition: "Universal map convention for tablelands and plateaus (150-600m)." },
      { word: "Choropleth", definition: "A map using lighter and darker shades to show statistics ranges." },
      { word: "Legend / Key", definition: "The guidebook box explaining symbols and colors on a map." }
    ],
    quiz: [
      {
        question: "What is the main focus of a thematic map?",
        options: [
          "To show as many details as possible, including trees and buildings.",
          "To illustrate a single, specific theme or aspect (like rainfall or soil type).",
          "To map outer space and stars.",
          "To show ship directions on oceans."
        ],
        answerIndex: 1,
        explanation: "Thematic maps are specialized maps that show the distribution of a single topic or attribute in a region."
      },
      {
        question: "On a standard physical relief map, what geographic feature is represented by the color Green?",
        options: [
          "Forests and dense vegetation",
          "Lowland plains and river basins (low elevation)",
          "Agricultural fields growing green crops",
          "Wetlands and swamp regions"
        ],
        answerIndex: 1,
        explanation: "By global convention, green represents low-lying flat plains (0 to 150m above sea level) on a physical relief map."
      },
      {
        question: "What method does a 'Choropleth' map use to display statistical variations?",
        options: [
          "Drawing actual tiny figures of people on the map.",
          "Using lighter and darker shades of a color to represent data ranges.",
          "Connecting places of equal atmospheric pressure with lines.",
          "Displaying 3D bars directly on the paper."
        ],
        answerIndex: 1,
        explanation: "Choropleth maps use color shading gradients (darker representing higher values, lighter representing lower values) to display statistical data."
      },
      {
        question: "Why does most of Telangana appear yellow-orange on a physical map of India?",
        options: [
          "Because it is covered by desert sands.",
          "Because it has very low rainfall.",
          "Because it sits on the Deccan Plateau, which has a moderate elevation (300m - 600m).",
          "Because it has massive gold mines."
        ],
        answerIndex: 2,
        explanation: "Telangana is situated on the Deccan Plateau. Yellow/light-orange is the cartographic standard for elevations between 150m and 600m."
      },
      {
        question: "What is the purpose of a map's 'Legend'?",
        options: [
          "To tell historical myths about the region's origin.",
          "To serve as a compass showing directions.",
          "To explain the meanings of the symbols and colors used on the map.",
          "To document the surveyor's name and date."
        ],
        answerIndex: 2,
        explanation: "The Legend (or Key) is the map's dictionary, showing symbols, colors, and textures alongside their meaning."
      }
    ]
  },
  {
    title: "Contour Lines and Relief",
    subtitle: "Decoding Elevation and Slopes on 2D Paper",
    readText: `
      <p>Representing three-dimensional height (relief) on flat paper is a classic cartographic challenge. Cartographers solve this by using <span class="keyword" data-tooltip="An imaginary line on a map that joins points of equal elevation above sea level.">contour lines</span>. A contour line connects all places on the map that have the exact same height above sea level.</p>
      <p>The layout and spacing of contour lines reveal the shape of the land:</p>
      <ul>
        <li>**Steep Slopes:** When contour lines are drawn **close to each other**, it indicates that the height changes rapidly over a short horizontal distance, showing a steep slope.</li>
        <li>**Gentle Slopes:** When contour lines are **spaced far apart**, it shows that the height rises slowly over a large distance, representing a gentle slope.</li>
      </ul>
      <p>Contour lines possess unique mathematical traits. They never cross or intersect one another because a single physical spot cannot have two different heights. The height difference between two consecutive contour lines is constant and is known as the **contour interval** (e.g., 20 meters, 50 meters). These lines help plan roads, dams, and layouts without physically visiting the site.</p>
    `,
    remember: "Contour lines never intersect, loop into a single line, or branch. They must form closed loops, though the loop might extend beyond the margins of the map.",
    funFact: "Civil engineers use contour maps to calculate how much soil needs to be dug up or filled when laying railway tracks or constructing dams. They can do these complex math formulas directly from the map office!",
    realLife: "Imagine hiking up a hill. If you walk along a path that circles the hill at the exact same height without going up or down, you are walking along a real-life contour line. If you walk straight up to the peak, you are crossing contour lines at a 90-degree angle!",
    vocab: [
      { word: "Contour Line", definition: "A line on a map connecting points of equal height above sea level." },
      { word: "Contour Interval", definition: "The constant difference in height between two adjacent contour lines." },
      { word: "Steep Slope", definition: "An incline where elevation increases rapidly over a short distance." },
      { word: "Gentle Slope", definition: "A mild incline where elevation increases slowly over a long distance." },
      { word: "Cross-Section", definition: "A side-profile drawing showing the shape of a landform slice." }
    ],
    summary: [
      "Contour lines represent three-dimensional land elevation on a flat two-dimensional map.",
      "A contour line joins points that have the same height above sea level.",
      "Closely spaced contour lines indicate steep slopes; widely spaced lines indicate gentle slopes.",
      "Contour lines never cross or overlap because a single point has only one elevation value.",
      "Contour intervals remain constant across a map, showing a fixed elevation step."
    ],
    flashcards: [
      { word: "Contour Line", definition: "A line linking points of equal height above sea level." },
      { word: "Steep Slope", definition: "Shown on a map by contour lines drawn very close together." },
      { word: "Gentle Slope", definition: "Shown on a map by contour lines spaced far apart." },
      { word: "Contour Interval", definition: "The constant vertical height difference between two adjacent contour lines." },
      { word: "No Crossing", definition: "The rule that contour lines can never intersect because one spot cannot have two heights." }
    ],
    quiz: [
      {
        question: "What is a contour line?",
        options: [
          "A line showing state border divisions.",
          "An imaginary line on a map joining points of equal height above sea level.",
          "A line showing temperature zones.",
          "The shortest path between two villages."
        ],
        answerIndex: 1,
        explanation: "By definition, a contour line connects points of equal elevation above sea level."
      },
      {
        question: "If contour lines are spaced very far apart on a map, what does it tell you?",
        options: [
          "The terrain is extremely steep.",
          "The region has a flat or gentle slope.",
          "There is a deep canyon or cliff.",
          "The map is drawn to a very small scale."
        ],
        answerIndex: 1,
        explanation: "Widely spaced contour lines mean the elevation changes slowly over a horizontal distance, which indicates flat land or a gentle slope."
      },
      {
        question: "Why can contour lines never cross or intersect on a map?",
        options: [
          "Because it is bad cartographic luck.",
          "Because a single physical coordinate cannot have two different heights.",
          "Because lines would smudge during printing.",
          "Because different countries measure heights differently."
        ],
        answerIndex: 1,
        explanation: "Since a point on Earth can only have one elevation value, contour lines representing different heights cannot cross."
      },
      {
        question: "What is the 'Contour Interval'?",
        options: [
          "The distance in kilometers between two contour paths.",
          "The time taken by a surveyor to measure a hill.",
          "The constant height difference between two consecutive contour lines.",
          "The slope angle of a hill peak."
        ],
        answerIndex: 2,
        explanation: "The contour interval is the fixed vertical distance (e.g. 50m, 100m) chosen between successive contour lines on a map."
      },
      {
        question: "How would a vertical cliff be represented by contour lines?",
        options: [
          "The contour lines would run in perfectly straight parallel lines.",
          "The contour lines would run together, merging or touching at the cliff edge.",
          "No contour lines would be drawn in that region.",
          "A single circle in the center of the cliff."
        ],
        answerIndex: 1,
        explanation: "For a vertical cliff, the heights are vertically stacked, meaning the contour lines would touch or merge at that location on the map."
      }
    ]
  }
];

// --- 20 UNIQUE FINAL TEST QUESTIONS ---
const finalTestQuestions = [
  {
    question: "Which of the following is a primary characteristic of a map, as opposed to a photograph?",
    options: [
      "It captures weather clouds and moving vehicles.",
      "It is a realistic image showing exact colors of trees.",
      "It selectively represents features based on a specific theme using symbols.",
      "It is captured by a camera lens in real-time."
    ],
    answerIndex: 2,
    explanation: "Maps are models created for specific purposes, showing only selected features using symbols, while photographs capture all visible features."
  },
  {
    question: "Why must cartographers use mathematical projections?",
    options: [
      "To calculate the total cost of printing maps.",
      "To translate the 3D spherical Earth onto a flat 2D sheet of paper.",
      "To measure the height of mountain peaks above sea level.",
      "To determine historical boundaries of ancient empires."
    ],
    answerIndex: 1,
    explanation: "A map projection is a mathematical method for transferring grid coordinates from a spherical surface (globe) to a flat sheet."
  },
  {
    question: "Sumerians created early maps on clay tablets around 4000 years ago primarily to:",
    options: [
      "Plan long sea voyages to Greece.",
      "Record agricultural boundaries and calculate land revenues for taxes.",
      "Document constellations and star positions.",
      "Draw political maps of the entire world."
    ],
    answerIndex: 1,
    explanation: "Sumerians needed land ownership records to calculate land tax revenues from farming plots."
  },
  {
    question: "In the ancient Babylonian World Map, what was represented as surrounding the circular land disk?",
    options: [
      "High mountain ranges",
      "A Bitter River (Ocean)",
      "Unexplored dark clouds",
      "A wall of clay bricks"
    ],
    answerIndex: 1,
    explanation: "The Babylonians believed the flat circular earth was surrounded by a ring of salt water called the 'Bitter River'."
  },
  {
    question: "Which Greek cartographer first introduced coordinate grids of latitudes and longitudes to locate places?",
    options: [
      "Hecataeus",
      "Anaximander",
      "Ptolemy",
      "Aristotle"
    ],
    answerIndex: 2,
    explanation: "Ptolemy calculated coordinates for places worldwide using lines of latitude and longitude on his maps."
  },
  {
    question: "In Al-Idrisi's map drawn for the King of Sicily in 1154 AD, what orientation was used?",
    options: [
      "North was at the top.",
      "East was at the top.",
      "South was at the top.",
      "West was at the top."
    ],
    answerIndex: 2,
    explanation: "Al-Idrisi oriented his map with South at the top, which was a standard convention in medieval Islamic cartography."
  },
  {
    question: "Why did European colonial powers place such a high priority on creating detailed maps?",
    options: [
      "To showcase scientific advancements in school books.",
      "To identify trade routes, paths, and exploit resources like timber and minerals.",
      "To trace the genealogy of foreign royal families.",
      "To build tourist resorts in tropical regions."
    ],
    answerIndex: 1,
    explanation: "Colonizers needed spatial resource data to administer regions, establish trade lines, and extract wealth."
  },
  {
    question: "Who was appointed by Robert Clive in 1767 as the first Surveyor General of India?",
    options: [
      "James Rennell",
      "William Lambton",
      "George Everest",
      "Warren Hastings"
    ],
    answerIndex: 0,
    explanation: "James Rennell was appointed as Surveyor General to map Bengal and build route maps for the East India Company."
  },
  {
    question: "What was the primary goal of the Great Trigonometrical Survey of India started in 1802?",
    options: [
      "To discover oil and gold mines.",
      "To mathematically map the subcontinent and measure the Earth's curvature.",
      "To count the population of India.",
      "To construct a railway line from Madras to Delhi."
    ],
    answerIndex: 1,
    explanation: "The GTS aimed to scientifically map the entire subcontinent and measure the Earth's physical curvature using triangulation."
  },
  {
    question: "Which surveying method was used by William Lambton and George Everest in the Great Survey?",
    options: [
      "Triangulation (measuring angles using a theodolite)",
      "Satellite GPS surveying",
      "Aerial photography",
      "Tracing trade routes with measuring chains only"
    ],
    answerIndex: 0,
    explanation: "Triangulation, measuring horizontal/vertical angles between towers using a heavy transit theodolite, was the main method of the GTS."
  },
  {
    question: "Which geographic features are shown on a physical map?",
    options: [
      "Rainfall and weather lines",
      "Land relief, elevation, plateaus, and plains",
      "State electoral boundaries and districts",
      "Language distributions and populations"
    ],
    answerIndex: 1,
    explanation: "Physical maps depict natural features like mountains, plains, plateaus, and rivers, showing land relief."
  },
  {
    question: "What is the standard map convention for representing lands between 150 and 600 meters (plateaus) on physical relief maps?",
    options: [
      "Green",
      "Blue",
      "Yellow/Orange",
      "Dark Brown"
    ],
    answerIndex: 2,
    explanation: "Plains (0-150m) are green, plateaus (150-600m) are yellow/orange, and high mountains are brown."
  },
  {
    question: "What is a Choropleth map?",
    options: [
      "A map showing the shapes of stars.",
      "A thematic map that uses colors or shading to represent statistical values in regions.",
      "A map showing shipping trade lanes.",
      "A map showing underwater cave systems."
    ],
    answerIndex: 1,
    explanation: "Choropleth maps represent data ranges (e.g. population density) by coloring regions in light-to-dark shading gradients."
  },
  {
    question: "If you want to know the population density of a region, what does that statistic measure?",
    options: [
      "The total height of the buildings in the cities.",
      "The number of families living in the capital.",
      "The average number of people living per square kilometer of land area.",
      "The total population divided by the birth rate."
    ],
    answerIndex: 2,
    explanation: "Population density represents the concentration of people, calculated as total population divided by land area in sq.km."
  },
  {
    question: "What maps focus on a single specific theme, like crop distribution, rainfall, or minerals?",
    options: [
      "Political Maps",
      "Thematic Maps",
      "Physical Maps",
      "Topographic Sheets"
    ],
    answerIndex: 1,
    explanation: "Maps designed to illustrate a single subject or theme are called thematic maps."
  },
  {
    question: "What is a contour line?",
    options: [
      "A line showing areas with the same annual rainfall.",
      "An imaginary line on a map connecting points of equal height above sea level.",
      "A line showing timezone splits.",
      "A route used by ancient explorers."
    ],
    answerIndex: 1,
    explanation: "Contour lines join places on the map that have the exact same elevation above sea level."
  },
  {
    question: "When contour lines are spaced very close together on a map, it indicates:",
    options: [
      "The land is perfectly flat.",
      "A very steep slope.",
      "A low-lying river basin.",
      "A boundary between two states."
    ],
    answerIndex: 1,
    explanation: "Closely spaced lines mean height increases/decreases rapidly over a short horizontal distance, representing a steep slope."
  },
  {
    question: "Why can contour lines never cross or overlap on a map?",
    options: [
      "Because they represent straight boundary fences.",
      "Because a single geographic spot cannot have two different height values.",
      "Because it would make the labels illegible.",
      "Because lines are drawn with different colored pencils."
    ],
    answerIndex: 1,
    explanation: "If contour lines crossed, it would imply that a single coordinate has two different heights simultaneously, which is impossible."
  },
  {
    question: "What does a constant 'contour interval' mean?",
    options: [
      "The distance between grid lines of longitude.",
      "The height difference between two consecutive contour lines remains the same throughout the map.",
      "The time interval between two survey sweeps.",
      "The slope angle remains exactly 45 degrees."
    ],
    answerIndex: 1,
    explanation: "The contour interval is the uniform height step (e.g. 50 meters) separating successive contour lines."
  },
  {
    question: "To steer ships across oceans in straight lines using constant compass directions, sailors relied on maps made with which projection?",
    options: [
      "Ptolemy Projection",
      "Al-Idrisi South-up Projection",
      "Mercator Projection",
      "Babylonian Clay Projection"
    ],
    answerIndex: 2,
    explanation: "Gerardus Mercator's 1569 projection preserves bearings/angles as straight lines, making it the ultimate tool for maritime navigation."
  }
];

// --- APP STATE ENGINE ---
class LearningApp {
  constructor() {
    this.activeTopic = 0;
    this.flowStep = "read";
    
    // Animations & Canvas contexts
    this.watchCanvas = null;
    this.watchCtx = null;
    this.watchAnimId = null;
    this.watchPlaying = false;
    this.watchFrame = 0;

    this.exploreCanvas = null;
    this.exploreCtx = null;
    this.exploreState = {};
    
    // Flashcards status
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;

    // Mini Quiz status
    this.activeMiniQuizQ = 0;
    this.miniQuizAnswers = [];
    
    // Final test status
    this.testActive = false;
    this.testAnswers = Array(20).fill(null);
    this.testTime = 0;
    this.testTimerId = null;

    // Init App
    window.addEventListener("DOMContentLoaded", () => this.init());
  }

  init() {
    // Hide loader
    setTimeout(() => {
      const loader = document.getElementById("loading-screen");
      if (loader) {
        loader.style.opacity = 0;
        setTimeout(() => loader.style.display = "none", 500);
      }
    }, 1000);

    // Setup DOM elements
    this.watchCanvas = document.getElementById("watch-canvas");
    if (this.watchCanvas) this.watchCtx = this.watchCanvas.getContext("2d");

    this.exploreCanvas = document.getElementById("explore-canvas");
    if (this.exploreCanvas) {
      this.exploreCtx = this.exploreCanvas.getContext("2d");
      this.setupExploreListeners();
    }

    // Build sidebar
    this.renderSidebar();
    
    // Load Topic 0
    this.loadTopic(0);
  }

  renderSidebar() {
    const container = document.getElementById("topic-sidebar-menu");
    if (!container) return;
    container.innerHTML = "";
    
    topicsData.forEach((t, index) => {
      const li = document.createElement("li");
      li.className = "topic-item";
      li.innerHTML = `
        <button class="topic-btn ${index === this.activeTopic ? 'active' : ''}" onclick="app.loadTopic(${index})">
          <span class="badge">${index + 1}</span>
          ${t.title}
        </button>
      `;
      container.appendChild(li);
    });
  }

  loadTopic(index) {
    // Stop any running animations
    this.stopWatchAnimation();
    
    this.activeTopic = index;
    this.flowStep = "read";
    
    // Reset indicators
    this.flashcardIndex = 0;
    this.flashcardFlipped = false;
    this.activeMiniQuizQ = 0;
    this.miniQuizAnswers = [];
    
    // Update sidebar layout
    this.renderSidebar();

    // Toggle main viewport view
    document.getElementById("topic-section").style.display = "block";
    document.getElementById("final-test-section").style.display = "none";
    document.getElementById("sidebar-final-test-btn").classList.remove("active");

    // Populate metadata
    document.getElementById("topic-meta-display").innerText = `Topic ${index + 1} of 5`;
    document.getElementById("topic-title-display").innerText = topicsData[index].title;
    document.getElementById("current-active-topic-num").innerText = index + 1;

    // Load content views
    this.renderReadTab();
    this.renderReviseTab();
    
    // Set tab active
    this.setFlowStep("read");
  }

  setFlowStep(step) {
    this.stopWatchAnimation();
    this.flowStep = step;

    // Highlight active tab
    const tabs = ["read", "watch", "explore", "practice", "revise"];
    tabs.forEach(t => {
      const btn = document.getElementById(`tab-${t}`);
      const view = document.getElementById(`view-${t}`);
      if (btn) btn.classList.remove("active");
      if (view) view.classList.remove("active");
    });

    const activeBtn = document.getElementById(`tab-${step}`);
    const activeView = document.getElementById(`view-${step}`);
    if (activeBtn) activeBtn.classList.add("active");
    if (activeView) activeView.classList.add("active");

    // Load visual specific parameters
    if (step === "watch") {
      this.initWatchAnimation();
    } else if (step === "explore") {
      this.initExploreSimulation();
    } else if (step === "practice") {
      this.initMiniQuiz();
    } else if (step === "revise") {
      this.renderFlashcard();
    }

    // Update bottom CTA banner text
    const ctaTitle = document.getElementById("next-step-title-display");
    const ctaBtn = document.getElementById("next-step-action-btn");
    
    if (step === "read") {
      ctaTitle.innerText = "Proceed to Watch Animation";
      ctaBtn.innerText = "Next: Watch";
    } else if (step === "watch") {
      ctaTitle.innerText = "Proceed to Interactive Sandbox";
      ctaBtn.innerText = "Next: Explore";
    } else if (step === "explore") {
      ctaTitle.innerText = "Proceed to Mini Quiz Practice";
      ctaBtn.innerText = "Next: Practice";
    } else if (step === "practice") {
      ctaTitle.innerText = "Proceed to Topic Revision";
      ctaBtn.innerText = "Next: Revise";
    } else if (step === "revise") {
      if (this.activeTopic < 4) {
        ctaTitle.innerText = "Proceed to Next Topic Lesson";
        ctaBtn.innerText = "Next Lesson";
      } else {
        ctaTitle.innerText = "Congratulations! Take the Final Test";
        ctaBtn.innerText = "Start Final Test";
      }
    }
  }

  advanceFlowStep() {
    if (this.flowStep === "read") this.setFlowStep("watch");
    else if (this.flowStep === "watch") this.setFlowStep("explore");
    else if (this.flowStep === "explore") this.setFlowStep("practice");
    else if (this.flowStep === "practice") this.setFlowStep("revise");
    else if (this.flowStep === "revise") {
      if (this.activeTopic < 4) {
        this.loadTopic(this.activeTopic + 1);
      } else {
        this.showFinalTestIntro();
      }
    }
  }

  // --- TAB 1: READ RENDERING ---
  renderReadTab() {
    const data = topicsData[this.activeTopic];
    document.getElementById("read-text-container").innerHTML = data.readText;
    document.getElementById("remember-text").innerText = data.remember;
    document.getElementById("fun-fact-text").innerText = data.funFact;
    document.getElementById("real-life-text").innerText = data.realLife;

    const vocabContainer = document.getElementById("vocab-container");
    vocabContainer.innerHTML = "";
    data.vocab.forEach(v => {
      const card = document.createElement("div");
      card.className = "vocab-card";
      card.innerHTML = `
        <div class="vocab-word">${v.word}</div>
        <div class="vocab-definition">${v.definition}</div>
      `;
      vocabContainer.appendChild(card);
    });
  }

  // --- TAB 2: WATCH ANIMATIONS (CANVAS LOGIC) ---
  initWatchAnimation() {
    this.watchFrame = 0;
    this.watchPlaying = true;
    this.animateWatch();
  }

  toggleWatchAnimation() {
    this.watchPlaying = !this.watchPlaying;
    if (this.watchPlaying) this.animateWatch();
  }

  resetWatchAnimation() {
    this.watchFrame = 0;
    if (!this.watchPlaying) {
      this.watchPlaying = true;
      this.animateWatch();
    }
  }

  stopWatchAnimation() {
    this.watchPlaying = false;
    if (this.watchAnimId) {
      cancelAnimationFrame(this.watchAnimId);
      this.watchAnimId = null;
    }
  }

  animateWatch() {
    if (!this.watchPlaying) return;
    this.renderWatchFrame();
    this.watchFrame++;
    this.watchAnimId = requestAnimationFrame(() => this.animateWatch());
  }

  renderWatchFrame() {
    const ctx = this.watchCtx;
    const w = this.watchCanvas.width;
    const h = this.watchCanvas.height;
    ctx.clearRect(0, 0, w, h);

    // Deep background space/chalkboard style
    ctx.fillStyle = "#0c121e";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    
    // Grid overlay background
    ctx.strokeStyle = "rgba(176, 129, 63, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Add Srivardhan branding text in canvas background
    ctx.fillStyle = "rgba(176, 129, 63, 0.04)";
    ctx.font = "italic 700 36px 'Cormorant Garamond'";
    ctx.textAlign = "center";
    ctx.fillText("SRIVARDHAN", w / 2, h - 30);

    // Render topic-specific watch animations
    switch (this.activeTopic) {
      case 0:
        this.drawTopic1Watch(ctx, w, h);
        break;
      case 1:
        this.drawTopic2Watch(ctx, w, h);
        break;
      case 2:
        this.drawTopic3Watch(ctx, w, h);
        break;
      case 3:
        this.drawTopic4Watch(ctx, w, h);
        break;
      case 4:
        this.drawTopic5Watch(ctx, w, h);
        break;
    }

    ctx.restore();
  }

  drawTopic1Watch(ctx, w, h) {
    // Topic 1: Globe to Flat Map Projection animation
    const cx = w / 2;
    const cy = h / 2;
    const r = 100;
    
    const progress = (this.watchFrame % 300) / 300; // loop animation
    
    ctx.lineWidth = 2;

    if (progress < 0.4) {
      // Phase 1: Spinning 3D Globe
      const rotateAngle = progress * 10 * Math.PI;

      // Draw sphere shadow outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.fillStyle = "#162237";
      ctx.fill();
      ctx.strokeStyle = "#b0813f";
      ctx.stroke();

      // Latitudes
      for (let offset = -80; offset <= 80; offset += 30) {
        const rad = Math.asin(offset / r);
        const ellipseH = r * Math.cos(rad);
        ctx.strokeStyle = "rgba(176, 129, 63, 0.3)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + offset, r * Math.cos(rad), 5, 0, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Longitudes (spinning)
      for (let i = 0; i < 6; i++) {
        const angleOffset = (i * Math.PI / 3) + rotateAngle;
        const width = r * Math.cos(angleOffset);
        if (Math.sin(angleOffset) > 0) {
          ctx.strokeStyle = "rgba(176, 129, 63, 0.4)";
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(width), r, 0, -Math.PI/2, Math.PI/2);
          ctx.stroke();
        }
      }

      // Title tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Spherical Earth (3D Globe)", cx, cy + r + 30);
    } 
    else if (progress >= 0.4 && progress < 0.8) {
      // Phase 2: Stretching / Unwrapping
      const transition = (progress - 0.4) / 0.4; // 0 to 1

      const mapWidth = r * Math.PI * 2 * transition;
      const mapHeight = r * 2;
      const startX = cx - mapWidth / 2;
      const startY = cy - mapHeight / 2;

      // Cylindrical projection wrapping animation
      ctx.strokeStyle = "#b0813f";
      ctx.fillStyle = "#162237";
      ctx.beginPath();
      ctx.rect(startX, startY, mapWidth, mapHeight);
      ctx.fill();
      ctx.stroke();

      // Grid lines drawing gradually
      ctx.strokeStyle = "rgba(176, 129, 63, 0.4)";
      const linesCount = 8;
      for (let i = 0; i <= linesCount; i++) {
        const lx = startX + (mapWidth * i / linesCount);
        ctx.beginPath();
        ctx.moveTo(lx, startY);
        ctx.lineTo(lx, startY + mapHeight);
        ctx.stroke();
      }

      // Horizontal lines
      const hLines = 6;
      for (let j = 0; j <= hLines; j++) {
        const ly = startY + (mapHeight * j / hLines);
        ctx.beginPath();
        ctx.moveTo(startX, ly);
        ctx.lineTo(startX + mapWidth, ly);
        ctx.stroke();
      }

      // Title tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Projecting Curved Grids to Flat Plane...", cx, cy + r + 30);
    } 
    else {
      // Phase 3: Flat Map showing distortion (Greenland vs Africa size distortion demo)
      const startX = cx - 180;
      const startY = cy - 90;
      const mw = 360;
      const mh = 180;

      // Draw flat map background
      ctx.fillStyle = "#162237";
      ctx.fillRect(startX, startY, mw, mh);
      ctx.strokeStyle = "#b0813f";
      ctx.strokeRect(startX, startY, mw, mh);

      // Draw grid
      ctx.strokeStyle = "rgba(176, 129, 63, 0.15)";
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(startX + (mw * i / 10), startY);
        ctx.lineTo(startX + (mw * i / 10), startY + mh);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(startX, startY + (mh * i / 10));
        ctx.lineTo(startX + mw, startY + (mh * i / 10));
        ctx.stroke();
      }

      // Illustrate Greenland (top) and Africa (equator) size distortion
      // Greenland (stetched large)
      ctx.fillStyle = "rgba(192, 92, 70, 0.7)";
      ctx.beginPath();
      ctx.moveTo(startX + mw * 0.35, startY + 20);
      ctx.lineTo(startX + mw * 0.45, startY + 15);
      ctx.lineTo(startX + mw * 0.48, startY + 45);
      ctx.lineTo(startX + mw * 0.38, startY + 50);
      ctx.closePath();
      ctx.fill();
      
      // Africa (realistic smaller comparative scale)
      ctx.fillStyle = "rgba(47, 86, 71, 0.7)";
      ctx.beginPath();
      ctx.moveTo(startX + mw * 0.48, startY + 80);
      ctx.lineTo(startX + mw * 0.58, startY + 82);
      ctx.lineTo(startX + mw * 0.56, startY + 120);
      ctx.lineTo(startX + mw * 0.52, startY + 140);
      ctx.lineTo(startX + mw * 0.49, startY + 105);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "11px 'Plus Jakarta Sans'";
      ctx.textAlign = "left";
      ctx.fillText("Greenland (Looks large due to stretching)", startX + 10, startY + 30);
      ctx.fillText("Africa (Actually 14x larger in reality!)", startX + 10, startY + mh - 20);

      // Title tag
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Completed Flat Mercator Map (Distortion at Poles)", cx, cy + r + 30);
    }
  }

  drawTopic2Watch(ctx, w, h) {
    // Topic 2: Antique map scroll history
    const progress = (this.watchFrame % 450) / 450;
    const cx = w / 2;
    const cy = h / 2;

    if (progress < 0.33) {
      // Sumerian Clay Map view
      ctx.strokeStyle = "#c48f43";
      ctx.lineWidth = 3;
      
      // Clay outline
      ctx.fillStyle = "#8a6635";
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy - 80);
      ctx.quadraticCurveTo(cx - 130, cy + 10, cx - 110, cy + 90);
      ctx.quadraticCurveTo(cx + 20, cy + 100, cx + 110, cy + 80);
      ctx.quadraticCurveTo(cx + 120, cy - 30, cx + 100, cy - 90);
      ctx.quadraticCurveTo(cx - 50, cy - 100, cx - 120, cy - 80);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Incised boundaries
      ctx.strokeStyle = "#4d3618";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 80, cy - 30);
      ctx.lineTo(cx + 80, cy - 30);
      ctx.moveTo(cx - 40, cy + 40);
      ctx.lineTo(cx + 60, cy + 40);
      ctx.moveTo(cx, cy - 70);
      ctx.lineTo(cx, cy + 70);
      ctx.stroke();

      // Cuneiform markings
      ctx.fillStyle = "#2c1c08";
      ctx.font = "14px monospace";
      ctx.fillText("▼▼ ◀▶ ▼", cx - 50, cy - 50);
      ctx.fillText("◀◀ ▼▼", cx + 20, cy + 20);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Ancient Sumerian Clay Tablet (Tax Records, 2000 BC)", cx, cy + 130);
    } 
    else if (progress >= 0.33 && progress < 0.66) {
      // Al-Idrisi Circular Map (South at top)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#c48f43";
      
      // Circular map border
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 90, 0, 2*Math.PI);
      ctx.fillStyle = "#1d293d";
      ctx.fill();
      ctx.stroke();

      // Outer Ocean Ring
      ctx.beginPath();
      ctx.arc(cx, cy - 10, 100, 0, 2*Math.PI);
      ctx.stroke();

      // Sketchy shapes of continents (inverted: Africa at top right, India/Asia top left)
      ctx.fillStyle = "#3e5229";
      ctx.beginPath();
      ctx.arc(cx + 30, cy - 40, 40, 0, Math.PI * 1.5); // Africa
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#2f5647";
      ctx.beginPath();
      ctx.moveTo(cx - 60, cy - 20);
      ctx.quadraticCurveTo(cx - 20, cy + 30, cx - 10, cy - 30);
      ctx.closePath();
      ctx.fill();

      // Labels in Arabic/Latin simulation style
      ctx.fillStyle = "#c48f43";
      ctx.font = "bold 12px serif";
      ctx.fillText("SOUTH (TOP)", cx, cy - 115);
      ctx.fillText("NORTH (BOTTOM)", cx, cy + 110);
      ctx.fillStyle = "#fff";
      ctx.fillText("AFRICA", cx + 20, cy - 40);
      ctx.fillText("EUROPE", cx - 40, cy + 20);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Al-Idrisi's World Map (South Oriented, 1154 AD)", cx, cy + 130);
    } 
    else {
      // Mercator Navigation map grid
      ctx.strokeStyle = "#b0813f";
      ctx.strokeRect(cx - 150, cy - 90, 300, 180);
      ctx.fillStyle = "#162237";
      ctx.fillRect(cx - 150, cy - 90, 300, 180);

      // Grid intersections are at exactly 90 degrees
      ctx.strokeStyle = "rgba(176, 129, 63, 0.3)";
      for (let x = cx - 120; x < cx + 150; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, cy - 90);
        ctx.lineTo(x, cy + 90);
        ctx.stroke();
      }
      for (let y = cy - 70; y < cy + 90; y += 28) {
        ctx.beginPath();
        ctx.moveTo(cx - 150, y);
        ctx.lineTo(cx + 150, y);
        ctx.stroke();
      }

      // Compass Rose
      ctx.fillStyle = "#b0813f";
      ctx.beginPath();
      ctx.arc(cx + 90, cy + 30, 20, 0, 2 * Math.PI);
      ctx.stroke();
      // directional pointer
      ctx.beginPath();
      ctx.moveTo(cx + 90, cy + 15);
      ctx.lineTo(cx + 95, cy + 30);
      ctx.lineTo(cx + 90, cy + 25);
      ctx.lineTo(cx + 85, cy + 30);
      ctx.closePath();
      ctx.fill();

      // Navigation line (straight line crossing grid lines at equal angles)
      ctx.strokeStyle = "#c05c46";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 110, cy + 40);
      ctx.lineTo(cx + 40, cy - 50);
      ctx.stroke();
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "italic 11px 'Plus Jakarta Sans'";
      ctx.fillText("Straight Rhumb Line (Constant Angle)", cx - 110, cy + 60);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("Gerardus Mercator's Navigation Grid (1569 AD)", cx, cy + 130);
    }
  }

  drawTopic3Watch(ctx, w, h) {
    // Topic 3: Triangulation measurement animation
    const progress = (this.watchFrame % 300) / 300;
    const cx = w / 2;
    const cy = h / 2 + 20;

    // Define 3 triangulation towers
    const tA = { x: cx - 150, y: cy + 40, name: "St. Thomas Mount (Madras)" };
    const tB = { x: cx + 150, y: cy + 40, name: "Base Station B" };
    const tC = { x: cx, y: cy - 90, name: "Himalayan Peak Survey" };

    // Draw terrain hills under towers
    ctx.fillStyle = "#1b2a3a";
    ctx.beginPath();
    ctx.moveTo(tA.x - 50, tA.y + 40);
    ctx.lineTo(tA.x, tA.y - 10);
    ctx.lineTo(tA.x + 50, tA.y + 40);
    
    ctx.moveTo(tB.x - 50, tB.y + 40);
    ctx.lineTo(tB.x, tB.y - 10);
    ctx.lineTo(tB.x + 50, tB.y + 40);
    
    ctx.moveTo(tC.x - 80, tC.y + 170);
    ctx.lineTo(tC.x, tC.y - 15);
    ctx.lineTo(tC.x + 80, tC.y + 170);
    ctx.fill();

    // Draw little tower shapes on hills
    [tA, tB, tC].forEach((t, index) => {
      ctx.strokeStyle = "#c48f43";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(t.x - 8, t.y);
      ctx.lineTo(t.x + 8, t.y);
      ctx.lineTo(t.x, t.y - 25);
      ctx.closePath();
      ctx.stroke();

      // Flashlight indicator beacon
      ctx.fillStyle = (progress * 5 % 1 > 0.5) ? "#ff3333" : "#771111";
      ctx.beginPath();
      ctx.arc(t.x, t.y - 27, 3, 0, 2*Math.PI);
      ctx.fill();
    });

    // Draw step-by-step surveying line connections
    ctx.lineWidth = 3;
    if (progress > 0.1) {
      // Draw Baseline A -> B
      ctx.strokeStyle = "#2f5647";
      ctx.beginPath();
      ctx.moveTo(tA.x, tA.y - 25);
      ctx.lineTo(tB.x, tB.y - 25);
      ctx.stroke();
      ctx.fillStyle = "#2f5647";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText("1. Measured Baseline", cx, cy + 60);
    }
    if (progress > 0.4) {
      // Draw Line A -> C
      ctx.strokeStyle = "#b0813f";
      ctx.beginPath();
      ctx.moveTo(tA.x, tA.y - 25);
      ctx.lineTo(tC.x, tC.y - 25);
      ctx.stroke();
      
      // Draw angle arc at A
      ctx.strokeStyle = "#ff9900";
      ctx.beginPath();
      ctx.arc(tA.x, tA.y - 25, 20, -0.4, 0);
      ctx.stroke();
      ctx.fillText("2. Angle A", tA.x + 30, tA.y - 20);
    }
    if (progress > 0.7) {
      // Draw Line B -> C
      ctx.strokeStyle = "#b0813f";
      ctx.beginPath();
      ctx.moveTo(tB.x, tB.y - 25);
      ctx.lineTo(tC.x, tC.y - 25);
      ctx.stroke();

      // Draw angle arc at B
      ctx.strokeStyle = "#ff9900";
      ctx.beginPath();
      ctx.arc(tB.x, tB.y - 25, 20, Math.PI, Math.PI + 0.4);
      ctx.stroke();
      ctx.fillText("3. Angle B", tB.x - 60, tB.y - 20);

      // Fill calculated triangle
      ctx.fillStyle = "rgba(176, 129, 63, 0.15)";
      ctx.beginPath();
      ctx.moveTo(tA.x, tA.y - 25);
      ctx.lineTo(tB.x, tB.y - 25);
      ctx.lineTo(tC.x, tC.y - 25);
      ctx.closePath();
      ctx.fill();
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText("4. Peak Position Calculated!", tC.x, tC.y - 45);
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText("The Great Trigonometrical Triangulation Method", cx, cy - 120);
  }

  drawTopic4Watch(ctx, w, h) {
    // Topic 4: Thematic layers sliding down animation
    const progress = (this.watchFrame % 300) / 300;
    const cx = w / 2;
    const cy = h / 2 - 20;

    // We render isometric layers stacking
    // Layer parameters
    const layerW = 220;
    const layerH = 100;
    
    // Renders 3 layers: 
    // 0: Base outline Map (bottom)
    // 1: Relief colors (middle)
    // 2: Rainfall overlay (top)

    const drawLayerOutline = (x, y, color, titleText) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = "rgba(22, 34, 55, 0.85)";
      ctx.lineWidth = 2;
      
      // Isometric diamond outline
      ctx.beginPath();
      ctx.moveTo(x, y - layerH / 2);
      ctx.lineTo(x + layerW / 2, y);
      ctx.lineTo(x, y + layerH / 2);
      ctx.lineTo(x - layerW / 2, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText(titleText, x + layerW/2 + 20, y + 5);
    };

    // Calculate vertical positions based on progress
    // Layer 1 (Base Map) - Fixed at bottom
    drawLayerOutline(cx, cy + 70, "#5c6b80", "1. Base Political Boundary");
    
    // Layer 2 (Relief) - slides down
    let offset2 = 140 - (140 * Math.min(progress * 1.5, 1));
    drawLayerOutline(cx, cy + 70 - offset2, "#b0813f", "2. Physical Relief Shading");

    // Layer 3 (Rainfall) - slides down later
    let offset3 = 280 - (280 * Math.min(Math.max(progress - 0.3, 0) * 1.5, 1));
    drawLayerOutline(cx, cy + 70 - offset3, "#2f5647", "3. Rainfall Thematic Grid");

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText("How Thematic Maps Separate Data Layers", cx, cy - 100);
  }

  drawTopic5Watch(ctx, w, h) {
    // Topic 5: Contour Line profile slicing animation
    const progress = (this.watchFrame % 300) / 300;
    const cx = w / 2;
    const cy = h / 2 - 30;

    // Draw 3D Hill shape (front profile)
    ctx.strokeStyle = "#5c6b80";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 150, cy + 100);
    ctx.quadraticCurveTo(cx - 80, cy + 100, cx - 40, cy - 10); // steep left slope
    ctx.quadraticCurveTo(cx, cy - 80, cx + 20, cy - 80); // flat peak
    ctx.quadraticCurveTo(cx + 80, cy - 80, cx + 150, cy + 100); // gentle right slope
    ctx.stroke();

    // Slicing planes at specific heights
    const slices = [
      { y: cy + 60, heightText: "100 meters" },
      { y: cy + 10, heightText: "200 meters" },
      { y: cy - 40, heightText: "300 meters" }
    ];

    slices.forEach((slice, index) => {
      // Glow slicing line if animation progress is active
      const isActive = progress > (index * 0.3);
      ctx.strokeStyle = isActive ? "#c48f43" : "rgba(92, 107, 128, 0.3)";
      ctx.lineWidth = isActive ? 2 : 1;

      // Draw horizontal slicing plane
      ctx.beginPath();
      ctx.moveTo(cx - 160, slice.y);
      ctx.lineTo(cx + 160, slice.y);
      ctx.stroke();

      ctx.fillStyle = isActive ? "#c48f43" : "rgba(92, 107, 128, 0.4)";
      ctx.font = "10px monospace";
      ctx.fillText(slice.heightText, cx + 170, slice.y + 3);

      if (isActive) {
        // Project contour markers downward onto baseline
        ctx.strokeStyle = "rgba(192, 92, 70, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        // Left intersection point (approximate)
        let leftX = cx - 110 + (index * 25);
        ctx.beginPath();
        ctx.moveTo(leftX, slice.y);
        ctx.lineTo(leftX, cy + 130);
        ctx.stroke();

        // Right intersection point (approximate)
        let rightX = cx + 115 - (index * 30);
        ctx.beginPath();
        ctx.moveTo(rightX, slice.y);
        ctx.lineTo(rightX, cy + 130);
        ctx.stroke();
        
        ctx.setLineDash([]); // reset

        // Draw 2D projected contour circles at baseline
        ctx.strokeStyle = "#c05c46";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy + 130, (rightX - leftX)/2, 8, 0, 0, 2*Math.PI);
        ctx.stroke();
      }
    });

    // Draw baseline
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 170, cy + 130);
    ctx.lineTo(cx + 170, cy + 130);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px 'Plus Jakarta Sans'";
    ctx.textAlign = "center";
    ctx.fillText("Slicing a Hill to Project 2D Contour Rings", cx, cy - 100);
    ctx.font = "11px 'Plus Jakarta Sans'";
    ctx.fillText("2D Contour Map Projection (Bottom)", cx, cy + 160);
  }

  // --- TAB 3: EXPLORE SIMULATIONS (CANVAS SANDBOXES) ---
  initExploreSimulation() {
    const container = document.getElementById("sandbox-controls-container");
    container.innerHTML = "";
    
    // Clear state
    this.exploreState = {
      topic: this.activeTopic,
      canvas: this.exploreCanvas,
      ctx: this.exploreCtx
    };

    const statusMsg = document.getElementById("explore-status-msg");
    statusMsg.innerText = "";

    // Set layout and render controls depending on active topic
    switch (this.activeTopic) {
      case 0:
        // Topic 1 Slider: Satellite vs Map
        this.exploreState.sliderX = this.exploreCanvas.width / 2;
        this.exploreState.dragging = false;
        container.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <p style="font-size:0.85rem; color:var(--text-secondary);">
              <strong>Drag the slider</strong> across the screen to contrast the realistic satellite photograph (left) with the simplified cartographic map (right). Hover over points of interest to explore symbol logic.
            </p>
          </div>
        `;
        break;
      case 1:
        // Topic 2: Antique Map Viewer
        this.exploreState.activeMap = 0; // 0 = Babylonian, 1 = Al-Idrisi, 2 = Mercator
        container.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 0.5rem;">
              <strong>Choose a historical map</strong> from the options below to study its cartographic layout, orientation, and social context:
            </p>
            <div style="display:flex; gap:0.5rem;">
              <button class="watch-btn" onclick="app.setExploreMap(0)">Babylonian Tablet (600 BC)</button>
              <button class="watch-btn" onclick="app.setExploreMap(1)">Al-Idrisi Map (1154 AD)</button>
              <button class="watch-btn" onclick="app.setExploreMap(2)">Mercator Navigation (1569 AD)</button>
            </div>
          </div>
        `;
        break;
      case 2:
        // Topic 3: Triangulation survey
        this.exploreState.surveyStep = 0; // 0=Madras baseline, 1=Bangalore, 2=Hyderabad, 3=Nagpur, 4=Completed
        this.exploreState.dialVal = 0;
        this.exploreState.triangles = [];
        this.exploreState.measuredPoints = [];
        this.renderTriangulationControls(container);
        break;
      case 3:
        // Topic 4: Thematic Layers
        this.exploreState.layers = {
          relief: true,
          rainfall: false,
          population: false
        };
        container.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 0.5rem;">
              <strong>Toggle thematic layers</strong> below to see spatial patterns on the Telangana map. Hover over districts to analyze local SCERT statistics.
            </p>
            <div style="display:flex; gap:1.5rem; flex-wrap: wrap;">
              <label style="font-weight:600; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" checked onchange="app.toggleThematicLayer('relief', this.checked)"> 🏔️ Physical Relief
              </label>
              <label style="font-weight:600; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" onchange="app.toggleThematicLayer('rainfall', this.checked)"> 🌧️ Annual Rainfall
              </label>
              <label style="font-weight:600; font-size:0.9rem; cursor:pointer;">
                <input type="checkbox" onchange="app.toggleThematicLayer('population', this.checked)"> 👥 Population Density
              </label>
            </div>
          </div>
        `;
        break;
      case 4:
        // Topic 5: Contour Lines Heights
        this.exploreState.heightVal = 120;
        this.exploreState.profile = "gentle"; // steep, gentle, cliff
        container.innerHTML = `
          <div style="display:flex; align-items:center; gap:2rem; flex-wrap: wrap;">
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">Peak Height (meters): <span id="height-lbl">120m</span></label>
              <input type="range" min="50" max="200" value="120" style="accent-color:var(--accent-primary);" oninput="app.setContourHeight(this.value)">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.25rem;">
              <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">Slope Profile Shape:</label>
              <select onchange="app.setContourProfile(this.value)" style="padding:0.4rem 0.8rem; border-radius:6px; border:1px solid var(--border-color); font-family:var(--font-sans); outline:none;">
                <option value="gentle">Gentle Uniform Slope</option>
                <option value="steep">Steep Uniform Slope</option>
                <option value="cliff">Steep Cliff (West Side)</option>
              </select>
            </div>
            <p style="font-size:0.8rem; color:var(--text-secondary); max-width: 320px;">
              Changing peak height adds/removes lines. Different slope shapes bunch contour lines closer or spread them further apart!
            </p>
          </div>
        `;
        break;
    }

    this.renderExploreSandbox();
  }

  setupExploreListeners() {
    const canvas = this.exploreCanvas;
    
    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      if (this.activeTopic === 0) {
        // Check if mouse is on the slider bar
        const sliderX = this.exploreState.sliderX;
        if (Math.abs(mx - sliderX) < 15) {
          this.exploreState.dragging = true;
        }
      }
    });

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const my = (e.clientY - rect.top) * (canvas.height / rect.height);

      this.exploreState.mouseX = mx;
      this.exploreState.mouseY = my;

      if (this.activeTopic === 0 && this.exploreState.dragging) {
        // Drag slider
        this.exploreState.sliderX = Math.max(10, Math.min(canvas.width - 10, mx));
        this.renderExploreSandbox();
      } else if (this.activeTopic === 0 || this.activeTopic === 1 || this.activeTopic === 3) {
        // Hover updates
        this.renderExploreSandbox();
      }
    });

    window.addEventListener("mouseup", () => {
      if (this.activeTopic === 0) {
        this.exploreState.dragging = false;
      }
    });
  }

  renderExploreSandbox() {
    const ctx = this.exploreCtx;
    const w = this.exploreCanvas.width;
    const h = this.exploreCanvas.height;
    
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#faf8f5";
    ctx.fillRect(0, 0, w, h);

    // Grid details
    ctx.strokeStyle = "rgba(0,0,0,0.02)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    switch (this.activeTopic) {
      case 0:
        this.drawTopic1Sandbox(ctx, w, h);
        break;
      case 1:
        this.drawTopic2Sandbox(ctx, w, h);
        break;
      case 2:
        this.drawTopic3Sandbox(ctx, w, h);
        break;
      case 3:
        this.drawTopic4Sandbox(ctx, w, h);
        break;
      case 4:
        this.drawTopic5Sandbox(ctx, w, h);
        break;
    }
  }

  // --- TOPIC 1 SIMULATION: SPLIT SLIDER ---
  drawTopic1Sandbox(ctx, w, h) {
    const sliderX = this.exploreState.sliderX;

    // Define landscape features
    const lake = [
      { x: 300, y: 150 }, { x: 450, y: 120 }, { x: 500, y: 190 }, 
      { x: 400, y: 260 }, { x: 320, y: 220 }
    ];
    const park = { x: 120, y: 280, r: 70 };
    const roadNodes = [
      { x: 50, y: 180 }, { x: 220, y: 190 }, { x: 320, y: 130 },
      { x: 520, y: 220 }, { x: 700, y: 200 }
    ];

    // Landmark: Buddha Statue at Hussain Sagar
    const buddha = { x: 410, y: 180 };

    // --- DRAW LEFT SIDE: Satellite view ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, sliderX, h);
    ctx.clip();

    // Satellite land textures
    ctx.fillStyle = "#2d3e24"; // Forest dark green
    ctx.fillRect(0, 0, w, h);

    // Build organic fields
    ctx.fillStyle = "#3b5230";
    ctx.fillRect(50, 40, 200, 120);
    ctx.fillStyle = "#273620";
    ctx.fillRect(500, 280, 200, 180);

    // Draw detailed water body
    ctx.fillStyle = "#16283d";
    ctx.beginPath();
    ctx.moveTo(lake[0].x, lake[0].y);
    lake.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();
    // detailed shoreline sand
    ctx.strokeStyle = "#80705a";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw tree assets on park
    ctx.fillStyle = "#1d5218";
    ctx.beginPath();
    ctx.arc(park.x, park.y, park.r, 0, 2*Math.PI);
    ctx.fill();
    // small circles representing individual tree crowns
    ctx.fillStyle = "#0f360c";
    for(let i=0; i<8; i++) {
      ctx.beginPath();
      ctx.arc(park.x - 30 + (i*10), park.y - 20 + (Math.sin(i)*15), 12, 0, 2*Math.PI);
      ctx.fill();
    }

    // Draw realistic gray roads
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();
    // Road center dashes
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 8]);
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();
    ctx.setLineDash([]); // clear

    // Draw realistic Buddha Statue
    ctx.fillStyle = "#b0c4de"; // stone blue-grey
    ctx.beginPath();
    ctx.arc(buddha.x, buddha.y, 8, 0, 2*Math.PI);
    ctx.fill();
    // shadow
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.ellipse(buddha.x + 4, buddha.y + 4, 8, 4, 0, 0, 2*Math.PI);
    ctx.fill();

    // Draw tiny buildings blocks
    ctx.fillStyle = "#b05c46";
    ctx.fillRect(100, 80, 20, 15);
    ctx.fillRect(130, 75, 18, 20);
    ctx.fillStyle = "#e0a96d";
    ctx.fillRect(200, 380, 30, 25);
    ctx.fillRect(240, 370, 25, 25);

    ctx.restore();

    // --- DRAW RIGHT SIDE: Cartographic Map view ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(sliderX, 0, w - sliderX, h);
    ctx.clip();

    // Parchment base map
    ctx.fillStyle = "#fcfaf6";
    ctx.fillRect(0, 0, w, h);

    // Simplified agricultural block (colored zone)
    ctx.fillStyle = "#e6eedc";
    ctx.strokeStyle = "#c8dcb3";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(50, 40, 200, 120);
    ctx.fill();
    ctx.stroke();

    // Map rivers/water (Hussain Sagar lake)
    ctx.fillStyle = "#8dc1e9";
    ctx.strokeStyle = "#5ca5d8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(lake[0].x, lake[0].y);
    lake.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Simplified road lines (cartographic standard: double orange lines)
    ctx.strokeStyle = "#c48f43";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();
    
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(roadNodes[0].x, roadNodes[0].y);
    roadNodes.forEach(rn => ctx.lineTo(rn.x, rn.y));
    ctx.stroke();

    // Simplified Park boundary (Green block with small tree symbols)
    ctx.fillStyle = "#cae8c8";
    ctx.strokeStyle = "#9ccf98";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(park.x, park.y, park.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // Tree Symbol icon
    ctx.fillStyle = "#2f5647";
    ctx.font = "16px sans-serif";
    ctx.fillText("🌳", park.x - 20, park.y);
    ctx.fillText("🌳", park.x + 20, park.y + 10);

    // Buddha Statue Symbol (Red dot inside circle standard landmark symbol)
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(buddha.x, buddha.y, 6, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(buddha.x, buddha.y, 2, 0, 2*Math.PI);
    ctx.fill();

    // Cartographic Labels
    ctx.fillStyle = "#121c2c";
    ctx.font = "italic bold 12px 'Cormorant Garamond'";
    ctx.textAlign = "center";
    ctx.fillText("Hussain Sagar Lake", buddha.x, buddha.y + 35);
    ctx.fillText("Necklace Road", roadNodes[1].x + 40, roadNodes[1].y - 12);
    ctx.fillText("Sanjivaiah Park", park.x, park.y + 5);

    // Map Details (Compass and scale)
    ctx.fillStyle = "#121c2c";
    ctx.font = "bold 10px 'Plus Jakarta Sans'";
    ctx.textAlign = "right";
    ctx.fillText("N ↑", w - 30, 40);
    ctx.fillText("Scale: 1 cm = 100 meters", w - 30, h - 30);

    ctx.restore();

    // --- DRAW SLIDER DRAGGABLE BAR ---
    ctx.strokeStyle = "var(--accent-primary)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sliderX, 0);
    ctx.lineTo(sliderX, h);
    ctx.stroke();
    
    // Slider handle circle
    ctx.fillStyle = "var(--bg-card)";
    ctx.strokeStyle = "var(--accent-primary)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(sliderX, h / 2, 16, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();
    // slider arrows
    ctx.fillStyle = "var(--accent-primary)";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("◀▶", sliderX, h / 2);

    // --- INTERACTIVE TOOLTIP ON HOVER ---
    const mx = this.exploreState.mouseX || 0;
    const my = this.exploreState.mouseY || 0;

    let distBuddha = Math.hypot(mx - buddha.x, my - buddha.y);
    let distPark = Math.hypot(mx - park.x, my - park.y);

    if (distBuddha < 25) {
      this.drawTooltip(ctx, mx, my, "Buddha Statue", 
        "Map: Red point symbol. Photo: Grey granite monolith sculpture standing in Hussain Sagar lake.");
    } else if (distPark < park.r) {
      this.drawTooltip(ctx, mx, my, "Sanjivaiah Park", 
        "Map: Standard green zone. Photo: Dense canopy of green tree crowns, footpaths, and gardens.");
    }
  }

  // --- TOPIC 2 SIMULATION: HISTORICAL MAP EXPLORER ---
  setExploreMap(mapIndex) {
    this.exploreState.activeMap = mapIndex;
    this.renderExploreSandbox();
  }

  drawTopic2Sandbox(ctx, w, h) {
    const activeMap = this.exploreState.activeMap;
    const mx = this.exploreState.mouseX || 0;
    const my = this.exploreState.mouseY || 0;

    if (activeMap === 0) {
      // Babylonian World Map
      ctx.fillStyle = "#faf3e3";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw clay tablet texture
      ctx.fillStyle = "#cfab7e";
      ctx.strokeStyle = "#80582d";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(cx - 160, cy - 180, 320, 330, 20);
      ctx.fill();
      ctx.stroke();

      // Outer Ocean Rings (Bitter River)
      ctx.strokeStyle = "#543714";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 110, 0, 2*Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - 20, 130, 0, 2*Math.PI);
      ctx.stroke();

      // Cities representation (rectangles/hubs)
      ctx.fillStyle = "#ad8253";
      ctx.strokeStyle = "#543714";
      ctx.lineWidth = 2;
      
      const cities = [
        { x: cx - 20, y: cy - 50, w: 25, h: 40, name: "Babylon", desc: "Located at the absolute center of the world disk." },
        { x: cx - 70, y: cy - 70, w: 15, h: 15, name: "Urartu (Armenia)", desc: "Represented near the upper channels of rivers." },
        { x: cx + 45, y: cy - 10, w: 18, h: 18, name: "Bit-Yakin", desc: "A southern marshland region near the river mouth." }
      ];

      cities.forEach(c => {
        ctx.fillRect(c.x, c.y, c.w, c.h);
        ctx.strokeRect(c.x, c.y, c.w, c.h);
      });

      // River lines
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 100);
      ctx.quadraticCurveTo(cx - 10, cy - 50, cx - 10, cy + 20); // Euphrates
      ctx.stroke();

      // Outside triangles (outer regions/islands)
      const triangles = [
        { x1: cx - 120, y1: cy - 90, x2: cx - 140, y2: cy - 130, x3: cx - 90, y3: cy - 110, name: "Outer Region 1", desc: "An island beyond the Bitter River where the sun is not seen." },
        { x1: cx + 120, y1: cy - 90, x2: cx + 140, y2: cy - 130, x3: cx + 90, y3: cy - 110, name: "Outer Region 2", desc: "Legendary region with giant birds and beasts." }
      ];

      triangles.forEach(t => {
        ctx.beginPath();
        ctx.moveTo(t.x1, t.y1);
        ctx.lineTo(t.x2, t.y2);
        ctx.lineTo(t.x3, t.y3);
        ctx.closePath();
        ctx.stroke();
      });

      // Labels
      ctx.fillStyle = "#543714";
      ctx.font = "italic bold 11px serif";
      ctx.fillText("BITTER RIVER (MARRATU)", cx - 80, cy + 105);
      
      // Interactive points check
      cities.forEach(c => {
        if (mx > c.x && mx < c.x + c.w && my > c.y && my < c.y + c.h) {
          this.drawTooltip(ctx, mx, my, c.name, c.desc);
        }
      });
      triangles.forEach(t => {
        // approximate bounding box checking
        if (Math.hypot(mx - t.x2, my - t.y2) < 25) {
          this.drawTooltip(ctx, mx, my, t.name, t.desc);
        }
      });

    } 
    else if (activeMap === 1) {
      // Al-Idrisi Map (South up)
      ctx.fillStyle = "#fcf8ee";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Draw map circle
      ctx.strokeStyle = "#b0813f";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, 2*Math.PI);
      ctx.fillStyle = "#0c1724";
      ctx.fill();
      ctx.stroke();

      // Outer ocean ring
      ctx.beginPath();
      ctx.arc(cx, cy, 195, 0, 2*Math.PI);
      ctx.stroke();

      // Continental shapes in gold-brown (Africa top-right, Europe bottom)
      ctx.fillStyle = "#8c6b3f";
      ctx.beginPath();
      // Africa
      ctx.arc(cx + 60, cy - 60, 90, 0, Math.PI * 1.6);
      ctx.closePath();
      ctx.fill();

      // Arabia & India
      ctx.beginPath();
      ctx.moveTo(cx - 100, cy - 50);
      ctx.quadraticCurveTo(cx - 30, cy + 30, cx - 10, cy - 70);
      ctx.lineTo(cx - 50, cy - 100);
      ctx.closePath();
      ctx.fill();

      // Europe
      ctx.fillStyle = "#5c6b80";
      ctx.beginPath();
      ctx.arc(cx - 50, cy + 60, 60, 0, Math.PI);
      ctx.closePath();
      ctx.fill();

      // Orientation tags
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText("SOUTH (AL-JANUB) AT TOP", cx, cy - 210);
      ctx.fillText("NORTH (AL-SHAMAL) AT BOTTOM", cx, cy + 225);

      // Markers
      const markers = [
        { x: cx - 20, y: cy - 40, name: "Arabian Peninsula", desc: "Placed centrally. Contains Mecca, the holy hub." },
        { x: cx + 80, y: cy - 80, name: "Africa (Al-Sudan)", desc: "Mapped extensively along the upper hemisphere." },
        { x: cx - 80, y: cy + 50, name: "Mediterranean Sea", desc: "Drawn as a narrow channel splitting Europe and Africa." }
      ];

      markers.forEach(m => {
        ctx.fillStyle = "#ffcc00";
        ctx.beginPath();
        ctx.arc(m.x, m.y, 5, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        if (Math.hypot(mx - m.x, my - m.y) < 15) {
          this.drawTooltip(ctx, mx, my, m.name, m.desc);
        }
      });
    } 
    else {
      // Mercator Map with drag path
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, w, h);

      // Grid projection
      ctx.strokeStyle = "rgba(176, 129, 63, 0.2)";
      ctx.lineWidth = 1;
      for (let x = 60; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 50; y < h; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Drawing simple maps outlines
      ctx.fillStyle = "#1e293b";
      ctx.strokeStyle = "#b0813f";
      
      // Americas outline
      ctx.beginPath();
      ctx.rect(60, 80, 80, 300);
      ctx.fill(); ctx.stroke();
      
      // Africa / Europe
      ctx.beginPath();
      ctx.rect(300, 100, 120, 240);
      ctx.fill(); ctx.stroke();

      // Greenland (stetched giant at top)
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.rect(180, 20, 140, 60);
      ctx.fill(); ctx.stroke();

      // Navigation line indicator
      ctx.strokeStyle = "#c05c46";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(100, 320); // America
      ctx.lineTo(340, 150); // Europe
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px 'Plus Jakarta Sans'";
      ctx.fillText("Constant Rhumb Line navigation direction (keeps angles identical)", 110, 340);

      // Interactive pins
      const pins = [
        { x: 250, y: 50, name: "Exaggerated Greenland", desc: "In Mercator projection, objects near poles stretch outward, making Greenland look as large as Africa." },
        { x: 360, y: 220, name: "Africa Continent", desc: "Drawn near equator. Size is accurate, but looks smaller compared to stretched polar zones." },
        { x: 220, y: 235, name: "Straight Compass Course", options: "Helps navigators sail continuously in a single compass bearing without adjusting steering angle." }
      ];

      pins.forEach(p => {
        ctx.fillStyle = "#ff5555";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        if (Math.hypot(mx - p.x, my - p.y) < 15) {
          this.drawTooltip(ctx, mx, my, p.name, p.desc);
        }
      });
    }
  }

  // --- TOPIC 3 SIMULATION: TRIANGULATION SURVEY GAME ---
  renderTriangulationControls(container) {
    const step = this.exploreState.surveyStep;
    const dial = this.exploreState.dialVal;
    
    let targetMsg = "";
    let targetAngle = 0;

    if (step === 0) {
      targetMsg = "Align Theodolite from **Madras Base** to **Bangalore Tower** (Target Angle: **268°**)";
      targetAngle = 268;
    } else if (step === 1) {
      targetMsg = "Align Theodolite from **Bangalore** to **Hyderabad Tower** (Target Angle: **42°**)";
      targetAngle = 42;
    } else if (step === 2) {
      targetMsg = "Align Theodolite from **Hyderabad** to **Nagpur Tower** (Target Angle: **78°**)";
      targetAngle = 78;
    } else if (step === 3) {
      targetMsg = "Align Theodolite from **Nagpur** to **Delhi Tower** (Target Angle: **312°**)";
      targetAngle = 312;
    }

    if (step < 4) {
      container.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.8rem;">
          <p style="font-size:0.88rem; color:var(--text-primary); font-weight:700;">
            🎯 ${targetMsg}
          </p>
          <div style="display:flex; align-items:center; gap:2rem;">
            <div style="display:flex; flex-direction:column; gap:0.25rem; flex: 1;">
              <label style="font-size:0.8rem; font-weight:700; color:var(--text-secondary);">Theodolite Scope Angle: <span id="dial-val-lbl" style="color:var(--accent-primary); font-weight:700;">${dial}°</span></label>
              <input type="range" min="0" max="360" value="${dial}" style="accent-color:var(--accent-secondary);" oninput="app.setSurveyDial(this.value)">
            </div>
            <button class="primary-btn" onclick="app.lockSurveyMeasurement(${targetAngle})">Lock Angle & Measure</button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="text-align:center; padding:0.5rem 0;">
          <h4 style="color:var(--accent-secondary); margin-bottom:0.25rem;">🎉 Trigonometrical Mapping Successful!</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary);">
            Excellent! You have connected St. Thomas Mount (Madras) up to Delhi, measuring the Earth's curvature and mapping the mountains exactly like William Lambton and George Everest.
          </p>
        </div>
      `;
    }
  }

  setSurveyDial(val) {
    this.exploreState.dialVal = parseInt(val);
    const lbl = document.getElementById("dial-val-lbl");
    if (lbl) lbl.innerText = `${val}°`;
    this.renderExploreSandbox();
  }

  lockSurveyMeasurement(target) {
    const dial = this.exploreState.dialVal;
    const diff = Math.abs(dial - target);
    const statusMsg = document.getElementById("explore-status-msg");

    if (diff <= 2) {
      statusMsg.style.color = "var(--accent-secondary)";
      statusMsg.innerText = "✓ Angle Lock Successful!";
      
      // Save completed step line details to trace
      this.exploreState.triangles.push(this.exploreState.surveyStep);
      this.exploreState.surveyStep++;
      this.exploreState.dialVal = 0; // reset dial

      setTimeout(() => {
        statusMsg.innerText = "";
        this.renderTriangulationControls(document.getElementById("sandbox-controls-container"));
        this.renderExploreSandbox();
      }, 1000);
    } else {
      statusMsg.style.color = "var(--text-primary)";
      statusMsg.innerText = "❌ Angle inaccurate! Look through scope dials closely.";
      setTimeout(() => statusMsg.innerText = "", 1500);
    }
  }

  drawTopic3Sandbox(ctx, w, h) {
    const step = this.exploreState.surveyStep;
    const dial = this.exploreState.dialVal;

    // Define 5 coordinates of cities (scaled to canvas size)
    const stations = [
      { name: "Madras", x: 420, y: 400 },
      { name: "Bangalore", x: 260, y: 380 },
      { name: "Hyderabad", x: 320, y: 280 },
      { name: "Nagpur", x: 430, y: 220 },
      { name: "Delhi", x: 280, y: 90 }
    ];

    // Draw background outline map of India (simplified)
    ctx.strokeStyle = "rgba(47, 86, 71, 0.15)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 40); // north
    ctx.lineTo(400, 90);
    ctx.lineTo(440, 150);
    ctx.lineTo(490, 180);
    ctx.lineTo(480, 240);
    ctx.lineTo(450, 310);
    ctx.lineTo(420, 420); // cape comorin
    ctx.lineTo(340, 420);
    ctx.lineTo(260, 360);
    ctx.lineTo(210, 300);
    ctx.lineTo(200, 240);
    ctx.lineTo(160, 180);
    ctx.lineTo(220, 120);
    ctx.lineTo(280, 40);
    ctx.closePath();
    ctx.stroke();

    // Draw locks triangles
    this.exploreState.triangles.forEach(tIndex => {
      ctx.fillStyle = "rgba(47, 86, 71, 0.12)";
      ctx.strokeStyle = "rgba(47, 86, 71, 0.7)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      
      if (tIndex === 0) {
        ctx.moveTo(stations[0].x, stations[0].y);
        ctx.lineTo(stations[1].x, stations[1].y);
        ctx.lineTo(stations[2].x, stations[2].y);
      } else if (tIndex === 1) {
        ctx.moveTo(stations[1].x, stations[1].y);
        ctx.lineTo(stations[2].x, stations[2].y);
        ctx.lineTo(stations[3].x, stations[3].y);
      } else if (tIndex === 2) {
        ctx.moveTo(stations[2].x, stations[2].y);
        ctx.lineTo(stations[3].x, stations[3].y);
        ctx.lineTo(stations[4].x, stations[4].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });

    // Draw active alignment line dynamically based on slider dial angle
    if (step < 4) {
      const activeStation = stations[step];
      const angleRad = (dial - 90) * Math.PI / 180; // 0 degree points North
      const length = 200;

      ctx.strokeStyle = "rgba(192, 92, 70, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(activeStation.x, activeStation.y);
      ctx.lineTo(activeStation.x + Math.cos(angleRad) * length, activeStation.y + Math.sin(angleRad) * length);
      ctx.stroke();
      ctx.setLineDash([]); // clear
    }

    // Draw survey tower circles
    stations.forEach((s, idx) => {
      const isActive = idx === step;
      
      // Draw tower block
      ctx.fillStyle = isActive ? "#ff0000" : "#2f5647";
      ctx.beginPath();
      ctx.arc(s.x, s.y, 6, 0, 2*Math.PI);
      ctx.fill();
      
      // outer ring
      ctx.strokeStyle = isActive ? "rgba(255,0,0,0.4)" : "rgba(47, 86, 71, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 12, 0, 2*Math.PI);
      ctx.stroke();

      // text label
      ctx.fillStyle = "#121c2c";
      ctx.font = "bold 10px 'Plus Jakarta Sans'";
      ctx.fillText(s.name, s.x + 12, s.y + 3);
    });

    // If survey is fully completed, overlay grid triangulation lines all over India map
    if (step === 4) {
      ctx.strokeStyle = "rgba(176, 129, 63, 0.25)";
      ctx.lineWidth = 1;
      for (let i = 0; i < stations.length; i++) {
        for (let j = i + 1; j < stations.length; j++) {
          ctx.beginPath();
          ctx.moveTo(stations[i].x, stations[i].y);
          ctx.lineTo(stations[j].x, stations[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // --- TOPIC 4 SIMULATION: THEMATIC LAYERS SANDBOX ---
  toggleThematicLayer(layerName, isChecked) {
    this.exploreState.layers[layerName] = isChecked;
    this.renderExploreSandbox();
  }

  drawTopic4Sandbox(ctx, w, h) {
    const layers = this.exploreState.layers;
    const mx = this.exploreState.mouseX || 0;
    const my = this.exploreState.mouseY || 0;

    // Define mock circular boundaries for TS districts (X, Y, Radius)
    const districts = [
      { name: "Adilabad (North)", cx: 370, cy: 90, r: 40, relief: 480, rain: 1050, density: 140 },
      { name: "Nizamabad", cx: 280, cy: 170, r: 35, relief: 380, rain: 950, density: 230 },
      { name: "Karimnagar", cx: 390, cy: 160, r: 35, relief: 300, rain: 980, density: 290 },
      { name: "Medak (Central)", cx: 290, cy: 240, r: 35, relief: 440, rain: 880, density: 210 },
      { name: "Warangal", cx: 430, cy: 220, r: 40, relief: 280, rain: 1020, density: 320 },
      { name: "Khammam (East)", cx: 520, cy: 300, r: 45, relief: 120, rain: 1120, density: 190 },
      { name: "Hyderabad Capital", cx: 320, cy: 300, r: 20, relief: 540, rain: 780, density: 18000 },
      { name: "Nalgonda", cx: 420, cy: 320, r: 40, relief: 220, rain: 720, density: 240 },
      { name: "Mahabubnagar (South)", cx: 250, cy: 360, r: 45, relief: 500, rain: 650, density: 180 }
    ];

    // base outline render
    ctx.strokeStyle = "#e5dec9";
    ctx.lineWidth = 2;

    districts.forEach(d => {
      // Calculate color mixes depending on toggled layer switches
      let fillStyle = "#faf8f5"; // neutral cream default

      if (layers.relief && !layers.rainfall && !layers.population) {
        // Physical Relief colors (green plains to yellow plateaus to brown hills)
        if (d.relief < 150) fillStyle = "#c5e1a5"; // low plains green
        else if (d.relief >= 150 && d.relief < 450) fillStyle = "#ffe082"; // table plateau yellow
        else fillStyle = "#d7ccc8"; // higher plateau grey-brown
      } 
      else if (!layers.relief && layers.rainfall && !layers.population) {
        // Rainfall overlay shades of blue
        if (d.rain < 750) fillStyle = "#e3f2fd";
        else if (d.rain >= 750 && d.rain < 1000) fillStyle = "#90caf9";
        else fillStyle = "#1e88e5";
      } 
      else if (!layers.relief && !layers.rainfall && layers.population) {
        // Population choropleth gradient
        if (d.density < 200) fillStyle = "#ffebee";
        else if (d.density >= 200 && d.density < 1000) fillStyle = "#ef9a9a";
        else fillStyle = "#c62828"; // Hyderabad dense red
      } 
      else if (layers.relief || layers.rainfall || layers.population) {
        // Combined blend layers
        fillStyle = "#eceff1";
      }

      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      ctx.arc(d.cx, d.cy, d.r, 0, 2*Math.PI);
      ctx.fill();
      ctx.stroke();

      // name text anchor inside district
      ctx.fillStyle = "rgba(18, 28, 44, 0.4)";
      ctx.font = "bold 9px 'Plus Jakarta Sans'";
      ctx.textAlign = "center";
      ctx.fillText(d.name.split(" ")[0], d.cx, d.cy + 3);
    });

    // Check hover bounds
    districts.forEach(d => {
      if (Math.hypot(mx - d.cx, my - d.cy) < d.r) {
        // Highlight active hovered circle
        ctx.strokeStyle = "var(--accent-primary)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, d.r, 0, 2*Math.PI);
        ctx.stroke();

        // Renders statistics details card tooltip
        this.drawTooltip(ctx, mx, my, d.name, 
          `Elevation: ${d.relief}m (Relief)\n` +
          `Avg Rainfall: ${d.rain} mm/year\n` +
          `Population Density: ${d.density} people/sq.km`
        );
      }
    });
  }

  // --- TOPIC 5 SIMULATION: 3D AND 2D CONTOUR SANDBOX ---
  setContourHeight(val) {
    this.exploreState.heightVal = parseInt(val);
    document.getElementById("height-lbl").innerText = `${val}m`;
    this.renderExploreSandbox();
  }

  setContourProfile(val) {
    this.exploreState.profile = val;
    this.renderExploreSandbox();
  }

  drawTopic5Sandbox(ctx, w, h) {
    const height = this.exploreState.heightVal;
    const profile = this.exploreState.profile;

    const midX = w / 2;
    
    // Split screens divider
    ctx.strokeStyle = "#e5dec9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(midX, 0);
    ctx.lineTo(midX, h);
    ctx.stroke();

    // --- DRAW LEFT SIDE: 3D perspective hill mesh ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, midX, h);
    ctx.clip();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, midX, h);
    
    ctx.fillStyle = "rgba(47, 86, 71, 0.05)";
    ctx.font = "bold 11px 'Plus Jakarta Sans'";
    ctx.fillText("3D Profile View", 15, 30);

    const cx3d = midX / 2;
    const cy3d = h / 2 + 50;

    // Draw ground base line
    ctx.strokeStyle = "#5c6b80";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx3d - 140, cy3d);
    ctx.lineTo(cx3d + 140, cy3d);
    ctx.stroke();

    // Draw hill shape depending on profile slope selection
    ctx.fillStyle = "#2f5647";
    ctx.strokeStyle = "#1e372e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx3d - 140, cy3d);
    
    if (profile === "gentle") {
      ctx.quadraticCurveTo(cx3d - 60, cy3d - height, cx3d, cy3d - height);
      ctx.quadraticCurveTo(cx3d + 60, cy3d - height, cx3d + 140, cy3d);
    } else if (profile === "steep") {
      ctx.quadraticCurveTo(cx3d - 30, cy3d - height, cx3d, cy3d - height);
      ctx.quadraticCurveTo(cx3d + 30, cy3d - height, cx3d + 140, cy3d);
    } else if (profile === "cliff") {
      // West (left) side is vertical/steep cliff
      ctx.lineTo(cx3d - 40, cy3d);
      ctx.lineTo(cx3d - 35, cy3d - height);
      ctx.quadraticCurveTo(cx3d + 50, cy3d - height, cx3d + 140, cy3d);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // draw parallel slices showing heights increments
    ctx.strokeStyle = "rgba(176, 129, 63, 0.6)";
    ctx.lineWidth = 1.5;
    for (let step = 30; step < height; step += 30) {
      const sliceY = cy3d - step;
      ctx.beginPath();
      ctx.moveTo(cx3d - 120, sliceY);
      ctx.lineTo(cx3d + 120, sliceY);
      ctx.stroke();
    }

    ctx.restore();

    // --- DRAW RIGHT SIDE: 2D Contour ring map ---
    ctx.save();
    ctx.beginPath();
    ctx.rect(midX, 0, midX, h);
    ctx.clip();

    ctx.fillStyle = "#fcfaf6";
    ctx.fillRect(midX, 0, midX, h);
    
    ctx.fillStyle = "rgba(176, 129, 63, 0.4)";
    ctx.font = "bold 11px 'Plus Jakarta Sans'";
    ctx.fillText("2D Map Contour Lines Projection", midX + 15, 30);

    const cx2d = midX + midX / 2;
    const cy2d = h / 2;

    // Draw concentric ring lines
    const ringCount = Math.floor(height / 30);
    ctx.lineWidth = 2.5;

    for (let i = 1; i <= ringCount; i++) {
      const rStep = i * 20;
      ctx.strokeStyle = "rgba(192, 92, 70, 0.85)";
      ctx.beginPath();

      if (profile === "gentle") {
        // uniform concentric ellipses
        ctx.ellipse(cx2d, cy2d, rStep * 1.5, rStep, 0, 0, 2*Math.PI);
      } else if (profile === "steep") {
        // tight circles closer center
        ctx.ellipse(cx2d, cy2d, rStep * 0.8, rStep * 0.6, 0, 0, 2*Math.PI);
      } else if (profile === "cliff") {
        // offset centers (West side lines bunch together)
        const xOffset = -rStep * 0.6;
        ctx.ellipse(cx2d + xOffset, cy2d, rStep * 1.2, rStep * 0.9, 0, 0, 2*Math.PI);
      }
      ctx.stroke();

      // Contour elevation height labels printed on rings
      ctx.fillStyle = "#121c2c";
      ctx.font = "9px monospace";
      ctx.fillText(`${i * 50}m`, cx2d, cy2d - (i * 12));
    }

    ctx.restore();
  }

  // Common Tooltip utility
  drawTooltip(ctx, x, y, title, bodyText) {
    ctx.save();
    const padding = 10;
    const boxW = 240;
    
    // split bodies into lines
    const lines = bodyText.split("\n");
    const boxH = 25 + (lines.length * 15);
    
    let boxX = x + 15;
    let boxY = y + 15;

    // keep within boundaries
    if (boxX + boxW > ctx.canvas.width) boxX = x - boxW - 15;
    if (boxY + boxH > ctx.canvas.height) boxY = y - boxH - 15;

    ctx.fillStyle = "rgba(18, 28, 44, 0.95)";
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();

    ctx.fillStyle = "var(--accent-primary)";
    ctx.font = "bold 11px 'Plus Jakarta Sans'";
    ctx.fillText(title, boxX + padding, boxY + 18);

    ctx.fillStyle = "#ffffff";
    ctx.font = "10px 'Plus Jakarta Sans'";
    lines.forEach((l, idx) => {
      ctx.fillText(l, boxX + padding, boxY + 33 + (idx * 15));
    });

    ctx.restore();
  }

  // --- TAB 4: PRACTICE MINI QUIZZES ---
  initMiniQuiz() {
    const data = topicsData[this.activeTopic].quiz;
    this.miniQuizAnswers = Array(5).fill(null);
    this.activeMiniQuizQ = 0;
    this.renderMiniQuizCard();
  }

  renderMiniQuizCard() {
    const container = document.getElementById("mini-quiz-card-container");
    if (!container) return;
    
    const quiz = topicsData[this.activeTopic].quiz;
    const currentQIndex = this.activeMiniQuizQ;
    const q = quiz[currentQIndex];
    const userAnswer = this.miniQuizAnswers[currentQIndex];

    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress">Question ${currentQIndex + 1} of 5</div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, oIdx) => {
            let stateClass = "";
            let isDisabled = userAnswer !== null ? "disabled" : "";

            if (userAnswer !== null) {
              if (oIdx === q.answerIndex) stateClass = "correct";
              else if (oIdx === userAnswer) stateClass = "wrong";
            }

            return `
              <button class="quiz-option ${stateClass}" ${isDisabled} onclick="app.submitMiniQuizAnswer(${oIdx})">
                ${opt}
              </button>
            `;
          }).join("")}
        </div>

        <div class="quiz-feedback ${userAnswer !== null ? (userAnswer === q.answerIndex ? 'correct' : 'wrong') : ''}" id="mini-quiz-feedback-box">
          <div class="quiz-feedback-title">
            ${userAnswer !== null ? (userAnswer === q.answerIndex ? '✓ Correct Answer!' : '❌ Incorrect Answer') : ''}
          </div>
          <div style="font-size:0.85rem;">${q.explanation}</div>
        </div>

        ${userAnswer !== null ? `
          <div class="quiz-nav-row">
            <button class="quiz-next-btn" onclick="app.nextMiniQuizQ()">
              ${currentQIndex < 4 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        ` : ''}
      </div>
    `;
  }

  submitMiniQuizAnswer(selectedIdx) {
    this.miniQuizAnswers[this.activeMiniQuizQ] = selectedIdx;
    this.renderMiniQuizCard();
  }

  nextMiniQuizQ() {
    if (this.activeMiniQuizQ < 4) {
      this.activeMiniQuizQ++;
      this.renderMiniQuizCard();
    } else {
      // Calculate score
      const quiz = topicsData[this.activeTopic].quiz;
      let score = 0;
      this.miniQuizAnswers.forEach((ans, idx) => {
        if (ans === quiz[idx].answerIndex) score++;
      });

      // Complete topic progress
      const container = document.getElementById("mini-quiz-card-container");
      container.innerHTML = `
        <div class="quiz-card" style="text-align:center;">
          <h3 style="color:var(--accent-secondary); margin-bottom: 0.5rem;">🎉 Practice Quiz Completed!</h3>
          <p style="font-size:1.1rem; font-weight:700; margin-bottom:1rem;">Your score is: ${score} / 5</p>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.5rem;">
            Excellent practice session! Now proceed to the Revision stage to memorize terms and review key points.
          </p>
          <button class="primary-btn" onclick="app.advanceFlowStep()">Go to Revision</button>
        </div>
      `;
    }
  }

  // --- TAB 5: REVISE SECTION (FLASHCARDS) ---
  renderReviseTab() {
    const data = topicsData[this.activeTopic];
    const pointsContainer = document.getElementById("summary-points-container");
    pointsContainer.innerHTML = "";
    data.summary.forEach(pt => {
      const li = document.createElement("li");
      li.innerText = pt;
      pointsContainer.appendChild(li);
    });
  }

  renderFlashcard() {
    const fc = topicsData[this.activeTopic].flashcards[this.flashcardIndex];
    document.getElementById("flashcard-word-display").innerText = fc.word;
    document.getElementById("flashcard-def-display").innerText = fc.definition;
    document.getElementById("flashcard-indicator-display").innerText = `${this.flashcardIndex + 1} / 5`;
    
    // reset flip
    this.flashcardFlipped = false;
    document.getElementById("vocab-flashcard").classList.remove("flipped");
  }

  flipFlashcard() {
    this.flashcardFlipped = !this.flashcardFlipped;
    const card = document.getElementById("vocab-flashcard");
    if (this.flashcardFlipped) card.classList.add("flipped");
    else card.classList.remove("flipped");
  }

  nextFlashcard() {
    this.flashcardIndex = (this.flashcardIndex + 1) % 5;
    this.renderFlashcard();
  }

  prevFlashcard() {
    this.flashcardIndex = (this.flashcardIndex - 1 + 5) % 5;
    this.renderFlashcard();
  }

  // --- FINAL CERTIFICATION TEST ---
  showFinalTestIntro() {
    // Hide lessons, show final exam board
    document.getElementById("topic-section").style.display = "none";
    document.getElementById("final-test-section").style.display = "block";
    document.getElementById("sidebar-final-test-btn").classList.add("active");
    
    // Reset views
    document.getElementById("test-intro-panel").style.display = "block";
    document.getElementById("test-questions-panel").style.display = "none";
    document.getElementById("test-results-panel").style.display = "none";
  }

  startFinalTest() {
    this.testActive = true;
    this.testAnswers = Array(20).fill(null);
    this.testTime = 0;

    // Show sheets
    document.getElementById("test-intro-panel").style.display = "none";
    document.getElementById("test-questions-panel").style.display = "block";
    document.getElementById("test-results-panel").style.display = "none";

    // Run Timer
    clearInterval(this.testTimerId);
    this.testTimerId = setInterval(() => {
      this.testTime++;
      const min = String(Math.floor(this.testTime / 60)).padStart(2, "0");
      const sec = String(this.testTime % 60).padStart(2, "0");
      document.getElementById("test-timer").innerText = `Time Elapsed: ${min}:${sec}`;
    }, 1000);

    // Build question list
    const container = document.getElementById("test-questions-container");
    container.innerHTML = "";

    finalTestQuestions.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = "test-q-card";
      card.innerHTML = `
        <div class="test-q-title">${idx + 1}. ${q.question}</div>
        <div class="test-options">
          ${q.options.map((opt, oIdx) => `
            <label class="test-option-label" id="lbl-q${idx}-o${oIdx}">
              <input type="radio" name="test-q-${idx}" value="${oIdx}" onclick="app.setTestAnswer(${idx}, ${oIdx})">
              ${opt}
            </label>
          `).join("")}
        </div>
      `;
      container.appendChild(card);
    });
  }

  setTestAnswer(qIdx, selectedIdx) {
    this.testAnswers[qIdx] = selectedIdx;
    
    // Highlight selected label visually
    for(let i=0; i<4; i++) {
      const lbl = document.getElementById(`lbl-q${qIdx}-o${i}`);
      if (lbl) {
        if (i === selectedIdx) lbl.style.backgroundColor = "var(--bg-secondary)";
        else lbl.style.backgroundColor = "transparent";
      }
    }
  }

  submitFinalTest() {
    // Check if all questions are answered
    const unanswered = this.testAnswers.filter(ans => ans === null).length;
    if (unanswered > 0) {
      alert(`Please answer all questions before submitting! (${unanswered} questions left)`);
      return;
    }

    clearInterval(this.testTimerId);
    this.testActive = false;

    // Calculate score
    let correctCount = 0;
    finalTestQuestions.forEach((q, idx) => {
      if (this.testAnswers[idx] === q.answerIndex) correctCount++;
    });

    const percent = Math.round((correctCount / 20) * 100);

    // Update results panel
    document.getElementById("results-score").innerText = `${correctCount} / 20`;
    document.getElementById("results-percentage").innerText = `Score: ${percent}%`;

    const verdict = document.getElementById("results-verdict");
    const summaryText = document.getElementById("results-summary-text");
    const certBox = document.getElementById("cert-unlock-container");

    if (percent >= 80) {
      verdict.innerText = "Outstanding Accomplishment!";
      verdict.style.color = "var(--accent-secondary)";
      summaryText.innerText = `Sensational score! You have proven a strong command over TS SCERT Chapter 1. The custom SRIVARDHAN honours certificate has been successfully unlocked!`;
      certBox.style.display = "block";
    } else {
      verdict.innerText = "Exam Completed!";
      verdict.style.color = "var(--accent-primary)";
      summaryText.innerText = `You scored ${percent}%. You need at least 80% (16/20 correct) to earn the printable SRIVARDHAN certificate. Please study the lessons and try again!`;
      certBox.style.display = "none";
    }

    // Load review board
    const reviewContainer = document.getElementById("test-review-container");
    reviewContainer.innerHTML = "";

    finalTestQuestions.forEach((q, idx) => {
      const userAnsIdx = this.testAnswers[idx];
      const isCorrect = userAnsIdx === q.answerIndex;

      const card = document.createElement("div");
      card.className = `review-card ${isCorrect ? 'correct' : 'wrong'}`;
      card.innerHTML = `
        <div class="review-question">${idx + 1}. ${q.question}</div>
        <div class="review-user-ans">Your Answer: <span style="color:${isCorrect ? '#385723' : '#c00000'};">${q.options[userAnsIdx]}</span></div>
        ${!isCorrect ? `<div class="review-correct-ans">Correct Answer: <span style="color:#385723;">${q.options[q.answerIndex]}</span></div>` : ''}
        <div class="review-explanation">${q.explanation}</div>
      `;
      reviewContainer.appendChild(card);
    });

    // Display results panel
    document.getElementById("test-questions-panel").style.display = "none";
    document.getElementById("test-results-panel").style.display = "block";
  }

  resetFinalTest() {
    this.showFinalTestIntro();
  }

  generateAndPrintCertificate() {
    const studentName = document.getElementById("student-name-input").value.trim();
    if (!studentName) {
      alert("Please enter your name to personalize the certificate.");
      return;
    }

    let correctCount = 0;
    this.testAnswers.forEach((ans, idx) => {
      if (ans === finalTestQuestions[idx].answerIndex) correctCount++;
    });
    const percent = Math.round((correctCount / 20) * 100);

    // Populate Print template details
    document.getElementById("cert-recipient-name").innerText = studentName;
    document.getElementById("cert-score-display").innerText = `${correctCount} / 20`;
    document.getElementById("cert-percent-display").innerText = `${percent}%`;
    
    // Set current date formatted nicely
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric"
    });
    document.getElementById("cert-date-display").innerText = `Date: ${formattedDate}`;

    // Print
    window.print();
  }
}

// Instantiate global app engine
const app = new LearningApp();
