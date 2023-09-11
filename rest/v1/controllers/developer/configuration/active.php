<?php
// set http header
require '../../../../core/header.php';
// use needed functions
require '../../../../core/functions.php';
// use needed classes
require '../../../../models/developer/settings/department/Department.php';
// check database connection
$conn = null;
$conn = checkDbConnection();
// make instance of classes
$department = new Department($conn);
// // get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);
// get $_GET data
// validate api key 
if (array_key_exists("departmentId", $_GET)) {
    // check data
    checkPayload($data);
    $department->department_aid = $_GET['departmentId'];
    $department->department_is_active = trim($data["isActive"]);
    // $department->department_datetime = date("Y-m-d H:i:s");
    checkId($department->department_aid);
    $query = checkActive($department);
    http_response_code(200);
    returnSuccess($department, "Department", $query);
}
// return 404 error if endpoint not available
checkEndpoint();

http_response_code(200);
