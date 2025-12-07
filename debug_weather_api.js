const https = require('https');
const fs = require('fs');

const apiKey = 'e6d92c11c9384c31aba94149240109';
const query = 'New Delhi';

const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
};

fetchData(url)
    .then((current) => {
        fs.writeFileSync('debug_current_no_aqi.json', JSON.stringify(current, null, 2));
        console.log('Debug output written to debug_current_no_aqi.json');
    })
    .catch(console.error);
