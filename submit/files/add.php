<?php
include_once 'crud.php';
$crud = new Crud();
    
    $name = $_POST['pname'];
    $address = $_POST['paddress'];
    $lat = $_POST['plat'];
    $lon = $_POST['plon'];
    $url= $_POST['purl'];
    

$addQuery = "INSERT INTO tree_map(name,address,lat,lon,url) VALUES ('{$name}','{$address}','{$lat}','{$lon}','{$url}')";
            if ($crud->execute($addQuery)){
                echo "success";
            }else{
                echo "error";
            }

            ?>