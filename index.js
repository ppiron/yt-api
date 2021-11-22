const { google } = require("googleapis");
const Jimp = require("jimp");
const path = require("path");
require("dotenv").config();

const key = process.env.YT_API_KEY;
const yt = google.youtube({
    version: "v3",
    auth: key,
});

async function searchSubscribers(username) {
    const res = await yt.search.list({
        part: "snippet",
        q: username,
        maxResults: 20,
        type: "channel",
    });
    let chId = res.data.items[0].snippet.channelId;
    // console.log(res.data.items[0]);

    const res1 = await yt.channels.list({
        part: "statistics",
        id: chId,
    });
    // console.log(res1.data);
    const statistics = res1.data.items[0].statistics;
    // console.log(
    //     `The user ${username} has ${statistics.subscriberCount} subscribers and ${statistics.viewCount} total views`
    // );
    return { count: statistics.subscriberCount, views: statistics.viewCount };
}

async function getSubscribers(channelId) {
    const res = await yt.channels.list({
        part: "statistics",
        id: channelId,
    });
    // console.log(res.data);
    const statistics = res.data.items[0].statistics;
    // console.log(
    //     `The user ${username} has ${statistics.subscriberCount} subscribers and ${statistics.viewCount} total views`
    // );
    return { count: statistics.subscriberCount, views: statistics.viewCount };
}

// main('Horizontal Gaming Gunsling').catch(console.error);

async function getImgSrc() {
    let image = await Jimp.read({
        url: "https://cdn2.iconfinder.com/data/icons/animals-nature-2/50/1F404-cow-128.png",
    });
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    let imgsrc = await image
        .resize(400, Jimp.AUTO)
        .print(
            font,
            10,
            10,
            {
                text: "Pippo",
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            },
            400,
            400
        )
        .getBase64Async(Jimp.MIME_PNG);
    return imgsrc;
}
// getImgSrc();

const fastify = require("fastify")({ logger: false });

fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
    prefix: "/public/", // optional: default '/'
});

fastify.register(require("point-of-view"), {
    engine: {
        pug: require("pug"),
    },
});

fastify.get("/", async (req, reply) => {
    return reply.view("/templates/index.pug", {
        count: 11,
        views: 130,
        // imgsrc: await getImgSrc(),
    });
});

fastify.get("/statistics", async (req, reply) => {
    const statistics = await getSubscribers("UCu1xf33gzdHN1BsFETwlBLw");
    console.log(statistics);
    return reply.send(statistics);
});

fastify.listen(3000, (err) => {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`);
});
