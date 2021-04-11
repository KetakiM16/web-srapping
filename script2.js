
const request = require("request");
const cheerio = require ("cheerio");
let fs = require("fs");
const { default: jsPDF } = require('jspdf');
let $ ;
let data2 = {}


function linkgenerator(error, res , body) {
  if(!error)
    { 
    //fs.writeFileSync("index.html",body);
    $ = cheerio.load(body);
    let alltopics = $(".no-underline.d-flex.flex-column.flex-justify-center");
    let allTopicNames = $(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    //console.log(typeof alltopics)
    //console.log( alltopics.length)
    for(x = 0 ; x < 3; x++)
    {
      gettopicpage ($(allTopicNames[x]).text().trim() ,
      "https://github.com/"+ $(alltopics[x]).attr("href")
      );

      //console.log($(allTopicNames[x]).text().trim());
      //console.log("https://github.com/"+$(alltopics[x]).attr("href")); 
    
    }
  }
  //console.log(response);

function gettopicpage(name,url){
  //url request html page
  request (url,function(error,res,body)
  {
    if(!error){ 
       $ = cheerio.load(body);
       let allprojects = $(".f3.color-text-secondary.text-normal.lh-condensed .text-bold");
       for(x= 0 ; x < allprojects.length; x++){
         let projectTitle = $(allprojects[x]).text().trim();
         let projectlink = "https://github.com/"+ $(allprojects[x]).attr("href");
         if(!data2[name]){
           data2[name]=[{name: projectTitle,
          link:projectlink}];
         }else{
           data2[name].push({name: projectTitle,
            link:projectlink});
           }
           //getIsuuepage
           getIssuepage(projectTitle,name,projectlink+"/issues");
        }
      }
      

       });
         
}
function getIssuepage(projecName,topicName,url){
        request(url,function(error, res ,body) {
          if(!error)
          $ = cheerio.load(body)
           let allissues = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
           for(let x = 0 ; x <allissues.length;x++)  {
             let issueurl = "https://github.com/ " + $(allissues[i]) + attr("href")
             let issueTitle  = $(allissues[x]).text().trim();

             let index = -1;
             for (let i = 0 ; i < data2[topicName];i++)
             {              
               if(data2[topicName][i]=== projecName){
                 index = i;
                 break;
               }
             }
            if(!data2[topicName][index].issues){
              data2[topicName][index]=[{issueTitle,issueurl}]
            }else{data2[topicName][index].issues.push({issueTitle,issueurl});
           }


        }
        
       
       fs.writeFileSync("data2.json",JSON.stringify(data2));
       
       pdfGenerator(data2);

        });
      
    }
}
 
request("https://github.com/topics",linkgenerator)


function pdfGenerator(d){
  for( x in d){
    if(!fs.existsSync(x))fs.mkdirSync(x)
    let path = "./"+x+"/";N
    for(y in d[x]){
      const doc = new jsPDF();
      let issueArr = d[x][y].issues;
      let spacing = 1
      for(z in issueArr){
        doc.text(issueArr[z].issueTitle,10,10* spacing);
        doc.text(issueArr[z].issueurl,10,10* spacing + 5);
        spacing ++;

      }
      if( fs.existsSync (path + d[x][y].name+ ".pdf"))
      fs.unlinkSync(path + d[x][y].name+ ".pdf")
      doc.save(path + d[x][y].name+ ".pdf")
    }
  }
}
