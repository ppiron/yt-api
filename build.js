const pug = require("pug");
const fs = require("fs");
// const path = require("path");
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const getSubscribers = require("./utils.js");
let count;
const compiledFunction = pug.compileFile("./templates/index.pug");

const statistics = (async () => {
    return await getSubscribers("UCu1xf33gzdHN1BsFETwlBLw");
})();

statistics.then((data) => {
    count = data.count;
    const html = compiledFunction({
        count: count,
    });
    fs.writeFile("./public/index.html", html, (err) => {
        if (err) console.log(err);
    });
});
