import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeWebsiteContent = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $('body').text();
    return text.replace(/\s+/g, ' ').trim().slice(0, 8000);
  } catch (err) {
    console.error('Scraping error:', err);
    return 'Failed to fetch content from the website.';
  }
};
