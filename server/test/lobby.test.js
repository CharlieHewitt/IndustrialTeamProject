const { assert } = require('chai');
const Lobby = require('../src/storage/lobby');
const User = require('../src/storage/newUser');


// chai assertion library docs : https://www.chaijs.com/api/assert/

describe('lobby class', () => {
    const firstPlayer = new User("user1", "1234", 0);
    const secondPlayer = new User("user2", "4321", 0);
    const lobby = new Lobby(firstPlayer);

    describe('initialising lobby', () => {
        it ('adds host to the lobby', () => {
            assert.equal(lobby.players[firstPlayer.id], firstPlayer);
        });
    });

    describe('createLobbyID function', () => {
        let lobby = new Lobby(firstPlayer);
        let result = lobby.createLobbyID();
        it ('should return a non-empty variable', () => {
        assert.isNotNull(result);
        });
        it ('should return a string', () => {
        assert.isString(result);
        });
    });

    describe('addPlayer function', () => {
        lobby.addPlayer(secondPlayer);
        it ('should have added correct player to lobby', () => {
            assert.equal(lobby.players[secondPlayer.id], secondPlayer);
        });
        //TODO check for duplicates
    });

    describe('createGameLink function', () => {
        let url = lobby.createGameLink();
        it ('should return a link to a lobby', () => {
          assert.isNotNull(url);
        });
        // TODO: Actual tests testing for url need written
    });
});
