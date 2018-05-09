const jsonInput = require(`./${process.argv[2]}`);
const fs = require('fs');

// get table name
const getTableName = (file) => {
  return Object.keys(file)[0];
}

// get column names
const getColumnNames = (file) => {
  return Object.keys(file[getTableName(file)][0]);
}




// converter function
const converter = (file) => {
  // define output destination and filename
  let outputFile = fs.createWriteStream('countries4.sql');
  outputFile.on('error', (err) => { console.log('error writing file'); });

  let tableName = getTableName(file);
  let [col1, col2] = getColumnNames(file);

  let arr = file[tableName];

  // loop through arrary of objects
  arr.forEach(item => {
    let col1Val = item[col1];
    let col2Val = item[col2];
    let queryString = `INSERT INTO ${tableName}\n(${col1}, ${col2})\nVALUES \n('${col1Val}' '${col2Val}');\n\n`;
    // process.stdout.write(queryString);
    outputFile.write(queryString);
  });
}

// converter(jsonInput);


//converter function dynamic
const converter2 = (file) => {
  let jsonFile = process.argv[2];
  let dbTableName = process.argv[3];
  let outputFileName = process.argv[4];

  let outputFile = fs.createWriteStream(`${outputFileName}`);
  outputFile.on('error', (err) => { console.log('error writing file'); });

  let jsonKey = getTableName(file);
  let tableName = process.argv[3];
  let [col1, col2] = getColumnNames(file);

  let arr = file[jsonKey];
  arr.forEach(item => {
    let col1Val = item[col1];
    let col2Val = item[col2];
    let queryString = `INSERT INTO ${tableName}\n(${col1}, ${col2})\nVALUES \n('${col1Val}','${col2Val}');\n\n`;
    outputFile.write(queryString);
  });
}

converter2(jsonInput);
