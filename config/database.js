const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://zikiahnxjkjcpc:008c0a2e79abbbaf3ccb8043b96ec82a4a566598831e8e66db6f608fe75095c0@ec2-52-72-34-184.compute-1.amazonaws.com:5432/d717g3edne088o",
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = client;