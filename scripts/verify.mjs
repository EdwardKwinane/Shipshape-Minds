import puppeteer from 'puppeteer-core'

const edgePath =
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const checks = [
  ['/', 'Empowering Young Minds'],
  ['/about', 'Creating Safe Spaces'],
  ['/programs', 'Mental Health & Emotional Support'],
  ['/get-involved', 'Make an Impact'],
  ['/donate', 'Where Your Money Goes'],
  ['/contact', 'Get in Touch'],
]

const browser = await puppeteer.launch({
  executablePath: edgePath,
  headless: true,
  args: ['--no-first-run', '--disable-gpu'],
})

let failures = 0
for (const [route, marker] of checks) {
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (err) => errors.push(err.message))
  const response = await page.goto(`http://localhost:4173${route}`, {
    waitUntil: 'networkidle0',
  })
  const body = await page.evaluate('document.body.innerText')
  const found = body.includes(marker)

  if (response?.status() !== 200) {
    console.log(`FAIL ${route} -> status ${response?.status()}`)
    failures++
  } else if (!found) {
    console.log(`FAIL ${route} -> marker "${marker}" not rendered`)
    failures++
  } else if (errors.length) {
    console.log(`CONSOLE-ERROR ${route} -> ${errors.join(' | ')}`)
    failures++
  } else {
    console.log(`OK   ${route}`)
  }

  const title = await page.title()
  console.log(`     title: ${title}`)
  await page.close()
}

await browser.close()
console.log(failures === 0 ? 'ALL ROUTES PASSED' : `${failures} ROUTE(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)