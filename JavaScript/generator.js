const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require('fs');

var url = ("https://www.yeezysupply.com/")


puppeteer.use(StealthPlugin())
puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.goto(url)
  var cookies = await page.cookies();
  await browser.close()
  var arrayLength = cookies.length;
  for (var i = 0; i < arrayLength; i++) {
    if (cookies[i].name == "_abck") {
      console.log('Generated Akamai _abck Cookies ! ');
      fs.writeFile('cookies.txt', "\n" + cookies[i].value, { flag: 'a+' }, err => {
        if (err) {
          console.error(err)
          return
        }
      })
    }
}
})