<?php
   	
   $myFile = "data.vendedor.json";
   $arr_data = array(); // create empty array

  try
  {
	   //Get form data
	   $formdata = array(
	      'vendedor.codigo'=> $_POST['vendedor.codigo'],
	      'vendedor.cpf'=> $_POST['vendedor.cpf'],
	      'vendedor.rg'=>$_POST['vendedor.rg'],
	      'vendedor.nome'=>$_POST['vendedor.nome'],
	      'vendedor.endereco.logradouro'=>$_POST['vendedor.endereco.logradouro'],
	      'vendedor.endereco.numero'=>$_POST['vendedor.endereco.numero'],
	      'vendedor.endereco.bairro'=> $_POST['vendedor.endereco.bairro'],
	      'vendedor.endereco.cep'=> $_POST['vendedor.endereco.cep'],
	      'vendedor.telefone'=> $_POST['vendedor.telefone']
	    );

	   //Get data from existing json file
	   $jsondata = file_get_contents($myFile);

	   // converts json data into array
	   $arr_data = json_decode($jsondata, true);

	   // Push user data to array
	   array_push($arr_data, $formdata);

       //Convert updated array to JSON
	   $jsondata = json_encode($arr_data, JSON_PRETTY_PRINT);
	   
	   //write json data into data.json file
	   if(file_put_contents($myFile, $jsondata)) {
	        echo 'Data successfully saved';
	    }
	   else 
	        echo "error";

   }
   catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
   }

?>
