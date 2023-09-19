<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$tools = new Tools($conn);
// get $_GET data 

if (array_key_exists("toolsId", $_GET) ) {
    $tools->tools_aid = $_GET['toolsId'];
    checkId($tools->tools_aid);
    $query = checkReadById($tools);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($tools);
    http_response_code(200);
    getQueriedData($query);
     
}

// return 404 error if endpoint not available
checkEndpoint();
