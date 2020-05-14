const calculateSpentTimePerUser = require('./calculateSpentTimePerUser');
const calculateSpentTimePerProject = require('./calculateSpentTimePerProject');

function selectMode(parameters) {
  let sourceFilePath = parameters[3];
  let targetFilePath = parameters[4];

  const commander = require('commander');
  commander
    .option('-u, --user', 'calculate spent time for each user')
    .option('-p, --project', 'calculate spent time for project')
    .parse();

  if(commander.user) {
    calculateSpentTimePerUser(sourceFilePath, targetFilePath);
  }

  if(commander.project) {
    calculateSpentTimePerProject(sourceFilePath, targetFilePath);
  }
}

module.exports = selectMode;
