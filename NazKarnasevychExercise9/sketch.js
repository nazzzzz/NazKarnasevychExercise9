var summonerName = "nazzz";
var summonerID, season;
var apiKey = "RGAPI-499ea6d0-0050-4e59-a77a-b554e7dd2034";
var json_lvl;

var masteryPageNumber, runePageNumber, wins, champPoints, champID;


function setup() {
    createCanvas(600, 600);
}

function preload() {
    json_lvl = loadJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + '?api_key=' + apiKey);

}

function draw() {

    text("Your account at a glance, " + summonerName, 250, 50);

    text("Ranked wins in current season:", 150, 150);

    text("Ranked losses in current season:", 150, 200);

    text("Number of mastery pages:", 150, 350);

    text("Number of rune pages:", 150, 400);
    summonerLookUp();
    noLoop();
}

function masteriesLookup(json_masteries) {
	//get number of mastery pages
    masteryPageNumber = json_masteries[summonerID].pages.length;

    //console.log(masteryPageNumber);

    //output text
    text(masteryPageNumber, 350, 350);
}

function runeLookup(json_runes){
	//get number of rune pages
	runePageNumber = json_runes[summonerID].pages.length;

	//console.log(runePageNumber);
	
	//output text
	text(runePageNumber, 350, 400);
}

function getRankedStats(json_ranked){
	//get wins and losses for solo ranked
	wins = json_ranked.playerStatSummaries[4].wins;
	losses = json_ranked.playerStatSummaries[4].losses;

	//update with wins and losses from flex queue ranked
	wins+= json_ranked.playerStatSummaries[10].wins;

	//console.log(wins);

	//output text
	text(wins, 350, 150)
	text(losses, 350, 200)

	//draw bar for win/loss
	
	fill(0, 255, 0);
	rect(350, 160, wins, 20);

	fill(255, 0, 0);
	rect(350+wins, 160, losses, 20);

	fill(0);

}

//issue with loading JSON file for the mastery so that part was not done
/*function getHighestMastery(json_mastery){

	champPoints = json_mastery[0].championPoints;
	champID = json_mastery[0].championID;
	console.log(champPoints);
	console.log(champID);

	//loadJSON("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" +champID + "?api_key=" + apiKey, getChampName);

}*/

function getChampName(json_champ){
	champName = json_champ.name;

}

function summonerLookUp() {
	//get summoner id for later use
    summonerID = json_lvl[summonerName].id;
    console.log(summonerID);

    //load JSONS using the summoner ID
    //multiple calls are needed because of different APIs

    //load json for masteries
    loadJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + '/masteries?api_key=' + apiKey, masteriesLookup);

    //load json for runes
    loadJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + '/runes?api_key=' + apiKey, runeLookup);

    //load json for stats
	loadJSON("https://na.api.pvp.net/api/lol/na/v1.3/stats/by-summoner/" + summonerID + '/summary?season=SEASON2016&api_key=' + apiKey, getRankedStats);

	//load json for champ mastery
	
	//loadJSON("https://na.api.pvp.net/championmastery/location/NA1/player/" +summonerID + "/topchampions?count=1&api_key=" + apiKey, getHighestMastery);

	//loadJSON("https://na.api.pvp.net/championmastery/location/NA1/player/29293511/topchampions?count=1&api_key=RGAPI-499ea6d0-0050-4e59-a77a-b554e7dd2034", getHighestMastery);

}
