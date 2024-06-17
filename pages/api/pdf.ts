import { NextApiHandler } from 'next'
import puppeteer from 'puppeteer'
// import { logger } from '../../../logger'

const handler: NextApiHandler = async (req, res) => {
  const { html } = req.body

  try {
    const browser = await puppeteer.launch({
      pipe: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--single-process',
      ],
      headless: 'shell'
    })
    const page = await browser.newPage()
    console.log(html)
    await page.setContent(html, {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
    })
    await page.emulateMediaType('print')
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      preferCSSPageSize: true,
      landscape: true,
      headerTemplate:
        '<div style="font-size: 10px; text-align: center; width: 100%; padding-top: 10px;">Header - Page <span class="pageNumber"></span></div>',
      footerTemplate:
        '<div style="font-size: 10px; text-align: center; width: 100%; padding-bottom: 10px;">Footer - Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    })
    await browser.close()
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"')

    res.end(pdfBuffer)
  } catch (ex) {
    console.log(ex)
    // logger.error(ex)
  }
}

export default handler
