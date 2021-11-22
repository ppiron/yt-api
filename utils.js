const { google } = require("googleapis");
require("dotenv").config();

const key = process.env.YT_API_KEY;
const yt = google.youtube({
    version: "v3",
    auth: key,
});

const getSubscribers = async (channelId) => {
    const res = await yt.channels.list({
        part: "statistics",
        id: channelId,
    });
    const statistics = res.data.items[0].statistics;
    return { count: statistics.subscriberCount, views: statistics.viewCount };
};

module.exports = getSubscribers;
