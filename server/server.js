const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const config = require('dotenv').config()

const pgp = require('pg-promise')();
console.log(process.env.DATABASE_URL);
var db = pgp(process.env.DATABASE_URL);

const port = process.env.PORT || 5000;

const publicPath = path.join(__dirname, '../react-frontend', 'build');

app.use(express.static(publicPath));

app.post('/api/bug', jsonParser, (req, res) => {
  console.log(req.body)
  const bug = req.body.bug;
  const values = [
    bug.assignedTo,
    bug.bugName,
    bug.createdBy,
    bug.deadline,
    bug.hoursWorked,
    bug.percentComplete,
    bug.severity,
    bug.status,
    bug.summary,
    bug.timeEstimate,
    bug.version
  ];
  db.none(
    'INSERT INTO bugs (assigned_to, bug_name, created_by, deadline, hours_worked, percent_complete, severity, status, summary, time_estimate, version, created_on) '
    +'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, current_timestamp) '
    +'ON CONFLICT (bug_name) DO UPDATE '
    +'SET assigned_to = $1, bug_name = $2, created_by = $3, deadline = $4, hours_worked = $5, percent_complete = $6, severity = $7, status = $8, summary = $9, time_estimate = $10, version = $11;',
    values
  ).then( t => {
    res.send(`Your Post request was recieved. Here is what you sent: ${req.body}`);
  })
  .catch(error => {
    console.log(error);
  })
});

app.listen(port, () => {
  console.log('server running');
});
