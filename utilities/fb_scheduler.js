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
        [
            "295998901139038",
            "EAAEw28ggKzcBAHN7I0oE8ewbEKnKVVzSkZCzL9tWsMnZBjHRzv14qu1urSfKidZB19dNnRdhhZAsKEZB4UHPb5gbF8MFAHJNcfNyxGsDlv1NRiuKZBsZCZARvdTP4CywZBuncNAVTljZB0YBqZAA39fw1RhyRuJXfECf8019NnwYXDOxqnk05lEG5a1"],

        [
            "1796521323767833",
            "EAAEw28ggKzcBAHxB5peUrvsAsP1IkD5VywxYap7mK50UXLsiXRinzmf8pNPt4nmTOIeLZBV6nadpuiWo68fstOTv2dUWiGPHqu08Ogc0jk4ydQHujaBdNgm7w48iIlg00woodRo4qmw31LKBEzLfDwaMhLXBOBO1ZBYr36UUmK5lUWpXge"
        ],

        [
            "929874473877175",
            "EAAEw28ggKzcBAIPbtkIZBfG0HziPJ9jFZCjDXuVBeFmXdaeLbaIQ62zhDZAXEnrinjOPOI0VAyfNnXoPT2B1Yfui9ZAAZA2pN2vAMxFdgWgkgRZBbh39i3pe2bWMgcVZB1u4DdZCFUPCi1IWWkhIzD8jmxmHspbHZBrBGcxtTTvULxSQZCGy9pGfnG"
        ],

        [
            "2290600537633655",
            "EAAEw28ggKzcBAKb5uAw9SpEOc10fDllmFE2lUasobqHqaKwSEUo9ZAd0n0jZCCoZByJnjFOrdrBLRVCJczNwZCZBl3oTfReB6tmIcewjVAMv1riYXECt2mEZBlwWZAhC77cTtnIHVKI5PZAEAA0WCxF84gIZA33WZAfDqMTZAI1TTKlUhAFSWvT7CLG"
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



