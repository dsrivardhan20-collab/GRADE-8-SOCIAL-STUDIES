# Paths
$origPath = "C:\Users\Bunny\.gemini\antigravity\scratch\srivardhan-scert-ch1\script.js"
$magicPath = "C:\Users\Bunny\.gemini\antigravity\scratch\srivardhan-magic-scert\script.js"

# Read lines (0-indexed in PowerShell)
$origLines = Get-Content -Path $origPath
$magicLines = Get-Content -Path $magicPath

# 1. Extract Ch1 Topics from original (lines 75 to 688)
$ch1Topics = $origLines[74..687] -join "`r`n"

# 2. Extract Ch1 Animations from original (lines 1221 to 1368)
$ch1Anims = $origLines[1220..1367] -join "`r`n"

# 3. Extract Ch1 Simulators from original (lines 1416 to 1754)
$ch1Sims = $origLines[1415..1753] -join "`r`n"

# 4. Construct syllabusData
$part1_header = $magicLines[0..64] -join "`r`n"  # up to "topics: ["
$part2_remainderSyllabus = $magicLines[195..1203] -join "`r`n" # Chapter 1 closing to syllabusData closing ];

$newSyllabusData = @"
$part1_header
$ch1Topics
$part2_remainderSyllabus
"@

# 5. Core Navigation Logic (lines 1205 to 1370)
$part3_coreNav = $magicLines[1204..1370] -join "`r`n"

# 6. New initExploreSimulation function (updated switch for 4 topics in Ch 1)
$newInitExploreSimulation = @"
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
    
    if (activeExploreAnimationId) {
        cancelAnimationFrame(activeExploreAnimationId);
        activeExploreAnimationId = null;
    }
    
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
"@

# 7. Rest of core navigation up to startWatchAnimation (lines 1414 to 1658)
$part4_coreNav2 = $magicLines[1413..1658] -join "`r`n"

# 8. New startWatchAnimation function (updated switch for 4 topics in Ch 1)
$newStartWatchAnimation = @"
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
            <iframe src="https://www.youtube.com/embed/\${t.youtubeId}?autoplay=1&rel=0" 
                    title="Educational Video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        `;
        mediaDesc.innerHTML = `<strong>Telangana SCERT Video:</strong> Learn about the core structures of <em>"\${syllabusData[chapIdx].title}"</em>.`;
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
"@

# 9. Helper grid drawing (lines 1765 to 1778)
$part5_grid = $magicLines[1764..1777] -join "`r`n"

# 10. Remaining animations (lines 1798 to 1941)
$part6_anims = $magicLines[1797..1940] -join "`r`n"

# 11. Remaining simulators
$part7_remainderApp = $magicLines[1941..($magicLines.Length - 1)] -join "`r`n"

# 12. Combine everything into master script content
$masterContent = @"
$newSyllabusData

$part3_coreNav

$newInitExploreSimulation

$part4_coreNav2

$newStartWatchAnimation

$part5_grid

$ch1Anims

$part6_anims

$ch1Sims

$part7_remainderApp
"@

# Write back to script.js
[System.IO.File]::WriteAllText($magicPath, $masterContent)
Write-Host "Successfully merged all 4 topics of Chapter 1 into script.js!"
