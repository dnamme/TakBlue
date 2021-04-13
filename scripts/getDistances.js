var aisisData = `CSCI 231	A	ADVANCED MULTIMEDIA SYSTEMS	3	M-W-F 1600-1700	CTC 112	AMANTE, Francesco	10	ENG	G	9	-	S	P
CSCI 234.1	A	SEMINAR:MULTIMEDIA APPLICATIONS	3	M-W-F 1500-1600	CTC 112	AMANTE, Francesco	10	ENG	G	10	-	N	N
CSCI 235	A	SPECIAL TOPICS: GAME AND GAMES DESIGN	3	M 1800-2100	CTC 112	CASANO, JONATHAN DL.	20	ENG	G	18	-	S	P
CSCI 243	A	AFFECTIVE COMPUTING	3	W 1700-2000	COLLEGE '66 CO-LAB	RODRIGO, MA. MERCEDES T.	20	ENG	G	2	-	S	P
CSCI 261.03	A	INTRODUCTION TO SOCIAL COMPUTING	3	SAT 0900-1200	CTC 214	MONTALAN, JANN RAILEY E.	30	ENG	G	27	`;
var aisisRows = aisisData.split(/\n/g);
var aisisDetailsFromRows = [];
var aisisDetailsAsObjects = [];

var buildingToCode = { 
    "SEC-A": "SEC A",
    "SEC-C": "SEC C",
    "SEC-B": "SEC B",
    "K": "Kostka",
    "B": "Bellarmine",
    "F": "Faura",
    "SOM": "SOM",
    "COLLEGE": "Arete",
    "CTC": "SOM"
};

var distances = `[{ 
    "building": "Arete",
    "distances": {
        "Bellarmine": 404, 
        "Faura": 215, 
        "Kostka": 293, 
        "Leong": 81,
        "PIPAC": 272,
        "Rizal Lib": 133,
        "SEC A": 409, 
        "SEC B": 415, 
        "SEC C": 406,
        "SOM": 346,
        "Xavier": 318
    }
}, 
{ 
    "building": "Bellarmine",
    "distances": { 
        "Arete": 404, 
        "Faura": 388, 
        "Kostka": 269, 
        "Leong": 380, 
        "PIPAC": 432, 
        "Rizal Lib": 424, 
        "SEC A": 432, 
        "SEC B": 485, 
        "SEC C": 502, 
        "SOM": 507, 
        "Xavier": 214
    }
},
{ 
    "building": "Faura",
    "distances": { 
        "Arete": 215,
        "Bellarmine": 388, 
        "Kostka": 129, 
        "Leong": 116,
        "PIPAC": 46,
        "Rizal Lib": 77,
        "SEC A": 170, 
        "SEC B": 183, 
        "SEC C": 165, 
        "SOM": 120, 
        "Xavier": 186
    }
}, 
{ 
    "building": "Kostka",
    "distances": { 
        "Arete": 293, 
        "Bellarmine": 269, 
        "Faura": 129, 
        "Leong": 200, 
        "PIPAC": 144, 
        "Rizal Lib": 202, 
        "SEC A": 180, 
        "SEC B": 216, 
        "SEC C": 230, 
        "SOM": 249, 
        "Xavier": 77
    }
},
{ 
    "building": "Leong",
    "distances": { 
        "Arete": 81, 
        "Bellarmine": 380, 
        "Faura": 116, 
        "Kostka": 200, 
        "PIPAC": 174,
        "Rizal Lib": 50,
        "SEC A": 303, 
        "SEC B": 322, 
        "SEC C": 291, 
        "SOM": 244,
        "Xavier": 262
    }
}, 
{ 
    "building": "PIPAC",
    "distances": { 
        "Arete": 272, 
        "Bellarmine": 432, 
        "Faura": 46,
        "Kostka": 144, 
        "Leong": 174, 
        "Rizal Lib": 131, 
        "SEC A": 106,
        "SEC B": 118,
        "SEC C": 103,
        "SOM": 78,
        "Xavier": 196
    }
}, 
{ 
    "building": "Rizal Lib",
    "distances": { 
        "Arete": 133,
        "Bellarmine": 424, 
        "Faura": 77,
        "Kostka": 202, 
        "Leong": 50,
        "PIPAC": 131, 
        "SEC A": 272, 
        "SEC B": 260, 
        "SEC C": 241, 
        "SOM": 187, 
        "Xavier": 262
    }
}, 
{ 
    "building": "SEC A",
    "distances": { 
        "Arete": 409, 
        "Bellarmine": 432, 
        "Faura": 170, 
        "Kostka": 180, 
        "Leong": 303, 
        "PIPAC": 106,
        "Rizal Lib": 272, 
        "SEC B": 51,
        "SEC C": 76,
        "SOM": 123,
        "Xavier": 219
    }
},  
{ 
    "building": "SEC B",
    "distances": { 
        "Arete": 415, 
        "Bellarmine": 485, 
        "Faura": 183, 
        "Kostka": 216, 
        "Leong": 322, 
        "PIPAC": 118,
        "Rizal Lib": 260, 
        "SEC A": 51,
        "SEC C": 44,
        "SOM": 97, 
        "Xavier": 261
    }
}, 
{ 
    "building": "SEC C",
    "distances": { 
        "Arete": 406, 
        "Bellarmine": 502, 
        "Faura": 165, 
        "Kostka": 230, 
        "Leong": 291, 
        "PIPAC": 103,
        "Rizal Lib": 241, 
        "SEC A": 76,
        "SEC B": 44,
        "SOM": 64, 
        "Xavier": 288
    }
}, 
{ 
    "building": "SOM",
    "distances": { 
        "Arete": 346, 
        "Bellarmine": 507, 
        "Faura": 120,
        "Kostka": 249, 
        "Leong": 244, 
        "PIPAC": 78,
        "Rizal Lib": 187, 
        "SEC A": 123,
        "SEC B": 97,
        "SEC C": 64,
        "Xavier": 296
    }
},
{
    "building": "Xavier",
    "distances": {
        "Arete": 318, 
        "Bellarmine": 214, 
        "Faura": 186,
        "Kostka": 77, 
        "Leong": 262,
        "PIPAC": 196, 
        "Rizal Lib": 262, 
        "SEC A": 219,
        "SEC B": 261, 
        "SEC C": 288, 
        "SOM": 296
    }
}]`;

function fetchCopyData() { 
    aisisData = document.getElementById('input-copy').value;
    aisisRows = aisisData.split(/\n/g);

    aisisDetailsFromRows = [];
    aisisDetailsAsObjects = [];

    for (var i = 0; i < aisisRows.length; i++) { 
        var arrayFromRow = aisisRows[i].split(/\t{1,}/g);
        aisisDetailsFromRows.push(arrayFromRow);
    }

    try {
        for (var j = 0; j < aisisDetailsFromRows.length; j++) { 
            var aisisDetails = { 
                subjectCode: aisisDetailsFromRows[j][0],
                section: aisisDetailsFromRows[j][1],
                subjectName: aisisDetailsFromRows[j][2],
                days: aisisDetailsFromRows[j][4].split(" ")[0].split("-"),
                time: aisisDetailsFromRows[j][4].split(" ")[1].split("-"),
                location: aisisDetailsFromRows[j][5]
            }
            aisisDetailsAsObjects.push(aisisDetails);
        }
    } catch(err) { 
        //alert("Yo! Check your copy-paste input and check if it's properly copy-pasted from AISIS.");
    }
}

function sortByDays(array, selDay) { 
    const daysOfWeek = ["M", "T", "W", "TH", "F", "SAT"];
    var htmlString = "";

    var arrayByDay = null;

    for (var day of daysOfWeek) { 
        arrayByDay = array.filter(function(element) { 
            return element.days.includes(day);
        });
        arrayByDay.sort((subj1, subj2) => subj1.time[0] > subj2.time[0] ? 1 : -1);
        for (var i = 0; i < arrayByDay.length - 1; i++) { 
            arrayByDay[i]["distance"] = distancesBetween(arrayByDay[i].location, arrayByDay[i + 1].location);
        }
        arrayByDay.unshift(day);

        if(arrayByDay[0] === daysOfWeek[selDay]) {
            console.log(arrayByDay);

            var detailsLeft = "";
            var detailsMid = "";
            var detailsRight = "";

            for(var i = 1; i < arrayByDay.length - 1; i++) {
                var item = arrayByDay[i];

                detailsLeft += `<p class="result-text-time">${item.time[0]}</p>
                <p class="result-text-distance">${item.distance / 90} minute walk</p>`;

                detailsMid += `<div class="circle"></div>
                <div class="vertical-line"></div>`;

                detailsRight += `<p class="result-text-code">${item.subjectCode}</p>
                <p class="result-text-location">${item.location}</p>`;
            }
            
            detailsMid += `<div class="circle"></div>`;
            detailsRight += `<p class="result-text-code">${arrayByDay[arrayByDay.length - 1].subjectCode}</p>
            <p class="result-text-location">${arrayByDay[arrayByDay.length - 1].location}</p>`;

            document.getElementById("results-details-left").innerHTML = detailsLeft;
            document.getElementById("results-details-mid").innerHTML = detailsMid;
            document.getElementById("results-details-right").innerHTML = detailsRight;

            return;
        }
    }
}

function distancesBetween(building1, building2) { 
    var distanceData = JSON.parse(distances);

    var firstBuildingAISISCode = "";
    var secondBuildingAISISCode = "";

    for (var code in buildingToCode) { 
        if (building1.startsWith(code)) { 
            firstBuildingAISISCode = code;
        } 
        if (building2.startsWith(code)) { 
            secondBuildingAISISCode = code;
        }
    }

    var firstBuildingCode = buildingToCode[firstBuildingAISISCode];
    var secondBuildingCode = buildingToCode[secondBuildingAISISCode];

    var dataByBuilding = distanceData.filter((element) => element.building === firstBuildingCode);
    //console.log(dataByBuilding);
    var toReturn = 0;
    try { 
        toReturn = dataByBuilding[0]['distances'][secondBuildingCode];
    } catch (err) { 
        console.log(err);
        toReturn = 0;
    }
    return toReturn;
}

function updateResults(selDay = 0) {
    // 1 mon
    // 6 sat
    fetchCopyData();
    sortByDays(aisisDetailsAsObjects, selDay);
}
