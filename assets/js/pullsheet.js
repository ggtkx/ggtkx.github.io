// Reset the cookie manually
// Cookies.expire('token');

// URL: https://ggtkx.org/pull-sheet/?key=your_key&worksheet=worksheet_name&token=your_personal_access_token&org=your_org&repo=your_repo&branch=your_branch

const multilinedProperties = ['contact', 'highlights'];
const requiredProperties = ['title', 'image', 'weight'];
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const key = urlParams.get('key');
const resource = urlParams.get('worksheet');
const org = urlParams.get('org');
const repoName = urlParams.get('repo');
const branch = urlParams.get('branch');
const dryRun = urlParams.has('dry_run');

let oAuthToken = urlParams.get('token');
if (oAuthToken != '') {
  Cookies.set('token', oAuthToken);
}
// Grab the token from cookie
oAuthToken = Cookies.get('token');

document.addEventListener('DOMContentLoaded', () =>
  fetch(`https://docs.google.com/spreadsheets/d/${key}/gviz/tq?tqx=out:json`)
      .then((res) => res.text())
      .then(processData));

/**
 * processData processes the data returned from Google Sheets.
 * @param {string} text - The raw text returned by the Google Sheets.
 */
function processData(text) {
  // Truncate the function-call wrapper.
  const sheetJsonStr = text.slice(47, -2);
  // Parse the string into a JSON object.
  const sheetJson = JSON.parse(sheetJsonStr);
  console.log('Google Sheets returned this JSON:', sheetJson);
  // Column names.
  const cols = sheetJson.table.cols.map((col) => col.label)
      .filter((label) => label.length > 0);
  console.log('The following columns exist:', cols);

  const people = [];
  sheetJson.table.rows.forEach((row) => {
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
    const missingProperties = requiredProperties.filter(
        (property) => !(property in person));
    if (missingProperties.length > 0) {
      console.log(person['title'], 'is missing these required properties:',
          missingProperties, '. Skipped.');
      return;
    }

    // Split multilined properties into lists of strings.
    multilinedProperties.forEach((property) => {
      if (property in person) {
        person[property] = person[property].split('\n');
      }
    });

    people.push(person);
  });

  // Sort people by decreasing order in weight.
  people.sort((a, b) => b.weight - a.weight);

  const json = JSON.stringify(people, null, 4);
  document.getElementById('source').value = json;
  if (dryRun) {
    console.log('Dry run. Will not commit.');
    return;
  }
  publish(json);
}

/**
 * publish publishes the JSON object to the GitHub repo.
 * @param {string} json - The JSON string to publish.
 */
function publish(json) {
  // Grab the token from cookie
  const oAuthToken = Cookies.get('token');
  const github = new Github({token: oAuthToken, auth: 'oauth'});
  const repo = github.getRepo(org, repoName);
  const writepath = '_data/' + resource + '.json';
  const currentTime = Date.now();
  const message = 'Update comedian info based on Google sheets at ' +
  currentTime;
  repo.getTree(branch + '?recursive=true', (err, tree) => {
    tree.forEach((treeValue) => {
      if (treeValue['path'] == writepath) {
        repo.writemanual(branch, writepath, json, message, treeValue['sha'],
            (err) => {});
      }
    });
  });
}
