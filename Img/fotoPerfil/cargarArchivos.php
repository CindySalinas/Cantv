<?php 
 $ruta="Archivo/";
  
foreach ($_FILES as $key) {
    if($key['error'] == UPLOAD_ERR_OK ){
      $nombre = $key['name'];
      $temporal = $key['tmp_name']; 
      $tipo = $key['type'];
      $rot = $ruta.$nombre;
      echo  $rot;
    //  $tamano= ($key['size'] / 1000)."Kb"; 
      move_uploaded_file($temporal, $ruta . $nombre);  
    }else{ 
        throw new Exception("Error Processing Request", 1); 
    }  
  }
?>