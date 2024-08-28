/* Global Variables */
const apiKey = "fb3cbc66bc6271825f300d2af415528a&units=metric"
const generateBtn = document.querySelector('#generate')
const zipInput = document.querySelector('#zip')
const feelingsInput = document.querySelector("#feelings")

// Create a new date instance dynamically with JS
const getNow = () => {
    const d = new Date();
    const newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate
}

generateBtn.addEventListener('click', async () => {
    if (zipInput && zipInput.value && feelingsInput) {
        zipInput.classList.remove('error')
        let temp = await getWeatherHandler(zipInput.value)
        if (!temp) {
            console.log('your zip is not valid, we use Australia default one instead')
            zipInput.classList.add('error')
            temp = await getWeatherHandler(2000)
        }
        const preparedData = { temp, date: getNow(), content: feelingsInput.value || "No feelings" }
        console.log(preparedData)
        await postData(preparedData);
        retrieveData();
    } else {
        zipInput.classList.add('error')
    }
})

const getWeatherHandler = async (zip) => {
    try {
        zipInput.classList.remove('error')
        let data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},au&appid=${apiKey}`)
            .then(res => res.json());
        return data.list[0].main.temp;
    } catch (error) {
        zipInput.classList.add('error')
    }
}

const postData = async (data) => {
    const request = await fetch('/projectdata', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        // Transform into JSON
        const savedData = await request.json()
        if (request.status == 422) {
            console.log(savedData.message)
        }
        console.log(savedData)
    }
    catch (error) {
        console.log("error", error);

        // appropriately handle the error
    }
}

const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        const { temp, content, date } = allData
        console.log(allData)
        // Write updated data to DOM elements
        if (temp, content, date) {
            document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
            document.getElementById('content').innerHTML = allData.content;
            document.getElementById("date").innerHTML = allData.date;
        } else {
            document.getElementById('temp').innerHTML = 'No recent data yet'
        }
    }
    catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

retrieveData()//call it to see your previous record if present