const Chance = require('chance').Chance();
const faker = require('faker');

module.exports = {
  generatePlayerName: function() {
    var randomAnimal = Chance.animal({type: 'zoo'});
    var randomColour = faker.vehicle.color();
    //Sets first character of colour to upper case
    randomColour = randomColour.charAt(0).toUpperCase() + randomColour.slice(1);

    var username = randomColour + " " + randomAnimal;
    //console.log(username);
    return username
  }
}
