const getSubscribers = require("../utils.js");

exports.handler = async function (event, context) {
    const statistics = await getSubscribers("UCu1xf33gzdHN1BsFETwlBLw");

    return {
        statusCode: 200,
        body: JSON.stringify(statistics),
    };
};
