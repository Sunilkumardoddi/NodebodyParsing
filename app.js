const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></html>');
        return res.end();
    };
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        })
        req.on('end', () => {
            const bodyParsed = Buffer.concat(body).toString().split('=')[1];
            console.log(bodyParsed);
        })
        fs.writeFileSync('new.txt', 'Dummy text added');
        console.log(req.body);
        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
    };
    {
        res.setHeader('Content-type', 'text/html');
        res.write('<h1>Thank you for your search we are looking for your search <br> Until then enjoy Our minimalist service..I hope you understood</h1>')
        return res.end();
    }



}).listen(3000, () => {
    console.log('Your server is running')
})
