

var fs = require('fs');
var xx = '{"coord":{"lon":120.9822,"lat":14.6042},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":302.53,"feels_like":306.73,"temp_min":300.99,"temp_max":302.66,"pressure":1011,"humidity":70},"visibility":10000,"wind":{"speed":4.12,"deg":90},"clouds":{"all":100},"dt":1650163744,"sys":{"type":2,"id":2008256,"country":"PH","sunrise":1650145268,"sunset":1650190195},"timezone":28800,"id":1701668,"name":"Manila","cod":200}';

var jsonres = require('./json.json');

var jsonon = JSON.parse(xx);
console.log(jsonon.base);

var rs;
rs = fs.readFileSync('./json.json', 'utf8');
console.log(rs);


