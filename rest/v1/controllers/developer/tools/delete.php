<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$tools = new Tools($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("toolsId", $_GET)) {
    // get data
    $tools->tools_aid = $_GET['toolsId'];
    checkId($tools->tools_aid);

    $query = checkDelete($tools);
    returnSuccess($tools, "Tools", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
