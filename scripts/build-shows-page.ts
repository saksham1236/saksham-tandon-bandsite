const shows = [{"show_date":"8/23/2022","city":"Guilmaro","venue":"Madison Square Garden","country":"BJ"},
{"show_date":"1/13/2022","city":"Pahing Pamulihan","venue":"Staples Center","country":"ID"},
{"show_date":"4/16/2022","city":"Zhumadian","venue":"Staples Center","country":"CN"},
{"show_date":"10/22/2022","city":"Pashiya","venue":"O2 Arena","country":"RU"},
{"show_date":"10/6/2022","city":"L’vovskiy","venue":"Madison Square Garden","country":"RU"},
{"show_date":"7/3/2022","city":"Doropeti","venue":"Madison Square Garden","country":"ID"},
{"show_date":"10/29/2022","city":"To’rtko’l Shahri","venue":"Staples Center","country":"UZ"},
{"show_date":"6/30/2022","city":"Lākshām","venue":"O2 Arena","country":"BD"},
{"show_date":"7/1/2022","city":"Vila Verde","venue":"Staples Center","country":"PT"},
{"show_date":"1/18/2022","city":"La Guama","venue":"Staples Center","country":"HN"}];
let showDates = [];

const apiKey = 'b3e54ac2-9fdd-4d52-9d94-9ee20d522a69';
const apiUrl = 'https://project-1-api.herokuapp.com/';
const apiRoute = 'showdates'
const config = {
    headers:{
        "Content-Type": "application/json"
    }
}

function getShows{
    axios.get(`${apiUrl}${apiRoute}/?api_key=${apiKey}`)
    .then((response:object) =>{
        console.log(response.data);
        showDates = [...response.data];
        showDates.sort((a, b) => a.timestamp - b.timestamp);
    })
    .catch((error:object) => {
        console.log(error);
    });
}

getShows();

function loadShowTable() {
    const tableSection = document.getElementById('tableMain');
    for (let i = 0; i < showDates.length; ++i) {
        const tableTemplate = document.getElementById('tableTemplate');
        const clone = tableTemplate.cloneNode(true);
        const newtable = document.createElement('div');
        newtable.innerHTML = clone.innerHTML;
        const tableVenue = newtable.getElementsByClassName('table__venue');
        tableVenue[0].innerText = showDates[i].place;
        const formatedDate = new Intl.DateTimeFormat("en-US").format(showDates[i].date);
        const tableDate = newtable.getElementsByClassName('table__date');
        tableDate[0].innerText = formatedDate;
        const tableLocation = newtable.getElementsByClassName('table__location');
        tableLocation[0].innerText = `${showDates[i].location}`;
        tableSection.appendChild(newtable);
    }
}
window.addEventListener('load', (event) => {
    loadShowTable();
});