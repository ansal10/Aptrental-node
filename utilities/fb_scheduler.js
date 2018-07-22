const moment = require('moment');
const request = require('request');
const util = require('util');
const rp = require('request-promise');
const fs = require('fs');


const startDelayWithMins = 11;
const delayEachPostByMinutes = 30;
let startTime = moment().add(startDelayWithMins, 'minutes');

const scheduleFromServer = async (data, pageId, pageAccessToken) => {

    let imageUrl = data[0];
    let caption = data[1] || '';
    caption += '\nChat ke liye डाउनलोड करें http://bit.ly/2uaTAE5';

    let scheduledTime = Number(Number(startTime.valueOf() / 1000).toFixed(0));
    await postToFB(pageAccessToken, imageUrl, scheduledTime, pageId, caption);
    await sleep(100);


};


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const postToFB = async (pageAccessToken, imageUrl, scheduledTime, pageId, caption) => {

    const baseDomain = "https://graph.facebook.com";
    const url = baseDomain + "/" + pageId + "/photos?access_token=" + pageAccessToken;

    const data = {
        "url": imageUrl,
        "caption": caption,
        "scheduled_publish_time": scheduledTime,
        "published": false
    };
    const params = {
        url: url,
        method: 'POST',
        body: data,
        json: true
    };

    try {
        let res = await rp(params);
        console.log(util.format("Posted image  with caption %s", caption));
        return res
    } catch (e) {
        console.log("error message, error publishing post");
        return e;
    }
};

const shuffleArray = (originalArray) => {
    let clonedArray = originalArray.slice(0);
    for (let i = clonedArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = clonedArray[i];
        clonedArray[i] = clonedArray[j];
        clonedArray[j] = temp;
    }
    return clonedArray;
};

const readDataFromPriyaPost = () => {
    let content = fs.readFileSync('../db/priyapost.txt', 'utf8');
    let contents = content.split("\n");
    let datas = [];
    contents.forEach((c) => {
        if (c != null && c.length > 0) {
            let ds = JSON.parse(c);
            ds.forEach((d) => {
                datas.push(d)
            })
        }
    });

    return datas;
};


let datas = readDataFromPriyaPost();

const schedulePostForMultiplePages = async (datas) => {
    let pagesIds = [
        ["295998901139038", "EAAEw28ggKzcBAKkBcr8ZClYZBUEsHFZBWlw9kMQp3MdrdXzleYqVAe0a7ys5CxrSwu6VsCOiLLLPnpZBjfPS1rbTRZBUiOoCuuZA6ZBOunFAH69YUDFI7XOnMABHnZCYNQIR2k35kFHOGHfNSupBF6nZChrUWAWiwyJMVXeqVNz07PVw5gxuNCOfc"],

        ["1796521323767833",
            "EAAEw28ggKzcBAGdCbkmtSZCl4z1Uz1LFSNOFWcvyUHH1lFXKMJZCLz7VGfZBZCziCUU0HaRgL9GDZB7yc1M8PZCdqnFBXGZCYN5g5QUDjkdNLFddKdwAZCowcUplbANanuYrHdihi8EIlTBZBdSO3tyHOhRdfOxLCZC6NZAeMO2SeJokQgyqJdmsCEy"
        ],

        [
            "929874473877175",
            "EAAEw28ggKzcBAHwVTqKEsIHRJiiZB404tcIZB1DDZAfZCXB6COouzt6sZBs5IJm6bHTRsZAUg92SLdbNEhQrSKhoNj3kQPWX6jXLeWlOiXGpV2T0ZClqCRN7jvNEAHmX4ZBceHP11wKs16ZCN77mS4AgUpdC6tEb7kqRSO8dcLbrOHwXpSPWTonHk"
        ],

        [
            "2290600537633655",
            "EAAEw28ggKzcBAA9qoyUUnDZCw4LCBFc1szDDmOL8zZC2fPWZCKlth8B4RX8pXGhGKz7T4TJnjFGB6ZANRehwIUs7DYS3BAnb3ByJI99IoEOpUbIDYhwMMrYmnwZAxTqze4ZBsRJWqFucopQpMZAnZAoXljSuDUjCS6RKIusFZB0YdKzfSq0qPvpZBL"
        ]
    ];

    for (let i = 0; i < pagesIds.length; i++)
        pagesIds[i][2] = shuffleArray(datas);

    for (let i = 0; i < datas.length; i++) {
        for (let j = 0; j < pagesIds.length; j++) {
            let pageId = pagesIds[j][0];
            let pageAccessToken = pagesIds[j][1];
            let data = pagesIds[j][2][i];
            await  scheduleFromServer(data, pageId, pageAccessToken);
            console.log("Published post %s to page id %s", i, pageId);
        }
        startTime = startTime.add(delayEachPostByMinutes, 'minutes');
    }
    console.log("All posts ended")

};

schedulePostForMultiplePages(datas);
// scheduleFromServer(startIndex, endIndex);



