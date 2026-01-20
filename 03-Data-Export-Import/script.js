const importFileCsv = document.getElementById("fileCsv-element");
const exportFileCsv = document.getElementById("btnExport");
// import file csv
importFileCsv.addEventListener("change", (e)=> {
    const reader = new FileReader();
    reader.onload = ()=> {
        const lines = reader.result.split("\n"); 
        const tableBody = document.getElementById("tablebody");
        // clear data old 
        tableBody.innerHTML = "";
        lines.forEach((line, index)=> {
            if(index > 0 && line.trim() !== ""){
                const columns = line.split(",");
                const rows = `            
                            <tr>
                                <td>${columns[0]}</td>
                                <td>${columns[1]}</td>
                                <td>${columns[2]}</td>
                                <td>${columns[3]}</td>
                            </tr>`
                tableBody.innerHTML += rows;
            }
        });
    };
    if(e.target.files && e.target.files[0]){
        reader.readAsText(e.target.files[0]);
    }
    else{
        console.log("មិនមានឯកសារត្រូវបានជ្រើសរើសទេ!");
    }
});
// export file csv
const exportFile = (file)=> {
    const csv = [];
    const rows = document.querySelectorAll("table tr");
    for(const row of rows){
        const columns = row.querySelectorAll("td, th");
        const rowData = [];
        for(const column of columns){
            rowData.push(column.innerText);
        }
        csv.push(rowData.join(","));
    }

    const blob = new Blob(["\ufeff" + csv.join("\n")], {type: "text/csv; charset=utf-8;"});
    const dowload = document.createElement("a");
    dowload.download = file;
    dowload.href = window.URL.createObjectURL(blob);
    document.body.appendChild(dowload);
    dowload.click();
};
exportFileCsv.addEventListener("click", ()=> {
    exportFile('data.csv');
});