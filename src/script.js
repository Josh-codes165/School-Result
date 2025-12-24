import * as XLSX from "xlsx";
export function handleResult(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);

    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log("RAW DATA:", raw);

    const SubjectRow = raw[0];
    const SubjectTypeRow = raw[1];
    const StudentRows = raw.slice(2);

    let subjectsMap = {};
    let currentSubject = "";

    SubjectRow.forEach((cell, index) => {
      if (cell) {
        currentSubject = cell.trim();
        subjectsMap[currentSubject] = {};
      }

      const type = SubjectTypeRow[index];
      if (type && currentSubject) {
        subjectsMap[currentSubject][type.trim()] = index;
      }
    });

    console.log("SUBJECT MAP:", subjectsMap);

    const student = StudentRows[0];
    let studentResults = {};

    for (let subject in subjectsMap) {
      studentResults[subject] = {};
      for (let type in subjectsMap[subject]) {
        const colIndex = subjectsMap[subject][type];
        studentResults[subject][type] = student[colIndex];
      }
    }

    console.log("STUDENT RESULT:", studentResults);
  };

  reader.readAsArrayBuffer(file);
}
