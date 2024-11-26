// Getting the DOM elements
var elapsedTime = document.querySelector("#elapsed");
var homeTeamLogo = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamLogo = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoals = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");
var upcomingMatches = document.querySelector("#upcomingMatches");
var lastMatches = document.querySelector("#lastMatches");
var teamInfo = document.querySelector("#teamInfo");

// Function to display team information
function displayTeamInfo(teamName, teamLogo) {
    teamInfo.innerHTML = `
        <h3>${teamName}</h3>
        <img src="${teamLogo}" alt="${teamName}" width="100" height="100">
        <p>Here you can add more information about the team.</p>
    `;
    teamInfo.style.display = 'block';
}
homeTeamLogo.addEventListener('click', () => displayTeamInfo(homeTeamName.innerHTML, homeTeamLogo.src));
        awayTeamLogo.addEventListener('click', () => displayTeamInfo(awayTeamName.innerHTML, awayTeamLogo.src));
    
        // Function to create an element
        function addMatchTile(data, container) {
            // Creating the tile div
            var matchtile = document.createElement('div');
            matchtile.classList.add("match-tile");
    
            // Creating the home match box
            var homeTeam = document.createElement('div');
            homeTeam.classList.add("team");
            // Creating the image and the text
            var homeTileTeamName = document.createElement('p');
            homeTileTeamName.innerHTML = data['teams']['home']['name'];
            var homeTileTeamLogo = document.createElement('img');
            homeTileTeamLogo.src = data['teams']['home']['logo'];
            homeTileTeamLogo.classList.add("team-logo");
            homeTeam.appendChild(homeTileTeamLogo);
            homeTeam.appendChild(homeTileTeamName);
    
            var awayTeam = document.createElement('div');
            awayTeam.classList.add("team");
            // Creating the image and the text
            var awayTileTeamName = document.createElement('p');
            awayTileTeamName.innerHTML = data['teams']['away']['name'];
            var awayTileTeamLogo = document.createElement('img');
            awayTileTeamLogo.src = data['teams']['away']['logo'];
            awayTileTeamLogo.classList.add("team-logo");
            awayTeam.appendChild(awayTileTeamLogo);
            awayTeam.appendChild(awayTileTeamName);
    
            // Creating the score
            var score = document.createElement('p');
            score.innerHTML = data['goals']['home'] + " : " + data['goals']['away'];
    
            // Creating the elapsed time
            var time = document.createElement('p');
            time.innerHTML = data['fixture']['status']['elapsed'] + "'";
    
            // Append all the elements to the parent
            matchtile.appendChild(homeTeam);
            matchtile.appendChild(score);
            matchtile.appendChild(awayTeam);
            matchtile.appendChild(time);
    
            container.appendChild(matchtile);
    
            // Add event listeners to the new team logos
            homeTileTeamLogo.addEventListener('click', () => displayTeamInfo(homeTileTeamName.innerHTML, homeTileTeamLogo.src));
            awayTileTeamLogo.addEventListener('click', () => displayTeamInfo(awayTileTeamName.innerHTML, awayTileTeamLogo.src));
        }
    

// Function to create an element
function addMatchTile(data) {
    // Creating the tile div
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");

    // Creating the home match box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    // Creating the image and the text
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src = data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    // Creating the image and the text
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src = data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);

    // Creating the score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " : " + data['goals']['away'];

    // Append all the elements to the parent
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}

// Function to fetch and update match data
function fetchAndUpdateMatchData() {
    fetch("https://v3.football.api-sports.io/fixtures?live=all", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "cff6ce5ea8cb4f2ab354462e2d8cf1d9"
        }
    })
        .then(response => response.json())
        .then(data => {
            var matchList = data['response'];
            if (matchList.length > 0) {
                var fixture = matchList[0]['fixture'];
                var goals = matchList[0]['goals'];
                var teams = matchList[0]['teams'];

                elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
                homeTeamLogo.src = teams['home']['logo'];
                homeTeamName.innerHTML = teams['home']['name'];
                awayTeamLogo.src = teams['away']['logo'];
                awayTeamName.innerHTML = teams['away']['name'];
                lastMatchGoals.innerHTML = goals['home'] + " - " + goals['away'];

                matchTable.innerHTML = ""; // Clear existing match tiles
                for (var i = 0; i < matchList.length; i++) {
                    addMatchTile(matchList[i]);
                }
            } else {
                console.error('no games at this time');
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// Initial fetch
fetchAndUpdateMatchData();

// Update every minute (60000 milliseconds)
setInterval(fetchAndUpdateMatchData, 60000);
