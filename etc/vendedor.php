<?php
    $data = $_POST["data"];
    $file = fopen("data.vendedor.json", "a+");
    fwrite($file, $data);
    fclose($file);
?>