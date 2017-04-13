// Regular function example
// const myFunc = function() {
//     const words = ['My', 'name', 'is', 'Ryan'];
//     console.log(words[0]);
//     console.log(words[1]);
//     console.log(words[2]);
//     console.log(words[3]);
// }
// myFunc();

// Basic generator example
// const MyGen = function*() {
//     const words = ['My', 'name', 'is', 'Ryan'];
//     console.log(words[0]);
//     yield;
//     console.log(words[1]);
//     yield;
//     console.log(words[2]);
//     yield;
//     console.log(words[3]);
// };
// const myGen = MyGen();
// myGen.next();
// myGen.next();
// myGen.next();
// myGen.next();

// Asynchronous generator example
// const MyGen = function*() {
//     const words = ['My', 'name', 'is', 'Ryan'];
//     console.log(words[0]);
//     yield;
//     console.log(words[1]);
//     yield;
//     console.log(words[2]);
//     yield;
//     console.log(words[3]);
// };
// const myGen = MyGen();

// const myInterval = setInterval(() => {
//     const { done } = myGen.next();
//     if (done) clearInterval(myInterval);
// }, 1000);

// Passing information into a generator with next()
// const MyGen = function*() {
//     const words = ['My', 'name', 'is', 'Ryan'];
//     let idx = yield;
//     console.log(words[idx]);
//     idx = yield;
//     console.log(words[idx]);
//     idx = yield;
//     console.log(words[idx]);
//     idx = yield;
//     console.log(words[idx]);
// };
// const myGen = MyGen();
// myGen.next();

// let count = 0;
// const myInterval = setInterval(() => {
//     const { done } = myGen.next(count);
//     if (done) clearInterval(myInterval);
//     count++;
// }, 1000);

// Passing information out of a generator
// const MyGen = function*() {
//     const words = ['My', 'name', 'is', 'Ryan'];
//     let idx = yield;
//     idx = yield words[idx];
//     idx = yield words[idx];
//     idx = yield words[idx];
//     idx = yield words[idx];
// };
// const myGen = MyGen();
// myGen.next();

// let count = 0;
// const myInterval = setInterval(() => {
//     const { done, value } = myGen.next(count);
//     if (value) console.log(value);
//     if (done) clearInterval(myInterval);
//     count++;
// }, 1000);

// Building a run function
// const run = MyGen => new Promise((resolve, reject) => {
//     const myGen = MyGen();
//     const next = ({ done, value: prom }) => {
//         if (done) {
//             resolve();
//         } else {
//             prom
//                 .then(res => next(myGen.next(res)))
//                 .catch(err => reject(err));
//         }
//     };
//     next(myGen.next());
// });

// const request = require('superagent');

// Handle requests
// run(function*() {
//     try {

//         const locations = [18102, 18103, 18104];

//         const { text: text1 } = yield request.get(`http://localhost:8000?location=${locations[0]}`);
//         console.log(JSON.parse(text1).data.temp);

//         const { text: text2 } = yield request.get(`http://localhost:8000?location=${locations[1]}`);
//         console.log(JSON.parse(text2).data.temp);

//         const { text: text3 } = yield request.get(`http://localhost:8000?location=${locations[2]}`);
//         console.log(JSON.parse(text3).data.temp);

//     } catch (err) {
//         console.error(err);
//     }
// });

// Handle sequentially
// run(function*() {
//     try {
//         const locations = [18102, 18103, 18104];

//         for (const location of locations) {
//             const { text } = yield request.get(`http://localhost:8000?location=${location}`);
//             console.log(JSON.parse(text).data.temp);
//         }

//     } catch (err) {
//         console.error(err);
//     }
// });

// Handle concurrently
// run(function*() {
//     try {
//         const locations = [18102, 18103, 18104];

//         const promises = locations
//             .map(location => request.get(`http://localhost:8000?location=${location}`));

//         const res = yield Promise.all(promises);

//         res.forEach(({ text }) => console.log(JSON.parse(text).data.temp));

//     } catch (err) {
//         console.error(err);
//     }
// });