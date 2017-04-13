const express = require('express');

const app = express()
    .get('/', (req, res) => {
        setTimeout(() => {
            const obj = {
                data: { temp: 61 }
            };
            res.send(JSON.stringify(obj));
        }, 200);
    });

const server = app.listen(8000, () => {
    console.log('App listening at port', server.address().port);
});