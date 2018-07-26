const moment = require('moment');
const request = require('request');
const util = require('util');
const rp = require('request-promise');
const fs = require('fs');
const _ = require('underscore');

const startDelayWithMins = 12;
const delayEachPostByMinutes = 30;
let startTime = moment().add(startDelayWithMins, 'minutes');

const scheduleFromServer = async (data, pageId, pageAccessToken) => {

    let imageUrl = data[0];
    let caption = data[1] || '';
    caption += '\nFor funny and sarcastic memes \nमजाकिया और व्यंग्यात्मक memes के लिए \nDownload http://bit.ly/2Lmn1Oh';

    let scheduledTime = Number(Number(startTime.valueOf() / 1000).toFixed(0));
    await postToFB(pageAccessToken, imageUrl, scheduledTime, pageId, caption);
    await sleep(1000);


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
    let content = fs.readFileSync('../db/sadcasmposts', 'utf8');
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

    datas = _.uniq(datas, false, (d) => {return d[0]});
    return datas.slice(17);
};


let datas = readDataFromPriyaPost();

const schedulePostForMultiplePages = async (datas) => {
    let pagesIds = [
        [
            "119554311935735",
            "EAAEw28ggKzcBACc3g9mbO8HRvx4vb3z4xb3DU7YSqfcIaugZBDCBlZAlo5DAHtZBqfCjwNomN3EtLNumaJvzOUxo5r8QiBD0bPgQXLhDdG2B1tefN9pbssByw8ipqmCuB0ps4msXRVlZBlmJHS0W0SIuNcDsVdbFW5uCcpxTMQZDZD"
        ]
    ];

    for (let i = 0; i < pagesIds.length; i++)
        pagesIds[i][2] = datas;

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



