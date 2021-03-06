// back-end URL to use (switches depending on whether app is in dev or prod environment)
const URL =
  // !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  //   ? "http://localhost:4000"
  //   :
  "https://team10-industrialteamproject.herokuapp.com";

const fetchJSON = async (url, reqData = {}) => {
  if (reqData)
    reqData.headers = {
      "Content-Type": "application/json",
    };
  if (reqData.body) reqData.body = JSON.stringify(reqData.body);
  let res = await fetch(url, reqData);
  res = await res.json();
  return res;
};

const API = {
  // GENERAL API
  async getCategories() {
    let res = await fetchJSON(`${URL}/api/categories`);
    return res;
  },
  //   LOBBY API
  async createLobby(hostName) {
    let res = await fetchJSON(`${URL}/api/lobby/create`, {
      method: "POST",
      body: { hostName },
    });
    return res;
  },

  async joinLobby(lobbyId, playerName) {
    let res = await fetchJSON(`${URL}/api/lobby/join/`, {
      method: "POST",
      body: { lobbyId, playerName },
    });
    return res;
  },
  async getChosenCategories(lobbyId) {
    let res = await fetchJSON(`${URL}/api/lobby/categories/`, {
      method: "POST",
      body: { lobbyId },
    });
    return res;
  },
  async getLobbyPlayers(lobbyId) {
    let res = await fetchJSON(`${URL}/api/lobby/getLobbyPlayers`, {
      method: "POST",
      body: {
        lobbyId,
      },
    });
    return res;
  },
  //   GAME LOGIC API
  async endLobby(lobbyId, playerId) {
    let res = await fetchJSON(`${URL}/api/quiz/host/endLobby/`, {
      method: "POST",
      body: { lobbyId, playerId },
    });
    return res;
  },
  async updateSettings(lobbyId, playerId, settings) {
    let res = await fetchJSON(`${URL}/api/quiz/host/settings/`, {
      method: "POST",
      body: { lobbyId, playerId, settings },
    });
    return res;
  },
  async startQuiz(lobbyId, playerId) {
    let res = await fetchJSON(`${URL}/api/quiz/host/start/`, {
      method: "POST",
      body: { lobbyId, playerId },
    });
    return res;
  },
  async checkQuizStatus(lobbyId, playerId) {
    let res = await fetchJSON(`${URL}/api/quiz/start/`, {
      method: "POST",
      body: { lobbyId, playerId },
    });
    return res;
  },
  async getNextQuestion(lobbyId, playerId, questionNumber) {
    let res = await fetchJSON(`${URL}/api/quiz/nextQuestion/`, {
      method: "POST",
      body: { lobbyId, playerId, questionNumber },
    });
    return res;
  },
  async sendAnswer(lobbyId, playerId, questionNumber, answer) {
    let res = await fetchJSON(`${URL}/api/quiz/answer/`, {
      method: "POST",
      body: {
        lobbyId,
        playerId,
        questionNumber,
        answer,
      },
    });
    return res;
  },
  async getLeaderboard(lobbyId, playerId) {
    let res = await fetchJSON(`${URL}/api/quiz/leaderboard/`, {
      method: "POST",
      body: { lobbyId, playerId },
    });
    return res;
  },
  async fiftyFify(lobbyId, playerId) {
    let res = await fetchJSON(`${URL}/api/quiz/fiftyFifty/`, {
      method: "POST",
      body: { lobbyId, playerId },
    });
    return res;
  },
  async skip(lobbyId, playerId, questionNumber) {
    let res = await fetchJSON(`${URL}/api/quiz/skip/`, {
      method: "POST",
      body: { lobbyId, playerId, questionNumber },
    });
    return res;
  },

  async pollQuestion(lobbyId, playerId, questionNumber) {
    let res = await fetchJSON(`${URL}/api/polling/questionOver`, {
      method: "POST",
      body: { lobbyId, playerId, questionNumber },
    });
    return res;
  },

  async pollLeaderboard(lobbyId, playerId, questionNumber) {
    let res = await fetchJSON(`${URL}/api/polling/leaderboardOver`, {
      method: "POST",
      body: { lobbyId, playerId, questionNumber },
    });
    return res;
  },
};

export default API;
