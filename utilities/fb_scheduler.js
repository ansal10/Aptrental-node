const moment = require('moment');
const request = require('request');
const util = require('util');
const rp = require('request-promise');
const fs = require('fs');
const _ = require('underscore');

const startDelayWithMins = process.env.START_DELAY_MINUTES || 12;
const delayEachPostByMinutes = 30;
const startFromIndex = process.env.START_FROM_INDEX || 0;

let startTime = moment().add(startDelayWithMins, 'minutes');

const scheduleFromServer = async (data, pageId, pageAccessToken) => {

    let imageUrl = data[0];
    let caption = data[1] || '';
    caption += '\nबातें करने और वीडियो देखने के लिए install करें  👉 http://bit.ly/2uaTAE5';

    let scheduledTime = Number(Number(startTime.valueOf() / 1000).toFixed(0));
    let res = await postToFB(pageAccessToken, imageUrl, scheduledTime, pageId, caption);
    await sleep(2000);
    return res;


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
        return "success"
    } catch (e) {
        console.exception(e);
        return "error";
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

    // datas = _.uniq(datas, false, (d) => {return d[0]});
    return datas.slice(startFromIndex);
};


let datas = readDataFromPriyaPost();

const schedulePostForMultiplePages = async (datas) => {
    let pagesIds = [
        [
            "295998901139038",
            "EAAEw28ggKzcBAOErfyw4fPQISuZAeiK8vqmA3OT77KzNslkuI6kJKEa4HRSAZBVHgqovLGqrLdRwvO9ZBWzOqT7yeW7KAv7n8MMRb6DEJIppJbMe4aW0GkZAKq85iiujyJaVezpyDYvlxpxqIQvgKoVNeqg8Tp65ImKna0skJgoAgCKVqN8A"
        ],
        [
            "1796521323767833",
            "EAAEw28ggKzcBAIZANTEpAmDZAy8CEDWBi3VQEtnUuhzjYPHkTPLPufgRtCZCvDwBWJ6bVZCHBCtZCNm7jTCNk0lC4Bx9wdw6KmZApKZByXn9EWqmBNu3p7xzwMMmnAD4TsPxIKdqZApMoB8j5uQXilRBcTeiKXhGjdAy6dAJqQXcrzDIfRbyqQwT"
        ],
        [
            "929874473877175",
            "EAAEw28ggKzcBAM0etMBZAlspD2WZALXOerIZC3NlsBZCcsNUOQVhmlh6ktG7FD5ESnrZARIRLtOc1202H9UfZC2npbu3IVezriUAbZBIBlJU9WsR8VaRZCJ0Y4A1DBHDGJXg9XGBWsxLhVD6IfOPBFw4dMrSBE1Y2iNBZASUBhmmIYz0pMZCSLOSdP"
        ],
        [
            "2290600537633655",
            "EAAEw28ggKzcBAFgwMdwWEjisg3hRa9ktDh8ZCctgDOKn5ZCTLkZA1P2A5IJGqH80xeywhgz49BnAyqIZCSzkLvazPfS4AZAWOsbcaojWtEvicgZB3xfDZCj5OZBWXsFMkxsHH3DUy4TqKZA5jCriYJAm15afxaQKZCefsgZCwEAsxIBx2idwxmwef7A"
        ],
        [
            "361903491004709",
            "EAAEw28ggKzcBAOP5PpRiMVUqjsaDZBoRjhkRQ1vbqhM1BWZB9Wnm1BRdPo1Lk1qx2kNGNqXdJMjDlwGLxBUuDDdETZBAVNP5Yc2IrZCMJUdpP85MdtsozPhtJn2atC9t2cSWO4ORbTDBHEZCtmADWNgU6ZAVMeKUBlqE8DyVNg39J8EAX4nR2s"
        ]
    ];

    for (let i = 0; i < pagesIds.length; i++)
        pagesIds[i][2] = shuffleArray(datas);

    for (let i = 0; i < datas.length; i++) {
        for (let j = 0; j < pagesIds.length; j++) {
            let pageId = pagesIds[j][0];
            let pageAccessToken = pagesIds[j][1];
            let data = pagesIds[j][2][i];
            let res = await  scheduleFromServer(data, pageId, pageAccessToken);
            console.log("Published post %s to page id %s, status %s", i, pageId, res);
        }
        startTime = startTime.add(delayEachPostByMinutes, 'minutes');
    }
    console.log("All posts ended")

};

schedulePostForMultiplePages(datas);
// scheduleFromServer(startIndex, endIndex);



