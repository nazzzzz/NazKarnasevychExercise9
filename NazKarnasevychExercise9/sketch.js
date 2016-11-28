var summonerName = "nazzz";
var summonerID;
var apiKey = "RGAPI-499ea6d0-0050-4e59-a77a-b554e7dd2034";
var json_lvl, json_masteries;

var masteryPageNumber, runePageNumber;


function setup() {
    createCanvas(600, 600);
}

function preload() {
    json_lvl = loadJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + '?api_key=' + apiKey);

}

function draw() {
    text("Your account at a glance", 300, 50);

    text("Mastery Page Number:", 150, 150);

    text("Rune Page Number:", 150, 180);
    summonerLookUp();
    noLoop();
}

function masteryLookup(json_masteries) {


    masteryPageNumber = json_masteries[summonerID].pages.length;
    console.log(masteryPageNumber);
    text(masteryPageNumber, 300, 150);
}

function runeLookup(json_runes){
	runePageNumber = json_runes[summonerID].pages.length;
	console.log(runePageNumber);
	text(runePageNumber, 300, 180);
}

function summonerLookUp() {
    summonerID = json_lvl[summonerName].id;
    console.log(summonerID);

    loadJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + '/masteries?api_key=' + apiKey, masteryLookup);
    loadJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + '/runes?api_key=' + apiKey, runeLookup);

}
