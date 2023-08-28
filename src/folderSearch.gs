
function getFolderToUpload(){
    var relation = invoice_upload_sheet.getRange(relation_cell).getValue();
    if (relation == "Cliente"){
        var folderToUpload = searchFolderId("Cobranzas")
    } else {
        var driveFolderName = invoice_upload_sheet.getRange(drive_folder_cell).getValue();
        var folderToUpload = searchFolderId("Pagos", driveFolderName)
    }
    return folderToUpload;
}

function searchFolderId(transactionType, paymentType){
    var rootFolder = DriveApp.getFolderById(rootDriveFolderId)


    var currentDate = getCurrentDate();

    var monthFolder = findFolderInParentFolder(rootFolder, currentDate);
    var transactionTypeFolder = findFolderInParentFolder(monthFolder, transactionType);

    if (!paymentType){
        return transactionTypeFolder;
    }

    var paymentTypeFolder = findFolderInParentFolder(transactionTypeFolder, paymentType);

    if (!paymentTypeFolder){
        return transactionTypeFolder;
    }

    return paymentTypeFolder;
}

function findFolderInParentFolder(parentFolder, searchedFolderName){
    var folders = parentFolder.getFolders();

    console.log("Searching for: " + searchedFolderName + " in: " + parentFolder.getName())

    while (folders.hasNext()) {
        var folder = folders.next();
        if (folder.getName() == searchedFolderName){
            var foundFolder = folder;
            console.log("Folder found!")
            return foundFolder;
        }
    }
    console.log("Folder not found!")
}

function getCurrentDate(){
    var currentMonth = getCurrentMonth();
    var currentYear = getCurrentYear();
    var currentDate = currentMonth + " " + currentYear;

    return currentDate;
}
function getCurrentMonth(){
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    let currentDate = new Date();
    let currentMonthNumber = currentDate.getMonth();

    let currentMonth = monthNames[currentMonthNumber];

    console.log("Current Month: " + currentMonth)

    return currentMonth;

}

function getCurrentYear(){
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();

    console.log("Current Year: " + currentYear)

    return currentYear;
}
