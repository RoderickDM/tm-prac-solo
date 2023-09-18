<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$installation = new Installation($conn);
// get $_GET data 

if (array_key_exists("installationId", $_GET) ) {
    $installation->installation_aid = $_GET['installationId'];
    checkId($installation->installation_aid);
    $query = checkReadById($installation);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($installation);
    http_response_code(200);
    getQueriedData($query);
     
}

// return 404 error if endpoint not available
checkEndpoint();
