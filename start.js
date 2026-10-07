const app = require('./app/server.js')

let port = process.env.PORT;
let hostname = process.env.HOSTNAME;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
