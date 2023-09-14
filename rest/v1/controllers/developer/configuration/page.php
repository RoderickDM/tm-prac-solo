<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/configuration/Configuration.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$configuration = new Configuration($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("start", $_GET)) {
    // check data
    checkPayload($data);
    $configuration->configuration_start = $_GET['start'];
    $configuration->configuration_total = 4;
    checkLimitId($configuration->configuration_start, $configuration->configuration_total);
    
    $query = checkReadLimit($configuration);
    $total_result = checkReadAll($configuration);
    http_response_code(200);
    checkReadQuery(
        $query,
        $total_result,
        $configuration->configuration_total,
        $configuration->configuration_start,
    );
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
