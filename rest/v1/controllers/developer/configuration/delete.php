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
    // get data
    $department->department_aid = $_GET['departmentId'];
    checkId($department->department_aid);

    $query = checkDelete($department);
    returnSuccess($department, "Department", $query);
}

// return 404 error if endpoint not available
checkEndpoint();
