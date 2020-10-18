const { assert } = require('chai');
const { beforeEach, afterEach } = require('mocha')
const suppressLogs = require('mocha-suppress-logs');
const LobbySettings = require('../src/storage/LobbySettings');

let lobbySettings = undefined;

beforeEach('initialising lobbySettings', () => {
    lobbySettings = new LobbySettings();
});

afterEach('tearing down lobbySettings', () => {
    lobbySettings = undefined;
}); 

describe('LobbySettings', () => {
    suppressLogs();
  describe('constructor', () => {
    it('should return an object that is defined', () => {
        assert.isDefined(lobbySettings);
    })
    it('should return an object of type LobbySettings', () => {
        assert.instanceOf(lobbySettings, LobbySettings);
    });
    it('settings.answerTime should be the default value of 10 seconds', () => {
        assert.equal(lobbySettings.answerTime, 10);
    })
    it('settings.numQuestions should be the default value of 20 questions', () => {
        assert.equal(lobbySettings.numQuestions, 20);
    })
    it('settings.categories should be an empty array', () => {
        assert.equal(lobbySettings.categories.length, 0);
    })
  });

  describe('updateAnswerTime', () => {
      it('should correctly update when given a number', () => {
          const newAnswerTime = 45;
          const success = lobbySettings.updateAnswerTime(newAnswerTime);

          assert.equal(success, true);
          assert.equal(lobbySettings.answerTime, newAnswerTime);
      })
      it('should fail when NaN is given as a parameter', () => {
        const newAnswerTime = 'testing';
        const success = lobbySettings.updateAnswerTime(newAnswerTime);

        assert.equal(success, false);
      })
      it('should fail when given a value of 0', () => {
        const newAnswerTime = 0;
        const success = lobbySettings.updateAnswerTime(newAnswerTime);

        assert.equal(success, false);
      })
      it('should fail when given a value of less than 0', () => {
        const newAnswerTime = -78978;
        const success = lobbySettings.updateAnswerTime(newAnswerTime);

        assert.equal(success, false);
      })
  })

  describe('updateNumQuestions', () => {
    it('should update correctly when given a number', () => {
        const newNumQuestions = 50;
        const success = lobbySettings.updateNumQuestions(newNumQuestions);

        assert.equal(success, true);
        assert.equal(lobbySettings.numQuestions, newNumQuestions);
    })
    it('should fail when NaN is given as a parameter', () => {
      const newNumQuestions = 'testing';
      const success = lobbySettings.updateNumQuestions(newNumQuestions);

      assert.equal(success, false);
    })
    it('should fail when given a value of 0', () => {
      const newNumQuestions = 0;
      const success = lobbySettings.updateNumQuestions(newNumQuestions);

      assert.equal(success, false);
    })
    it('should fail when given a value of less than 0', () => {
        const newNumQuestions = -4;
        const success = lobbySettings.updateNumQuestions(newNumQuestions);

      assert.equal(success, false);
    })
  })

  describe('updateCategories', () => {
      it('should update correctly when given an array', () => {
          const newCategories = ['testing', 'testing123', 'testing234'];
          const success = lobbySettings.updateCategories(newCategories);

          assert.equal(success, true);
          assert.equal(lobbySettings.categories, newCategories);
          assert.equal(lobbySettings.categories[0], 'testing');
      })
      it("should fail when given a parameter that isn't an array", () => {
          const newCategories = { 'testing': 45, 'testing123': 12321 };
          const success = lobbySettings.updateCategories(newCategories);
          
          assert.equal(success, false);
      })
      it("should fail when given an empty array", () => {
        const newCategories = [];
        const success = lobbySettings.updateCategories(newCategories);
        
        assert.equal(success, false);
      })
  })
});
