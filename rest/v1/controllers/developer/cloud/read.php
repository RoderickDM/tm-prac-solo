<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$cloud = new Cloud($conn);
// get $_GET data 

if (array_key_exists("cloudId", $_GET) ) {
    $cloud->cloud_aid = $_GET['cloudId'];
    checkId($cloud->cloud_aid);
    $query = checkReadById($cloud);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($cloud);
    http_response_code(200);
    getQueriedData($query);
     
}

// return 404 error if endpoint not available
checkEndpoint();
