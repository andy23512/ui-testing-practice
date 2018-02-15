import faker from "faker"
import puppeteer from "puppeteer"
import fs from "fs"

// port and host of dev server
const port = parseInt(fs.readFileSync('option/port', {encoding: 'utf8'}))
const host = fs.readFileSync('option/host', {encoding: 'utf8'}).replace('\n', '')

// form url
const APP = `http://${host}:${port}`

// fake user
const lead = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  message: faker.random.words()
}

// variables for puppeteer
let page
let browser
const width = 1920
const height = 1080

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false, // actual browser view
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

afterAll(() => {
  browser.close()
})

describe("Contact form", () => {
  test("lead can submit a contact request", async () => {
    await page.goto(APP)
    await page.waitForSelector('[data-test=contact-form]')
    await page.click('input[name=name]')
    await page.type('input[name=name]', lead.name)
    await page.click('input[name=email]')
    await page.type('input[name=email]', lead.email)
    await page.click('input[name=tel]')
    await page.type('input[name=tel]', lead.phone)
    await page.click('textarea[name=message]')
    await page.type('textarea[name=message]', lead.message)
    await page.click('input[type=checkbox]')
    await page.click('button[type=submit]')
    await page.waitForSelector('.modal', {visible: true})
  }, 20000)
})
