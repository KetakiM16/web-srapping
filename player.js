let req = require("request")
let fs = require("fs")
let cheerio = require("cheerio")
let $;
let data = {};


function f(err,res,body) {
    if(!err){
        $ = cheerio.load(body)
        let allplayers =$(".Collapsible tbody tr td a")
        for(let i = 0 ; i < allplayers.length ; i ++) {
        getDOB($(allplayers[i]).attr("href"),$(allplayers[i]).text().trim())
        
        }

        
    
}
}

function getDOB(url,name){
    req(url,function (err,res,body) 
    {
        if(!err){
            $ = cheerio.load(body)
             let allinfo = $(".ciPlayerinformationtxt span")
             data[name]=$(allinfo[1]).text().trim()
             fs.writeFileSync("data.json",JSON.stringify(data))

        }
        
    })
}
req("https://www.espncricinfo.com/series/sri-lanka-tour-of-west-indies-2020-21-1252062/west-indies-vs-sri-lanka-2nd-test-1252074/full-scorecard",f)
