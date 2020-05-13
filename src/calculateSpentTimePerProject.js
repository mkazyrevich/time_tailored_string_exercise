function calculateSpentTimePerProject(sourceFilePath, targetFilePath) {

  const timeRecordsStringRegExp = new RegExp(/^\#{6}[^#].*/, 'gm');
  const projectIDStringRegExp = new RegExp(/(?<=(^\#{6}[^#].*\r\n))^\w+/, 'gm');
  const projectIDRegExp = new RegExp(/(?<=\w*)([a-z,0-9]+)_([a-z,0-9]+)$/, 'gm');

  const fs = require("fs");

  let timeRecordsStrings = fs.readFileSync(`${sourceFilePath}`, "utf8").match(timeRecordsStringRegExp);
  let userToTimeEntryMaps = createUserToTimeEntryMaps(timeRecordsStrings);
  let totalTimePerEachString = calculateTotalTimePerEachString(userToTimeEntryMaps);

  let rawStringsWithProjectID = fs.readFileSync(`${sourceFilePath}`, "utf8").match(projectIDStringRegExp);
  let projectIDs = rawStringsWithProjectID.map((item, index) => {
    if(item.match(projectIDRegExp)) {
      item.match(projectIDRegExp)[index];
    }

  })
  
  // fs.writeFileSync(`${targetFilePath}` , JSON.stringify(timeRecordsStrings, null, '\t'));
  console.log(userToTimeEntryMaps);
  console.log(rawStringsWithProjectID)
  console.log(projectIDs);
  console.log('ehguyerhger_heguyier_rgehyre_tt_ght'.match(projectIDRegExp))
}

function createUserToTimeEntryMaps(timeRecordsStrings) {
  let userToTimeEntryMaps = [];
  const calculateSpentTimeFromString = require ('./calculateSpentTimeFromString.js');

  timeRecordsStrings.forEach((string => {
    if(calculateSpentTimeFromString(string)) {
      userToTimeEntryMaps.push(calculateSpentTimeFromString(string))
    }
  }));

  return userToTimeEntryMaps;
}

function calculateTotalTimePerEachString(userToTimeEntryMaps) {
  let totalTimePerEachString = [];

  for (let item in userToTimeEntryMaps) {
    let map = userToTimeEntryMaps[item];
    let totalTimePerOneString = 0;

    for (let user in map) {
      totalTimePerOneString += map[user];
    }

    totalTimePerEachString.push(totalTimePerOneString)
  }

  return totalTimePerEachString;
}

function convertMinToHours(timeForEachUserWithTotalTime) {

  for (let user in timeForEachUserWithTotalTime) {

    let hours = Math.floor(timeForEachUserWithTotalTime[user] / 60);
    let minutes = timeForEachUserWithTotalTime[user] - hours * 60;
    timeForEachUserWithTotalTime[user] = hours + 'h ' + minutes + 'm';
  }

  return timeForEachUserWithTotalTime
}

module.exports = calculateSpentTimePerProject;