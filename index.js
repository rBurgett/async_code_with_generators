/*
 1. Make sure data file exists
 2. Read config file
 3. Make HTTP request
 4. Read data file
 5. Append new data
 */

const co = require('co');
const fs = require('co-fs-extra');
const request = require('superagent');
// const fs = require('fs-extra');
// const fs = require('fs-extra-promise');

const handleError = err => console.error(err);

co(function*() {
    try {

        // 1
        yield fs.ensureFile('data.txt');

        // 2
        const res = yield fs.readFile('config.json', 'utf8');
        const { location } = JSON.parse(res);

        // 3
        const { text } = yield request.get(`http://localhost:8000?location=${location}`);
        const { temp } = JSON.parse(text).data;

        // 4
        const currentContent = yield fs.readFile('data.txt', 'utf8');

        // 5
        const newContent = currentContent + temp + '\n';
        yield fs.writeFile('data.txt', newContent, 'utf8');

        console.log('\nDone!');

    } catch (err) {
        handleError(err);
    }
});

// fs.ensureFileAsync('data.txt')
//     .then(() => fs.readFileAsync('config.json', 'utf8'))
//     .then(res => {
//         const { location } = JSON.parse(res);
//         return request
//             .get(`http://localhost:8000?location=${location}`);
//     })
//     .then(res => {
//         const { text } = res;
//         const { temp } = JSON.parse(text).data;
//         return new Promise((resolve, reject) => {
//             fs.readFileAsync('data.txt', 'utf8')
//                 .then(res1 => {
//                     const newContents = res1 + temp + '\n';
//                     resolve(newContents);
//                 })
//                 .catch(err => reject(err));
//         });
//     })
//     .then(contents => fs.writeFileAsync('data.txt', contents, 'utf8'))
//     .then(() => console.log('\nDone!'))
//     .catch(err => handleError(err));

// fs.ensureFile('data.txt', err => {
//     if (err) {
//         handleError(err);
//     } else {
//         fs.readFile('config.json', 'utf8', (err1, res) => {
//             const { location } = JSON.parse(res);
//             request
//                 .get(`http://localhost:8000?location=${location}`)
//                 .end((err2, res1) => {
//                     if (err2) {
//                         console.error(err2);
//                     } else {
//                         const { text } = res1;
//                         const { temp } = JSON.parse(text).data;
//                         fs.readFile('data.txt', 'utf8', (err3, res2) => {
//                             if (err3) {
//                                 handleError(err3);
//                             } else {
//                                 const newContents = res2 + temp + '\n';
//                                 fs.writeFile('data.txt', newContents, 'utf8', err4 => {
//                                     if (err4) {
//                                         handleError(err4);
//                                     } else {
//                                         console.log('\nDone!');
//                                     }
//                                 });
//                             }
//                         });
//                     }
//                 });
//         });
//     }
// });