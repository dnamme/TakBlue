var aisisData = `CSCI 231	A	ADVANCED MULTIMEDIA SYSTEMS	3	M-W-F 1600-1700	CTC 112	AMANTE, Francesco	10	ENG	G	9	-	S	P
CSCI 234.1	A	SEMINAR:MULTIMEDIA APPLICATIONS	3	M-W-F 1500-1600	CTC 112	AMANTE, Francesco	10	ENG	G	10	-	N	N
CSCI 235	A	SPECIAL TOPICS: GAME AND GAMES DESIGN	3	M 1800-2100	CTC 112	CASANO, JONATHAN DL.	20	ENG	G	18	-	S	P
CSCI 243	A	AFFECTIVE COMPUTING	3	W 1700-2000	COLLEGE '66 CO-LAB	RODRIGO, MA. MERCEDES T.	20	ENG	G	2	-	S	P
CSCI 261.03	A	INTRODUCTION TO SOCIAL COMPUTING	3	SAT 0900-1200	CTC 214	MONTALAN, JANN RAILEY E.	30	ENG	G	27	`;
var aisisRows = aisisData.split(/\n/g);
var aisisDetailsFromRows = [];
var aisisDetailsAsObjects = [];

function fetchCopyData() { 
    aisisData = document.getElementById('copy-input').nodeValue;
    aisisRows = aisisData.split(/\n/g);

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
        alert("Yo! Check your copy-paste input and check if it's properly copy-pasted from AISIS.");
    }
}

function fetchManualData() { 
    aisisData = document.getElementById('manual-input').nodeValue;
    aisisRows = aisisData.split(/\n/g);

    for (var i = 0; i < aisisRows.length; i++) { 
        var arrayFromRow = aisisRows[i].split(" || ");
        aisisDetailsFromRows.push(arrayFromRow);
    }

    try {
        for (var j = 0; j < aisisDetailsFromRows.length; j++) { 
            var aisisDetails = { 
                subjectCode: aisisDetailsFromRows[j][2],
                section: "",
                subjectName: "",
                days: aisisDetailsFromRows[j][0].split("-"),
                time: aisisDetailsFromRows[j][1].split("-"),
                location: aisisDetailsFromRows[j][3]
            }
            aisisDetailsAsObjects.push(aisisDetails);
        }
    } catch (err) { 
        alert("Yo! Make sure your input properly followed the format above: DAYS || TIME || CLASS CODE || CLASS LOCATION");
    }
}

function sortByDays(array) { 
    const daysOfWeek = ["M", "T", "W", "TH", "F", "SAT"];
    var htmlString = "";

    for (var day of daysOfWeek) { 
        var arrayByDay = array.filter(function(element) { 
            return element.days.includes(day);
        });
        arrayByDay.sort((subj1, subj2) => subj1.time[0] > subj2.time[0] ? 1 : -1);
        for (var i = 0; i < arrayByDay.length - 1; i++) { 
            arrayByDay[i]["distance"] = distances(arrayByDay[i].location, arrayByDay[i + 1].location);
        }
        arrayByDay.unshift(day);
        console.log(arrayByDay);

        htmlString += "<p class='small-grey-text'> " + day + " </p>";

        for (var i = 1; i < arrayByDay.length - 1; i++) {
            var item = arrayByDay[i]
            var succeedingSubject = arrayByDay[i + 1];

            htmlString += `
            <div class="results-content">

            <div class="result-details">
                <div class="top-bottom">
                <p>${item.time[0]}</p>
                <div class="circle"></div>
                <div class="location">
                <p>${item.subjectCode}</p>
                <p class="small-grey-text">${item.location}</p>
                </div>
            </div>
                <div class="middle">
                <div class="leftofline">
                    <p style="color: #1C38B4">${item.distance / 90} minute walk</p>
                    <p class="small-grey-text">${item.distance} m</p>
                </div>
                    <div class="vertical-line"></div>
                </div>
                <div class="top-bottom">
                <p>${succeedingSubject.time[0]}</p>
                <div class="circle"></div>
                <div class="location">
                <p>${succeedingSubject.subjectCode}</p>
                <p class="small-grey-text">${succeedingSubject.location}</p>
                </div>
                </div>
            </div>
            `;
        }
    }
}

function distances(building1, building2) { 
    var distanceData = JSON.parse(data);
    var dataByBuilding = distanceData.filter((element) => element.building === building1);
    return dataByBuilding.distances[building2];
}

sortByDays(aisisDetailsAsObjects);
