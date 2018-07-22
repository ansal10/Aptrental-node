const cheerio = require('cheerio');
const request = require('request');
const rp = require('request-promise');
const urlConstant = "http://laughingcolours.com/wp-json/wp/v2/posts";
const images = [];
const loadPost = async (page) => {
    let promises = [];
    let url = urlConstant + "?page=" + page;
    let p = rp({method: 'GET', url: url, json: true});
    let posts = await p;

    for (let i = 0 ; i < posts.length ; i++){
        parsePost(posts[i])
    }
    console.log("True");

};

const parsePost = async (post) => {
     let slug = post.slug;
     let title = post.title.rendered;
     let htmlContent = post.content.rendered;
     let excerpt = post.excerpt.rendered;

};

loadPost(1);