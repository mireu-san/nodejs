var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        /*  <ul>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ul>";
*/

        var list = "<ul>";
        var i = 0;
        while (i < filelist.length) {
          list =
            list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }

        list = list + "</ul>";
        var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
        response.writeHead(200);
        response.end(template);
      });
      ////
    } else {
      /* copied same code from above paragraph */
      /* since this is 'else' sector,  'if' is no longer needed down here. */
      fs.readdir("./data", function (error, filelist) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = "<ul>";
        /*  <ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>";
    */
        var list = "<ul>";

        var i = 0;
        while (i < filelist.length) {
          list =
            list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }

        list = list + "</ul>";
        /* end of copy from above paragraph */

        /* starting point : original 2nd paragraph */
        fs.readFile(`data/${queryData.id}`, "utf8", function (
          err,
          description
        ) {
          var title = queryData.id;
          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
        ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
          response.writeHead(200);
          response.end(template);
        });
        /* end of original 2nd paragraph */
      });
    }
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);

/* if stuck,
go https://opentutorials.org/module/3549/21046 + https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback (just for referencing purpose)
+ https://opentutorials.org/course/3332/21123 */
