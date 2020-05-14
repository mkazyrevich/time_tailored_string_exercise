let selectMode = require ('../src/selectMode.js');

const assert = require('chai').assert;
const fs = require("fs");

describe('calculateTime()', function() {
  let tests = [
    {
      parameters: ['node', 'src/calculateTime.js', '--user', './test/test.txt', './test/result.txt'], 
      expected: {
        "r": "0h 22m",
        "vlad": "292h 15m",
        "g": "3h 5m",
        "v": "80h 40m",
        "e": "3h 30m",
        "pp": "1h 6m",
        "a": "54h 37m",
        "maks": "33h 0m",
        "Total time:": "468h 35m"
      }, 
    },
    {
      parameters: ['node', 'src/calculateTime.js', '-u', './test/test.txt', './test/result.txt'], 
      expected: {
        "r": "0h 22m",
        "vlad": "292h 15m",
        "g": "3h 5m",
        "v": "80h 40m",
        "e": "3h 30m",
        "pp": "1h 6m",
        "a": "54h 37m",
        "maks": "33h 0m",
        "Total time:": "468h 35m"
      },
    },
    {
      parameters: ['node', 'src/calculateTime.js', '--project', './test/test.txt', './test/result.txt'], 
      expected: {
        "project_1": "199h 33m",
        "Project_test": "231h 57m",
        "Test_ID": "1h 10m",
        "project_3": "35h 55m"
      }
    },
    {
      parameters: ['node', 'src/calculateTime.js', '-p', './test/test.txt', './test/result.txt'], 
      expected: {
        "project_1": "199h 33m",
        "Project_test": "231h 57m",
        "Test_ID": "1h 10m",
        "project_3": "35h 55m"
      }
    },
  ] 

  tests.forEach(function(test) {
    process.argv = test.parameters;
    let rawSource = fs.readFileSync(`${process.argv[3]}`, "utf8");
    let source = rawSource.replace(/\r\n/g, '\n');
    selectMode(process.argv);
    let rawResultString = fs.readFileSync(`${process.argv[4]}`, "utf8");
    let resultString = rawResultString.replace(/\t/g, ' ')

    it(`mode: ${process.argv[2]}
        
        source: ${source}

        expected: ${JSON.stringify(test.expected, null, ' ')}

        result: ${resultString}`, function() {
        assert.equal(resultString, JSON.stringify(test.expected, null, ' '));
    });
  });
});