import faker from 'faker';
import puppeteer from 'puppeteer';
import fs from 'fs';

import { isDebugging } from './testingInit';

// port and host of dev server
const port = parseInt(fs.readFileSync('option/port', { encoding: 'utf8' }));
const host = fs
  .readFileSync('option/host', { encoding: 'utf8' })
  .replace('\n', '');

// form url
const APP = `http://${host}:${port}`;

// fake user
const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
};

// variables for puppeteer
let page;
let browser;

beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging());
  page = await browser.newPage();
});

afterAll(() => {
  browser.close();
});

describe('Contact form', () => {
  test(
    'lead can submit a contact request',
    async () => {
      await page.goto(APP);
      await page.waitForSelector('[data-test=contact-form]');
      await page.click('input[name=name]');
      await page.type('input[name=name]', lead.name);
      await page.click('input[name=email]');
      await page.type('input[name=email]', lead.email);
      await page.click('input[name=tel]');
      await page.type('input[name=tel]', lead.phone);
      await page.click('textarea[name=message]');
      await page.type('textarea[name=message]', lead.message);
      await page.click('input[type=checkbox]');
      await page.click('button[type=submit]');
      await page.waitForSelector('.modal', { visible: true });
    },
    isDebugging().jasmine
  );
});

describe('Testing the frontend', () => {
  test('assert that <title> is correct', async () => {
    const title = await page.title();
    expect(title).toBe('Jest + Puppeteer Practice');
  });

  test('assert that a div named navbar exists', async () => {
    const navbar = await page.$eval('.navbar', el => (el ? true : false));
    expect(navbar).toBe(true);
  });

  test('assert that main title contains the correct text', async () => {
    const mainTitleText = await page.$eval(
      '[data-test=main-title]',
      el => el.textContent
    );
    expect(mainTitleText).toEqual('__main_title__');
  });
});

describe('SEO', () => {
  test('canonical must be present', async () => {
    const canonical = await page.$eval('link[rel=canonical]', el => el.href);
    expect(canonical).toEqual('__canonical_url__');
  });
});
