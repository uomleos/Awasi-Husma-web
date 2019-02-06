<?php
include_once 'crud.php';
$crud = new Crud();
$id = $_POST['id'];

$deleteQuery = "DELETE FROM tree_map WHERE tree_map.id='". $id."'";
            if ($crud->execute($deleteQuery)){
                echo "sucess";
            }else{
                echo "error";
            }

            ?>