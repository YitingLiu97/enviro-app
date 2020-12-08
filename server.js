const express = require('express'); // Web Framework
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
// logging
const fs = require('fs');
const logger = require('morgan');
const path = require('path');
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
});
// start app with `DEBUG=app:* node .` to see logs
const debug = require('debug')('app:server');

// mysql connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.CONN_DEV_HOST,
    user: process.env.CONN_DEV_USER,
    password: process.env.CONN_DEV_PASSWORD,
    database: process.env.CONN_DEV_DB
});
app.use(logger('dev')); // log to cons>
app.use(logger('combined', {
    stream: accessLogStream
})); // log to file
app.use(cors()); // enable cros>
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
})); // for applica>//
// app.use(authorizedDevice);                                 // check mac>
const server = app.listen(process.env.PORT || 8080, function () {
    const host = server.address().address;
    const port = server.address().port;
    debug('app listening at http://%s:%s', host, port)
});

function formatResponse(thisContent) {
    var result = 'mic ' + thisContent.mic + ' water ' + thisContent.water;
    return result;
}

// Add data point to databases
app.put('/data', function (req, res) {
    const data = formatResponse(req.body);
    console.log("data from post", data);
    resultArr = data.split(" ");
    micVal = resultArr[1];
    waterVal = resultArr[resultArr.length - 1];
    console.log(resultArr);
    console.log(data);

    if (!data) {
        res.status(400).send(`Bad request, data can not be null\n`);
        return;
    }
    //insert the data to the micVal and waterVal only
    const insert = 'INSERT INTO data (micVal, waterVal) VALUES (?,?)';
    const params = [micVal, waterVal];
    debug(insert, params);

    pool.query(insert, params, (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('server error\n');
        } else {
            // location header points to the new resource
            res.location(`/data/${results.insertId}`);
            res.status(201).send(`Created ${results.insertId}\n`);
        }
    });
});

// Get all the data submitted for a MAC address

app.get('/data', function (req, res) {
    const data = formatResponse(req.body);
    //get all data from data table
    const query = 'SELECT * FROM data';
    pool.query(query, (error, results, fields) => {
        // return pretty JSON which is inefficient but much easier to underst>    
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results, null, 2));
    });
});

app.get('/data/micVal', function (req, res) {
    const query = 'SELECT id, micVal, created_at FROM data';
    pool.query(query, (error, results, fields) => {
        // return pretty JSON which is inefficient but much easier to underst>
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results, null, 2));
    });
});

app.get('/data/waterVal', function (req, res) {
    const query = 'SELECT id, waterVal, created_at FROM data';
    pool.query(query, (error, results, fields) => {
        // return pretty JSON which is inefficient but much easier to underst>
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results, null, 2));
    });
});
app.get('/data/date', function (req, res) {
    const from = moment(req.body.from || req.query.from).format('YYYY-MM-DD HH:mm:ss');
    const to = moment(req.body.to || req.query.to).format('YYYY-MM-DD HH:mm:ss');
    console.log("from", from);

    const decodedFrom = decodeURIComponent(from);
    const decodedTo = decodeURIComponent(to);
    console.log("decodedFrom", decodedFrom);
    console.log("decodedTo", decodedTo);

    //replace the from and to  below
    const query = 'SELECT * FROM data WHERE created_at BETWEEN \''+decodedFrom+'\'  AND \''+decodedTo+'\';';
        console.log("query", query);
    const params = [from, to];
    pool.query(query, params, (error, results, fields) => {
        // return pretty JSON which is inefficient but much easier to underst>    
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(results, null, 2));

    });
});

//get the determined size of the data
app.get('/data/size/:size', function (req, res) {
    const size = req.params.size;
    //const SizeSmall = req.body.from ||req.query.from;
    //const SizeLarge = req.body.to || req.query.to;

    const query = 'SELECT * FROM data ORDER BY id DESC LIMIT ' + size + ';';
    console.log("size", size);

    const params = [size];
    //this params is actually req.params.size;
    debug(req.params, size);

    console.log("query", query);

    pool.query(query, params, (error, results, fields) => {
        // return pretty JSON which is inefficient but much easier to underst>    
        res.setHeader('Content-Type', 'application/json');
        console.log(JSON.stringify(results, null, 2));
        res.end(JSON.stringify(results, null, 2));
    });

});

// Get one record by id and MAC address
app.get('/data/id/:id', function (req, res) {
    const id = req.params.id;
    // const idPrev = req.params.id;
    //const idEnd = req.params.id;
    //  const macAddress = req.body.macAddress;
    const query = 'SELECT * FROM data WHERE id=?';
    const params = [id];
    debug(query, params);

    pool.query(query, params, (error, results, fields) => {
        if (results.length > 0) {
            // return pretty JSON which is inefficient but much easier to under>
            res.setHeader('Content-Type', 'application/json');

            console.log(JSON.stringify(results, null, 2));
            res.end(JSON.stringify(results, null, 2));
        } else {
            res.status(404).send(`Id ${id} not found.`);
        }
    });

});


app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html'); // change the path to your index.html
  });
  