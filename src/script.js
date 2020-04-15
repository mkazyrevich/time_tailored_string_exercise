let calculateSpentTimeFromString = require ('./calculateSpentTimeFromString.js')

let pathToInputFile = process.argv[2];
let pathToOutputFile = process.argv[3];

function calculateSpentTimeFromFile(pathToInputFile, pathToOutputFile) {

  const fs = require("fs");
  const timeRecordsStringRegExp = new RegExp(/^\#\#\#\#\#\#[^#].*/, 'gm');

  let arrayOfTimeRecordsStrings = fs.readFileSync(`${pathToInputFile}`, "utf8").match(timeRecordsStringRegExp);
  let arrayOfUserToTimeEntryMaps = createArrayOfUserToTimeEntryMaps(arrayOfTimeRecordsStrings);
  let outputResult = calculateGeneralTimeForEachUser(arrayOfUserToTimeEntryMaps);
  
  function createArrayOfUserToTimeEntryMaps(inputTimeRecordsStringsArray) {
    let outputArrayOfUserToTimeEntryMaps = [];

    inputTimeRecordsStringsArray.forEach((string => {
      outputArrayOfUserToTimeEntryMaps.push(calculateSpentTimeFromString(string))
    }));

    return outputArrayOfUserToTimeEntryMaps;
  }

  function calculateGeneralTimeForEachUser(inputArrayOfUserToTimeEntryMaps) {
    let output = {};
    for (let item in inputArrayOfUserToTimeEntryMaps) {
      for (let user in inputArrayOfUserToTimeEntryMaps[item]) {
        if(!output[user]) {
          output[user] = inputArrayOfUserToTimeEntryMaps[item][user];
        } else {
          output[user] += inputArrayOfUserToTimeEntryMaps[item][user] 
        }
      }
    }

    return output
  }

  fs.writeFileSync(`${pathToOutputFile}` , JSON.stringify(outputResult, null, '\t'))
}

calculateSpentTimeFromFile(pathToInputFile, pathToOutputFile)