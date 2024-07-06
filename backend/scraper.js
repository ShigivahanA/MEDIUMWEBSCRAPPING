const puppeteer = require('puppeteer');

async function scrapeMedium(tag) {
    const browser = await puppeteer.launch({ headless: true }); 
    const page = await browser.newPage();

    await page.goto('https://medium.com/');
    
    await page.setCookie({
        name: 'mediumToken',
        value: '2b855abf9666b8fe2d8dbed6368e7dabe1e3a52c852e246553edfab1e8d6f363c',
        domain: '.medium.com',
        path: '/',
        httpOnly: true,
        secure: true
    });

    await page.reload();
    
    await page.goto(`https://medium.com/tag/${tag}`);

    const articles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('article')).map(article => {
            const titleElement = article.querySelector('h2');
            const authorElement = article.querySelector('p');
            const dateElement = article.querySelector('span');
            const anchorElements = article.querySelectorAll('a');
            const urlElement = anchorElements[3];
            return {
                title: titleElement ? titleElement.innerText : null,
                author: authorElement ? authorElement.innerText : null,
                date: dateElement ? dateElement.innerText : null,
                url: urlElement ? `https://medium.com${urlElement.getAttribute('href')}` : null            };
        }).filter(article => article.title); 
    });

    await browser.close();

    return articles.slice(0, 5); 
}

module.exports = { scrapeMedium };
