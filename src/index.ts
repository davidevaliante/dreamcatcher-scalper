import axios from 'axios'
import express from 'express'
import { parse, Node, HTMLElement } from 'node-html-parser';
import puppeteer from 'puppeteer'
import cron from 'node-cron'
import { scrapTable } from './data/scraping';
import { pushRows } from './data/push'

const PORT = 4002

const app = express()


const scrap = async (browser : puppeteer.Browser) => {
    const page = await browser.newPage()

    await page.goto('https://tracksino.com/dreamcatcher', { waitUntil: 'networkidle0' })

    const p = await page.evaluate(() => document.querySelector('*').outerHTML)

    await page.close()

    const root = parse(p)

    const tableRows = root.querySelectorAll('#spin-history')[0].querySelector('tbody').childNodes

    const formattedRows = await scrapTable(tableRows, browser)  

    // console.log(formattedRows)

    pushRows(formattedRows)
}

let scrapingCount = 1

const options = {
    headless: true
}

app.listen(PORT, async ()  => {
    console.log(`Dream Catcher scraper running on ${PORT}`)

    process.on('warning', e => console.warn(e.stack))

    puppeteer.launch(options).then(browser => {
        // scrap(browser)

        cron.schedule('*/10 * * * * *', async () => {
            console.log(`Scraping Count ${scrapingCount}`)
            scrapingCount++
            await scrap(browser)
        })
    })
})


