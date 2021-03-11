const http = require('http');
const fs = require('fs');
const filename = './index.html';
const fileCSS = './style.css';

function doOnRequest(request, response) {
  //response.end("Welcome to Twitter") ;
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    var x = fs.readFileSync(filename);
    response.end(x);
    //fs.createReadStream();

  } else if (request.method === 'GET' && request.url === '/style.css') {
    // read the style.css file and send it back to the client
    var x = fs.readFileSync(fileCSS);
    response.end(x);
    //fs.createReadStream();

  } else if (request.method === 'POST' && request.url === '/sayHi') {
    try {
      fs.appendFileSync('./hi_log.txt', 'Somebody said hi.\n');
      response.end('hi back to you!');
    } catch (err) {
      response.end('hi back to you!');
    }

  } else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let body = '';

    request.on('data', chunk => {
      //console.log('chunk', chunk.toString());
      if (chunk.toString() === 'hello') {
        body = 'hello there!\n';
      } else if (chunk.toString() === 'what\'s up') {
        body = 'What\'s up brother \n';
      }
    });
    request.on('end', () => {
      fs.appendFileSync('./hi_log.txt', body);
      response.end(body);
    });


  } else {
    // Handle 404 error: page not found
    let res;
    response.statusCode = 404;
    response.statusMessage = `Error: Not Found brother`;
    //console.log('res', response);
    response.end(response.statusMessage);

  }
}

const server = http.createServer(doOnRequest)

server.listen(3001);
