const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     let payload = { 'hello': 'world' }
     if (req.url === '/articles' && req.method === 'GET') {
     	payload = {articles: [ { id:1, author: 'Scott', body:'A post' },
     							{id:2, author: 'Gavin', body: 'Another Post'},
     							{id:3, author: 'Geng', body: 'AAnothernPost'}]
     }}else if (req.url === '/' && req.method === 'GET') {
     	payload.hello = 'world';
     }else if (req.url === '/login' && req.method ==='POST') {
		let json = JSON.parse(req.body)
		payload={}
        payload.username = json.username
        payload.result = 'success'
     }else if (req.url === '/logout' && req.method === 'PUT') {
     	payload = 'OK'
     } else {
     	payload = 'do not know what to do'
     }

     res.setHeader('Content-Type', 'application/json')
     res.statusCode = 200
     res.end(JSON.stringify(payload))
}
