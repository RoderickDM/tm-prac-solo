<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$configuration = new Configuration($conn);
// get $_GET data 

if (array_key_exists("configurationId", $_GET) ) {
    $configuration->configuration_aid = $_GET['configurationId'];
    checkId($configuration->configuration_aid);
    $query = checkReadById($configuration);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($configuration);
    http_response_code(200);
    getQueriedData($query);
     
}

// return 404 error if endpoint not available
checkEndpoint();
