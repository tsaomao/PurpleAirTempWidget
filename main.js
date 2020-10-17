// Get current temperature in F from nearest PurpleAir Sensor
// PurpleAir Sensor nearest to my house selected manually.
// Initialize
let url = "https://www.purpleair.com/json?key=157SMCFWIZ0DCUQ8&show=40695"
let r = new Request(url)
let wg = new ListWidget()
let json = null

// try/catch load json from URL
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

// main routine
runaswidget(prettyPrint(json, wg), wg)

// Debug to Scriptable
QuickLook.present(prettyPrint(json, wg))

// Get text value for temperature in adjusted F
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

// Main routine. Use widget to create Widget output
// Output to widget
function runaswidget(str, wg) {

  try {
    wg.backgroundColor = Color.blue()
    
    let header = wg.addText("PurpleAir")
    header.textSize = 18
    header.textColor = Color.white()
    
    let tempfstr = str.concat(" F")
    
    let tempf = wg.addText(tempfstr)
    tempf.textSize = 15
    tempf.textColor = Color.white()

  } catch (e) {
    console.log(e)
    let err = wg.addText(`widget error: ${e}`)
    err.textSize = 10
    err.textColor = Color.red()
    err.textOpacity = 30
  }

//   Script.setWidget(wg);
//   Script.complete();
}
