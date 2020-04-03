export function getSpentTime(string) {

  let users = [];
  let result = {};

  let timeReg = new RegExp(/[ ][0-9.]+h?([0-9.]+)?m?(?=,|$| )/, 'g');

  let userReg = new RegExp(/[ ][A-Za-z]([^, ]+)?(?= +[0-9.]+h?([0-9.]+)?m?(,|$| )?)/, 'g'); 

  let regSearch = new RegExp(/[0-9.]+h([0-9.]+)?m?/, 'g')
  
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ';') string = ' ' + string.slice(i+1) + ' ';
  }

  users = string.match(userReg).map((item) => item.replace(/,| /g, ''));

  for (let i = 0; i< users.length; i++) {

    if(!result[users[i]]) {
      result[users[i]] = string.slice(string.indexOf(users[i])+users[i].length, string.indexOf(users[i+1])).match(timeReg).map((item) => item.replace(/,| /g, ''));
    } else {
      string.slice(string.indexOf(users[i])+users[i].length, string.indexOf(users[i+1])).match(timeReg).map((item) => item.replace(/,| /g, '')).forEach((item) => result[users[i]].push(item))
    }

    string = string.slice(string.indexOf(users[i])+users[i].length)
  }

  for (let key in result) {
    result[key] = result[key].map(item => {

      if (item.match(regSearch)) {
        if (item[item.length-1] === 'm') {
          item = item.slice(0, item.length-1)
        }
        return +item.slice(0, item.indexOf('h'))*60 + +item.slice(item.indexOf('h')+1)
      }

      if (item[item.length-1] === 'm') {
        return +item.slice(0, item.length-1)
      } else return +item 
    
    }).reduce((accumulator, currentValue) => accumulator + +currentValue)
  }

  return result
}
