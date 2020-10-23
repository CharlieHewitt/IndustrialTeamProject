const express = require('express');
const router = express.Router();

router.post('/questionOver', async (req, res) => {
  const { lobbyId, playerId, questionNumber } = req.body;

  const lobbies = req.app.locals.allLobbies;

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  const lobby = lobbies.getLobby(lobbyId);

  if (!lobby) {
    res.json({ error: 'Error: Invalid lobbyId' });
    return;
  }

  const currPhase = lobby.currentPhase.getPhase();

  // check phase
  if (
    !(
      currPhase === 'leaderboard' ||
      currPhase === 'end' ||
      currPhase === 'question'
    )
  ) {
    res.json({
      error: `Request Error: wrong phase, currently in ${currPhase}, should be question leaderboard or end`,
    });
  }

  if (lobby.checkPlayerIsInLobby(playerId) === false) {
    res.json({ error: 'Request Error, invalid playerId' });
    return;
  }

  if (!lobby.questionTimerExists()) {
    res.json({ error: "Error : questionTimer doesn't exist" });
    return;
  }

  // question phase has ended
  if (lobby.hasQuestionTimerExpired()) {
    // Lockout statement so we only go forward one question
    if (
      lobby.currentQuestionNumber === questionNumber &&
      currPhase === 'question'
    ) {
      // server should move to leaderboard state.
      console.log('questionTimer expired, moving to leaderboard');
      lobby.moveToLeaderboard();
    }

    // send response -> Move on to Leaderboard phase
    res.json({
      questionOver: true,
      questionNumber: lobby.currentQuestionNumber,
    });
  } else {
    const timeRemaining = lobby.timeRemainingOnQuestionTimer();
    console.log(
      `questionTimer checked, but not yet expired: ${timeRemaining} ms to go`
    );

    // send response -> Still in Question phase
    res.json({
      questionOver: false,
      questionNumber: lobby.currentQuestionNumber,
      timeRemaining,
    });
  }
});

router.post('/leaderboardOver', async (req, res) => {
  const { lobbyId, playerId, questionNumber } = req.body;

  const lobbies = req.app.locals.allLobbies;

  if (!lobbies.checkLobbyValid(lobbyId)) {
    res.json({
      error: 'Invalid lobbyID entered',
    });
    return;
  }

  const lobby = lobbies.getLobby(lobbyId);

  if (!lobby) {
    res.json({ error: 'Error: Invalid lobbyId' });
    return;
  }

  const currPhase = lobby.currentPhase.getPhase();
  let quizFinished = false;

  if (currPhase === 'end') {
    quizFinished = true;
  }

  // check phase
  if (
    !(
      currPhase === 'leaderboard' ||
      currPhase === 'end' ||
      currPhase === 'question'
    )
  ) {
    res.json({
      error: `Request Error: wrong phase, currently in ${currPhase}, should be question leaderboard or end`,
    });
  }

  if (lobby.checkPlayerIsInLobby(playerId) === false) {
    res.json({ error: 'Request Error, invalid playerId' });
    return;
  }

  if (!lobby.leaderboardTimerExists() && lobby.questions.length > 1) {
    res.json({ error: "Error : leaderboardTimer doesn't exist" });
    return;
  }

  if (lobby.hasLeaderboardTimerExpired()) {
    console.log(
      `phase: ${currPhase}, number: ${questionNumber}, expectedNumber: ${lobby.currentQuestionNumber}`
    );
    if (
      currPhase === 'leaderboard' &&
      lobby.currentQuestionNumber === questionNumber
    ) {
      // server should move to nextQuestion state.
      lobby.moveToNextQuestion();
      console.log('leaderboardTimer expired, moving to nextQuestion');
    }
    // send response -> move to question phase
    res.json({ leaderboardOver: true, quizFinished });
  } else {
    const timeRemaining = lobby.timeRemainingOnLeaderboardTimer();
    console.log(
      `leaderboardTimer checked, but not yet expired: ${timeRemaining} ms to go`
    );
    res.json({ leaderboardOver: false, timeRemaining, quizFinished });
  }
});

module.exports = router;
