//getting the json from the database 
// creating the constant visualization
let url = "http://68.183.121.203:8080/data";

let micVals = [],
    waterVals = [],
    micVal, waterVal;

let data = document.getElementById("data");
let allData = document.getElementById("allData");
let ValSel = document.getElementById("ValSel");
let micValDiv = document.getElementById("micValDiv");
let waterValDiv = document.getElementById("waterValDiv");
// let idData = document.getElementById("idData");
let dateData = document.getElementById("dateData");
// let idUser = document.getElementById("idUser");
let sizeDiv = document.getElementById("size");
// let transactionID = document.getElementById("transactionID");

let dateUser = document.getElementById("dateUser");
let beginDate = document.getElementById("beginDate");
let beginTime = document.getElementById("beginTime");
let endDate = document.getElementById("endDate");
let endTime = document.getElementById("endTime");
let reset = document.getElementById("reset");
let sizeVal = document.getElementById("sizeVal");

data.addEventListener("click", selectData);
00



// function getData(){
//       //show collections of the saved images 
//   fetch("/", {
//     method: "GET"
//   }).then(res => res.json())
//   .then(response => {
  
//     console.log("response")
// });


// }
reset.addEventListener("click", function () {
    // reset everything 
    created_at = [];
    micVals = [];
    waterVals = [];
    dateUser.style.display = "none";
    // reset everything
    // dateURL="";
    sizeInput.style.display = "none";
    // transactionID.style.display = "none";
    // ValSel.style.display = "block";

})


//getting the date 
//http://68.183.121.203:8080/data/date?from=2020-12-01 13:20:00&to=2020-12-01 15:20:00


beginDate.addEventListener("change", getBeginDate);
beginTime.addEventListener("change", getBeginTime);
endDate.addEventListener("change", getEndDate);
endTime.addEventListener("change", getEndTime);

// idUser.addEventListener("input", function () {
//     // idUser.value="";
//     idUser.min = "1";
//     idUser.max = "200";
//     console.log("iduser value",idUser.value);
//     getIdUserInput(idUser.value)

//     //will be changed according to the size of the data 
// })

// function getIdUserInput(val){
//     let idURL=`https://proxy-server-yt.herokuapp.com/http://68.183.121.203:8080/data/id/${idUser.value}}`;
//     loadJSON(idURL,gotData);
//     console.log("idURL",idURL);

// }

function selectData() {
    console.log("dataclicked")

    // if (allData.selected) {
    //     console.log("alldataselected");
    //     if (ValSel.style.display = "none") {
    //         ValSel.style.display = "block";
    //         dateUser.style.display = "none";
    //         sizeInput.style.display = "none";
    //         // transactionID.style.display = "none";
    //     } else {
    //         ValSel.style.display = "none";
    //     }

    // }
    if (sizeDiv.selected) {
        console.log("sizediv selected")
        console.log("sizeDiv selected")
        if (sizeInput.style.display = "none") {
            sizeInput.style.display = "block";
            dateUser.style.display = "none";
            // transactionID.style.display = "none";
            // ValSel.style.display = "none";

        } else {
            sizeInput.style.display = "none";
        }
    }

    // if (idData.selected) {
    //     console.log("idData selected")
    //     // if (transactionID.style.display = "none") {
    //         // transactionID.style.display = "block";
    //         dateUser.style.display = "none";
    //         sizeInput.style.display = "none";
    //         ValSel.style.display = "none";


    //     } else {
    //         // transactionID.style.display = "none";
    //     }
    if (dateData.selected) {
        console.log("dateData selected");
        getDateVal();
        if (dateUser.style.display = "none") {
            dateUser.style.display = "block";
            sizeInput.style.display = "none";
            // transactionID.style.display = "none";
            // ValSel.style.display = "none";
        } else {
            dateUser.style.display = "none";
        }

    }

}




//if date is selected, show the default data based on the time
// when time is changed, show the correponding change, can only refrain from dates from 12-01 to current date 
let dateURL = "";


function getDateVal() {
    // as long as it is in between the time between 12-01 13:40 to 12-05 23:00 
    dateURL = `https://proxy-server-yt.herokuapp.com/http://68.183.121.203:8080/data/date?from=${beginDate.value}%20${beginTime.value}&to=${endDate.value}%20${endTime.value}`;
    loadJSON(dateURL, gotData);
    console.log("dataurl", dateURL);
}

function getEndDate() {
    getDateVal();
    return endDate.value;

}

function getEndTime() {
    getDateVal();
    return endTime.value;

}

function getBeginDate() {
    getDateVal();
    // beginDateVal=beginDate.value;
    return beginDate.value;

}

function getBeginTime() {
    getDateVal();
    return beginTime.value;

}

//p5 sketch 
// making arrays for each weather data so you can access easily

let canvas = document.getElementById("myCanvas");
let sketch = document.getElementById("sketch");
let created_at = []; // the timezone is GMT
let size = 150;
let last_id = 0;
let sizeURL = `https://proxy-server-yt.herokuapp.com/http://68.183.121.203:8080/data/size/${size}`;

// load the json file
function setup() {
    canvas = createCanvas(10000, 800);
    canvas.parent(sketch);
    background(194,149,149);

}

// let micValURL = `https://proxy-server-yt.herokuapp.com/http://68.183.121.203:8080/data/micVal/size/${size}`;
// let waterValURL = `https://proxy-server-yt.herokuapp.com/http://68.183.121.203:8080/data/waterVal/size/${size}`;

function draw() {
    background('white');
    drawGraphs();
}
let latestData =document.getElementById("latestData");

sizeVal.addEventListener("change", function () {
    size = sizeVal.value;
    getSizeVal(size);
    latestData.innerHTML=`Latest ${size} Data Points`;
    latestData.style.color="#eb6969";
    console.log("size,", size);
})
// let popupSize = document.createElement("p");
// popupSize.id = "popupSize";

function getSizeVal(size) {
    // sizeInput.appendChild(popupSize);
    // popupSize.innerHTML=`Latest ${size} Data Points`;
    // document.getElementById("lastestData").innerHTML=`Latest ${size} Data Points`;

    // setBubble(size, popupSize);

    console.log(sizeVal.value, "sizeVal");
    sizeURL = `https://proxy-server-yt.herokuapp.com/http://68.183.121.203:8080/data/size/${size}`;
    loadJSON(sizeURL, gotData);
    console.log(sizeURL, "sizeurl");

}

function setBubble(inputRange, popupSize) {
    const val = inputRange.value;
    const min = inputRange.min ? inputRange.min : 0;
    const max = inputRange.max ? inputRange.max : 100;
    const newVal = Number(((val - min) * 100) / (max - min));
    // popupSize.innerHTML = `The last ${val} data points`;

    // Sorta magic numbers based on size of the native UI thumb
    // popupSize.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}

function gotData(data) {

    //reset the value for the array everytime you load the json urls 
    created_at = [];
    micVals = [];
    waterVals = [];

    for (i = last_id; i < data.length; i++) {
        created_at.push(data[i].created_at);
        micVals.push(data[i].micVal);
        waterVals.push(data[i].waterVal);
    }

}


// let range = document.getElementById("range");
let defaultRange=3;

function drawGraphs() {
    // defaultRange=range.value;

    textSize(30);
    textLeading(50);
    textFont('Georgia');
    fill('gray');
    // draw linear graphs for each data to see the trend
    // the mapping is done based on the average range of each weather data
    if (created_at[size - 1] || created_at[0] || created_at[created_at.length - 1]) {
        if (sizeDiv.selected) {
            text("Surrounding data from " + created_at[size - 1] + "(GMT) and " + created_at[0], 100, 100);

        } else {
            text("Surrounding data from " + created_at[0] + "(GMT) and " + created_at[created_at.length - 1], 100, 100);

        }
    } else {
        text("Surrounding data from _______ (GMT) and ______", 100, 100);

    }
    text("\nData collected with a DIY sensor system in Crown Heights, NY", 100, 100);

    noStroke();


    push();
    fill(color('#add8e6'));
    text("waterVal", 100, 0.45 * height, 100, 200);

    for (i = 0; i < created_at.length; i++) {
        let mapped = map(waterVals[i], 0, 20, 0.4 * height, 0.5 * height);
        ellipse(250 + i * defaultRange, mapped, 5, 5);
    }
    pop();
    
    push();
    fill(color('#c29595'));
    text("micVal", 100, 0.65 * height, 100, 200);

    for (i = 0; i < created_at.length; i++) {
        let mapped = map(micVals[i], 60, 80, 0.6 * height, 0.7 * height);
        ellipse(250 + i * defaultRange, mapped, 5, 5);
    }
   pop();

}