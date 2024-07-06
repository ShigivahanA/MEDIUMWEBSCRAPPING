const express = require('express');
const { scrapeMedium } = require('./scraper');

const app = express();
const port = 5000;

let scrapedArticles = [];

app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }
    try {
        scrapedArticles = await scrapeMedium(topic);
        res.json({ articles: scrapedArticles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/articles', (req, res) => {
    res.json({ articles: scrapedArticles });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
