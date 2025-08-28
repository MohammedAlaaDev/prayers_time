const select = document.getElementById("select");
const cities = [
    {
        arabic: "مكة المكرمة",
        english: "Mecca",
    },
    {
        arabic: "المدينة المنورة",
        english: "Madinah",
    },
    {
        arabic: "الرياض",
        english: "Riyadh",
    },
    {
        arabic: "القاهرة",
        english: "Cairo",
    },
];

cities.forEach((obj) => {
    select.innerHTML += `
    <option>${obj.arabic}</option>
    `
})

select.addEventListener("change", (e) => {
    for (let city of cities) {
        if (city.arabic === e.target.value) {
            getDataFromAPI(city.english);
            fillContent("heading-name", city.arabic)
        }
    }
})

function fillContent(id, content) {
    document.getElementById(id).innerHTML = content;
}

function getDataFromAPI(city) {

    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: {
            city: city,
            country: "SA",
            method: 4,
        }
    })
        .then((response) => {
            const times = response.data.data.timings
            const date = response.data.data.date.readable
            const day = response.data.data.date.hijri.weekday.ar


            fillContent("fajr", times.Fajr)
            fillContent("shorouk", times.Sunrise)
            fillContent("dhuhr", times.Dhuhr)
            fillContent("asr", times.Asr)
            fillContent("maghrib", times.Maghrib)
            fillContent("ishaa", times.Isha)
            fillContent("date", date)
            fillContent("day", day)

        })
        .catch((error) => {
            console.log(error);
        })
}

getDataFromAPI("Mecca");