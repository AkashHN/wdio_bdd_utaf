const xlsx = require("xlsx");

function writeDataToExcel(data, filePath, sheetName) {
  let wb;
  let ws;

  try {
    // Try to read the existing workbook
    wb = xlsx.readFile(filePath);

    // Check if the sheet already exists, if so, get it
    if (wb.Sheets[sheetName]) {
      ws = wb.Sheets[sheetName];
    } else {
      ws = xlsx.utils.json_to_sheet([]);
      xlsx.utils.book_append_sheet(wb, ws, sheetName);
    }
  } catch (error) {
    // If the workbook or sheet doesn't exist, create a new workbook and sheet
    wb = xlsx.utils.book_new();
    ws = xlsx.utils.json_to_sheet([]);
    xlsx.utils.book_append_sheet(wb, ws, sheetName);
  }
  const dataArray = Array.isArray(data) ? data : [data];
  const flattenedData = dataArray.map(flattenObject);
  // Append the new data to the existing sheet
  const existingData = xlsx.utils.sheet_to_json(ws);
  const newData = existingData.concat(flattenedData);
  ws = xlsx.utils.json_to_sheet(newData);
  wb.Sheets[sheetName] = ws; // Update the worksheet in the workbook

  // Write the workbook to the specified file path
  xlsx.writeFile(wb, filePath);
}
// Helper function to flatten nested objects
function flattenObject(obj, parent = "", res = {}) {
  for (let key in obj) {
    const propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

module.exports = {
  writeDataToExcel,
  flattenObject,
};
