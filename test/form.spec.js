import faker from "faker"
import puppeteer from "puppeteer"
import fs from "fs"

// port and host of dev server
const port = parseInt(fs.read-file-sync('../option/port', {encoding: 'utf8'}))
const host = fs.read-file-sync('../option/host', {encoding: 'utf8'}).replace('\n', '')

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
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
})

afterAll(() => {
  browser.close()
})
