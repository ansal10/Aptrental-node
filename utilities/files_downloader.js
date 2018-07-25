const download = require('download');
const fs = require('fs');
const _ = require('underscore');
const util = require('util');

const config = {
    prod:{
        downloadDir: "/var/www/html/hott/laughingcolours/",
        dataFile: '../db/laughingcolorsposts'
    },
    dev:{
        downloadDir: "/Users/ansal/Downloads/",
        dataFile: '../db/laughingcolorsposts'
    }
};
const env = process.env.NODE_ENV || 'dev';

const lastFileNumberInDownloadDir = () =>{
    let files = fs.readdirSync(config[env].downloadDir);
    let numberedFiles = _.filter(files, (f) => {return Number(f.split(".")[0])});
    let sortedNames = _.sortBy(numberedFiles, (f) => {return f.toLowerCase()});
    let lastName = sortedNames.length > 0 ? sortedNames[sortedNames.length-1] : "0.jpg";
    return Number(lastName.split(".")[0]) || 0;
};

const readDataFromUrlsFile = () => {
    let content = fs.readFileSync(config[env].dataFile, 'utf8');
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
    return datas;  // [ url, caption ]
};

const downloadFilePromise = (url, destFilePath) =>{
    return download(url);
};

const execute = async () => {
    let startIndex = lastFileNumberInDownloadDir() + 1;
    let datas = readDataFromUrlsFile();

    for (let i = 0 ; i < datas.length ; i++){
        let destFilePath = util.format(config[env].downloadDir + "%s.jpg", startIndex);
        let url = datas[i][0];
        try {
            let data = await downloadFilePromise(url, destFilePath);
            fs.writeFileSync(destFilePath, data);
            console.log("Downloaded "+ destFilePath);
            startIndex ++;
        }catch (e) {
            console.log("Failed "+ destFilePath);
            console.log(error);
        }

    }
};

execute();
