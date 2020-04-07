export function getSpentTime(string) {

  let users = [];
  let result = {};

  const timeRegExp = new RegExp(/[ ][0-9.]+h?([0-9.]+)?m?(?=,|$| )/, 'g');
  const userRegExp = new RegExp(/[ ][A-Za-z]([^, ]+)?(?= +[0-9.]+h?([0-9.]+)?m?(,|$| )?)/, 'g'); 
  const timeConvertRegExp = new RegExp(/[0-9.]+h([0-9.]+)?/, 'g');
  
  function getTargetString() {
    for (let i = 0; i < string.length; i++) {
      if (string[i] === ';') {
        string = ' ' + string.slice(i+1) + ' ';
      }
    }
  }

  function getUsersArray() {
    const usersWithSpaces = string.match(userRegExp);
    users = usersWithSpaces.map((item) => item.replace(/,| /g, ''));
  }

  function getUsersWithTimesArrays() {

    for (let i = 0; i< users.length; i++) {

      let indexOfUserName = string.indexOf(users[i]);
      let lengthOfUserName = users[i].length;
      let indexOfNextUserName = string.indexOf(users[i+1]);
      let timesWithSpacesArray = string.slice(indexOfUserName+lengthOfUserName, indexOfNextUserName).match(timeRegExp);
      let timesWithoutSpacesArray = timesWithSpacesArray.map((item) => item.replace(/,| /g, ''));

      if(!result[users[i]]) {
        result[users[i]] = timesWithoutSpacesArray;
      } else {
        timesWithoutSpacesArray.forEach((item) => result[users[i]].push(item))
      }
  
      string = string.slice(indexOfUserName+lengthOfUserName)
    }
  }

    function convertMinutes() {
      for (let user in result) {
        result[user] = result[user].map((time) => time.replace(/m/g, ''))
      }
    }

    function convertHours() {
      for (let user in result) {
        for(let i = 0; i < result[user].length; i++) {
          if(result[user][i].match(timeConvertRegExp)) {
            let hoursToMinutes = result[user][i].slice(0, result[user][i].indexOf('h'))*60;
            let minutes = result[user][i].slice(result[user][i].indexOf('h')+1)
            result[user][i] = +result[user][i].replace(timeConvertRegExp, +hoursToMinutes + +minutes)
          } else {
            result[user][i] = +result[user][i]
          }
        }
      }
    }

    function getOverallTimeForEachUser() {
      for (let user in result) {
        result[user] = result[user].reduce((accumulator, currentValue) => +accumulator + +currentValue)
      }
    }

  getTargetString ();
  getUsersArray();
  getUsersWithTimesArrays();
  convertMinutes()
  convertHours()
  getOverallTimeForEachUser()

  return result
}
