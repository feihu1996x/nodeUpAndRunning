var http = require('http');
var cheerio=require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [
    348,
    259,
    197,
    134,
    75,
];

var fetchCourseArray = [];
videoIds.forEach(function(id){
    fetchCourseArray.push(getPageAsync(baseUrl + id));
});

Promise
.all(fetchCourseArray)
.then(function(pages){
    var coursesData = [];
    pages.forEach((html)=>{
        coursesData.push(filterChapters(html));
    });
    coursesData.sort(function(a, b){
        return a.number < b.number;
    });
    printCourseInfo(coursesData);
});

function getPageAsync(url){
    return new Promise(function(resolve, reject){
        console.log('正在爬取：' + url);
        // 调用http.get()工厂方法
        // 创建一个http.ClientRequest实例
        http.get(url, (res)=>{
            var html = '';
            res.on('data', (data)=>{
                html += data;
            });
            res.on('end', ()=>{
                resolve(html);
            });
        }).on('error', (error)=>{
            reject(error);
        });
    });
}

function filterChapters(html){
    var $ = cheerio.load(html);
    var chapters = $('.chapter');
    var title = $('.course-infos .w .path span').text();
    var number = parseInt($('.js-learn-num').text(), 10) || '暂无数据';
    var courseData = {
        title: title,
        number: number,
        chapters: [],
    };
    chapters.each(function(item){
        var chapter = $(this);
        var chapterTitle = chapter.find('h3').text().trim();
        var videos = chapter.find('.video').children('li');
        var chapterData = {
            chapterTitle: chapterTitle,
            videos: [],
        };
        videos.each(function(item){
            var video = $(this).find('.J-media-item');
            var videoTitle = video.text().trim();
            var id = video.attr('href').split('video/')[1];
            chapterData.videos.push({
                title: videoTitle,
                id: id,
            });
        });
        courseData.chapters.push(chapterData);
    });
    return courseData;
}

function printCourseInfo(coursesData){
    coursesData.forEach(function(courseData){
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n');
        courseData.chapters.forEach(function(item){
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + '\n');
            item.videos.forEach(function(item){
                console.log('   【' + item.id + '】 ' + item.title + '\n');
            });
        });
    });    
}