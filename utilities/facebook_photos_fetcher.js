let startUrls = {
    "Sadcasm": "https://www.facebook.com/Sadcasm/photos/a.458106047914642.1073741828.458104154581498/1045707792487795/?type=3&theater",

    "Laugh": "https//www.facebook.com/laughingcolours/photos/a.10150471189319578.388832.173770089577/10157632423039578/?type=3&theater"
};

let images=[];

const isDuplicate = (img) =>{
    return images.length > 0 && images[images.length - 1][0] === img && img !== null;
};

const fetch = () => {
    try{
        let t = document.getElementsByClassName("fbPhotosPhotoCaption")[0].innerText;
        let img = document.getElementsByClassName("spotlight")[0].src;
        if (!isDuplicate(img))
            images.push([img, t]);
        else
            console.log("duplicate");
        document.getElementsByClassName("snowliftPager next hilightPager")[0].click()
    }catch (e){
        console.log("error");
    }
};

setInterval(function(){
    if(images.length > 500){
        console.log("Reached image threshold. clear images data");
    }else{
        fetch();
        console.log("fetched "+ images.length);
    }
}, 1000);