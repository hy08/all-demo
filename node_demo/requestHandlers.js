const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs');
const formidable = require("formidable");

function start(response, postData) {
  console.log('Request handle "start" was called ');
  // const id = setTimeout(() => {
  //   exec('dir', function (error, stdout, stderr) {
  //     // console.log('error->>', error);
  //     // console.log('stderr->>', stderr);
  //     clearTimeout(id);
  //     response.writeHead(200, { "Content-Type": 'text/plain;charset=UTF-8' });
  //     response.write(stdout);
  //     response.end();
  //   })
  // }, 10000);
  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log('Request handle "upload" was called ');

  const form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(request, (error, field, files) => {
    console.log('parsing done');
    // fs.renameSync(files.upload.path, './tmp/test.png');
    var readStream = fs.createReadStream(files.upload.path)
    var writeStream = fs.createWriteStream("./tmp/test.png");
    readStream.pipe(writeStream);
    readStream.on('end', function () {
      fs.unlinkSync(files.upload.path);
    });
    response.writeHead(200, { "Content-Type": 'text/html' });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  })
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("./tmp/test.png", "binary", function (error, file) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "image/png" });
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;