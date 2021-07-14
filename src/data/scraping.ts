import { parse, Node } from 'node-html-parser'
import { buildEmptySpin, Spin } from '../models/Spin'
import { rawStringToFormattedDate, rawStringToUnixTime } from '../utils/date-utils'
import { asyncForEach, spinResultImageToSymbol, SlotResultSymbols, SpinResultSymbols } from '../utils/utils'
import puppeteer from 'puppeteer'
import { spinResultImageNameToSymbol } from './../utils/utils';

export const scrapTable = async (tableRows : Node[], browser : puppeteer.Browser) : Promise<Spin[]> => {
    const formattedRows : Spin[] = []

    await asyncForEach(tableRows, async (row : any , rowIndex : number) => {
        const newSpin : Spin =  buildEmptySpin() 

        await asyncForEach(row.childNodes, async (cell : Node, index : number) => {

            // Occured At
            if(index == 0){
                const rawDate = cell.textContent.trim()
                newSpin.rawTime = rawDate
                newSpin.date = rawStringToFormattedDate(rawDate)
                newSpin.timeOfSpin = rawStringToUnixTime(rawDate) 
            }

            // Spin Result
            if(index == 1){
                const secondCell = cell
                const spanInside = secondCell.childNodes[0].childNodes.filter(it => it.rawText.trim().length != 0 || it['rawTagName'] === 'i')
            
                const imageName = spanInside.find(it => it['rawTagName'] === 'i')['rawAttrs'].split('class="')[1].split('"')[0]
                newSpin.spinResultSymbol = spinResultImageToSymbol(imageName)
            }

            // Multiplier
            if(index == 2){
                const thirdCell = cell
                const normalMultiplierText = thirdCell.childNodes[0].rawText.trim()
                newSpin.multiplier = normalMultiplierText
            }

            // Special Multiplier
            if(index == 3){
                const fourthCell = cell
                const boardRollValue = fourthCell.childNodes[0].rawText.trim()
                newSpin.specialmultiplier = boardRollValue
            }
            
            // Total Winners
            if(index == 4){
                const fifthCell = cell
                if(newSpin.specialmultiplier === ''){
                    const totalWinnersValue = parseInt(fifthCell.childNodes[0].rawText.trim().replace(',', '').replace('€', ''))
                    newSpin.totalWinners = totalWinnersValue
                }
            }

            // Total Payout
            if(index == 5){
                const sixthCell = cell
                if(newSpin.specialmultiplier === ''){
                    const totalPayout = parseInt(sixthCell.childNodes[0].rawText.trim().replace(',', '').replace('€', ''))
                    newSpin.totalPayout = totalPayout
                }
            }

            // Watch Video
            if(index == 6){
                const seventhCell = cell
                const watchVideo = seventhCell.childNodes[0]
                if(watchVideo && watchVideo['rawAttrs'] !== undefined) {
                    const videoUrl = watchVideo['rawAttrs'].split(' ')[0].split('href="')[1].replace('"', '')

                    const extractVideoUrl = async (request : any) => {
                        if (request.url().includes('vimeo')) {
                            const videoId = request.url().split('id=')[1].split('&')[0]
                            const clipUrl = `https://player.vimeo.com/video/${videoId}`
                            newSpin.watchVideo = clipUrl

                            // console.log(`set video for row ${rowIndex}`)
                        } else request.continue()
                    }

                    const videoPage = await browser.newPage()
                    const videoPageUrl = `https://tracksino.com${videoUrl}`
                    try{
                        await videoPage.setRequestInterception(true);
                    
                        videoPage.on('request', extractVideoUrl)


                        await videoPage.goto(videoPageUrl,  { waitUntil: 'networkidle0', timeout : 2000 })
                    } catch(e) {
                     
                    } finally {
                        videoPage.off('request', extractVideoUrl)
                        videoPage.close()
                    }
                }
            }
        })

        newSpin._id = `${newSpin.timeOfSpin}-${newSpin.totalWinners}-${newSpin.totalPayout}`
        formattedRows.push(newSpin)
    })

    console.log(formattedRows)

    return formattedRows
}

export const scrapStats = async (statsSection : Node[]) => {

    await asyncForEach(statsSection, async (section : Node, cardIndex : number) => {
        const cardBody = section.childNodes[0].childNodes[0]

        const center = cardBody.childNodes[0]
        const containerFluid = center.childNodes[0]
        const row = containerFluid.childNodes[0]
        const mainInfo = row.childNodes[0].childNodes.filter(it => it.rawText.trim() !== '')[0].childNodes[0].rawText.trim()
        const subtitle = row.childNodes.filter(it => it.childNodes.length != 0)[1].childNodes[0]
        const spinSinceValue = subtitle.childNodes[0].rawText
        console.log(`${mainInfo} - ${spinSinceValue} Spins Since`)
    })
}