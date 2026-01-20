const fileCSV = document.getElementById("fileCsv-element");
// import data
fileCSV.addEventListener("change", (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        const lines = reader.result.split("\n");
        const tableBody = document.getElementById("tablebody");
        tableBody.innerHTML = "";
        lines.forEach((line, index) => {
            if (index > 0 && line.trim() !== "") {
                const columns = line.split(",");
                const rows = `  <tr>
                                    <td>${columns[0]}</td>
                                    <td>${columns[1]}</td>
                                    <td>${columns[2]}</td>
                                </tr>`;
                tableBody.innerHTML += rows;
            }
        });
    };

    if (e.target.files && e.target.files[0]) {
        reader.readAsText(e.target.files[0]);
    } else {
         	
    }
});
// export data
const exportData = (fileName) => {
    const csv = [];
    const rows = document.querySelectorAll("table tr");

    for (const row of rows) {
        const cols = row.querySelectorAll("td, th");
        const rowData = [];
        for (const col of cols) {
        rowData.push(col.innerText);
        }
        csv.push(rowData.join(","));
    }
    // create file csv line 42 (new blob used to create file)
    const blob = new Blob(["\ufeff" + csv.join("\n")], {type: "text/csv;charset=utf-8;"});
    // create download file
    const downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.style.display = "none";
    window.onload
    document.body.appendChild(downloadLink);
    downloadLink.click();
};

document.getElementById('btnExport').addEventListener('click', () => {
    exportData('data.csv');
});