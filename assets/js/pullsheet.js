// Reset the cookie manually
//Cookies.expire('token');

// URL: https://ggtkx.org/pull-sheet/?key=your_key&worksheet=worksheet_name&token=your_personal_access_token&org=your_org&repo=your_repo&branch=your_branch

const multilined_properties = ["contact", "highlights"];
const required_properties = ["title", "image", "weight"];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const key = urlParams.get('key');
const resource = urlParams.get('worksheet');
const org = urlParams.get('org');
const repo_name = urlParams.get('repo');
const branch = urlParams.get('branch');
const dry_run = urlParams.has('dry_run');

let oAuthToken = urlParams.get('token');
if (oAuthToken != '') {
    Cookies.set('token', oAuthToken);
}
// Grab the token from cookie
oAuthToken = Cookies.get('token');

document.addEventListener("DOMContentLoaded", () => {
    const people = [];
    fetch(`https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:json`)
        .then(res => res.text())
        .then(processData);
});

function processData(text) {
    // Truncate the function-call wrapper.
    const sheetJsonStr = text.slice(47, -2);
    // Parse the string into a JSON object.
    const sheetJson = JSON.parse(sheetJsonStr);
    console.log("Google Sheets returned this JSON:", sheetJson);
    // Column names.
    const cols = sheetJson.table.cols.map(col => col.label).filter(label => label.length > 0);
    console.log("The following columns exist:", cols);

    const people = [];
    sheetJson.table.rows.forEach(row => {
        const person = {};

        // Construct the person object from the spreadsheet cells.
        row.c.forEach((cell, index) => {
            if (cell == null) {
                return;
            }
            const value = cell.v;
            if (value == null) {
                return;
            }
            const key = cols[index];
            person[key] = value;
        });

        // Skip people without required fields.
        const missing_properties = required_properties.filter(property => !(property in person));
        if (missing_properties.length > 0) {
            console.log(person["title"], "is missing these required properties:", missing_properties, '. Skipped.');
            return;
        }

        // Split multilined properties into lists of strings.
        multilined_properties.forEach(property => {
            if (property in person) {
                person[property] = person[property].split('\n');
            }
        })

        people.push(person);
    });

    // Sort people by decreasing order in weight.
    people.sort((a, b) => b.weight - a.weight);

    const json = JSON.stringify(people, null, 4);
    document.getElementById('source').value = json;
    if (dry_run) {
        console.log('Dry run. Will not commit.');
        return;
    }
    publish(json);
}

function publish(json) {
    // Grab the token from cookie
    const oAuthToken = Cookies.get('token');
    const github = new Github({ token: oAuthToken, auth: "oauth" });
    const repo = github.getRepo(org, repo_name);
    const writepath = '_data/' + resource + '.json';
    const current_time = Date.now();
    const message = 'Update comedian info based on Google sheets at ' + current_time;
    repo.getTree(branch + '?recursive=true', (err, tree) => {
        tree.forEach(treeValue => {
            if (treeValue['path'] == writepath) {
                repo.writemanual(branch, writepath, json, message, treeValue['sha'], err => {});
            }
        });
    });
}
