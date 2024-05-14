const http = require("http")
const { PORT } = require("./utils/config")
const { info } = require("./utils/logger")

const App = require("./App")
const server = http.createServer(App)

server.listen(PORT, () => {info(`Server is running on port ${PORT}`)})
