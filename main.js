// Depending on a user selection, performs one of two actions:
// 1. Pretty prints a JSON string
// 2. Presents a UI to browse a JSON object or arary
// The script is meant to be triggered from a share sheet
// with a URL, file URL or a plain text as input.
let url = "https://www.purpleair.com/json?key=157SMCFWIZ0DCUQ8&show=40695"
// let fileURL = args.fileURLs[0]
// let text = args.plainTexts[0]
let r = new Request(url)

let wg = new ListWidget()

let json = null

try {
  json = await r.loadJSON()
} catch (e) {
    console.log(e)
    let err = wg.addText(`url error: ${e}`)
    err.textSize = 10
    err.textColor = Color.red()
    err.textOpacity = 30
    json = null
}

runaswidget(prettyPrint(json, wg), wg)

QuickLook.present(prettyPrint(json, wg))

function prettyPrint(json, wg) {
  let ret = "0"
  
  try {
  let str = JSON.stringify(json, null, 2)
  let jsonobj = JSON.parse(str)
//   PurpleAir says reading is on average 8 degrees F higher than actual
  let tempf = jsonobj["results"][0]["temp_f"]
  let retint = parseInt(tempf)
  let ret = (retint - 8).toString()
  return ret
} catch (e) {
    console.log(e)
    let err = wg.addText(`json error: ${e}`)
    err.textSize = 10
    err.textColor = Color.red()
    err.textOpacity = 30
    let ret = "0"
    return ret
  }
}

function runaswidget(str, wg) {

  try {
    let header = wg.addText("PurpleAir")
    header.textSize = 15
    header.textColor = Color.gray()
    
    let tempfstr = str.concat(" F")
    
    let tempf = wg.addText(tempfstr)
    tempf.textColor = Color.gray()

  } catch (e) {
    console.log(e)
    let err = wg.addText(`widget error: ${e}`)
    err.textSize = 10
    err.textColor = Color.red()
    err.textOpacity = 30
  }

  Script.setWidget(wg);
  Script.complete();
}