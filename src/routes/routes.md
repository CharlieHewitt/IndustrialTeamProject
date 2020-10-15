# List of HTTP routes for the application

/routename HTTPMETHOD - description

eg

/categories GET - retrieve a list of categories

api/lobby/getCategories GET - retrieve a list of categories

/:gameid/:playerid/response POST - { questionID: string, answerID: number}

Post - Passes in Username

http://localhost:4000/api/username/send Post - { username: string}
