<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// get $_GET data 

if (array_key_exists("departmentId", $_GET) ) {
    $department->department_aid = $_GET['departmentId'];
    checkId($department->department_aid);
    $query = checkReadById($department);
    http_response_code(200);
    getQueriedData($query);
}

if (empty($_GET)) {
    $query = checkReadAll($department);
    http_response_code(200);
    getQueriedData($query);
     
}

// return 404 error if endpoint not available
checkEndpoint();
