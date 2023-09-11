<?php
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// get $_GET data
$error = [];
$returnData = [];
if (array_key_exists("departmentId", $_GET)) {
    // check data
    checkPayload($data);
    // get data
    $department->department_aid = $_GET['departmentId'];
    $department->department_name = checkIndex($data, "department_name");
    $department->department_datetime = date("Y-m-d H:i:s");
    checkId($department->department_aid);
    // update
    $query = checkUpdate($department);
    returnSuccess($department, "Department", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
