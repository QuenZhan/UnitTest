<?php
require_once('FirePHPCore/FirePHP.class.php');
ob_start();
$firephp = FirePHP::getInstance(true);



$name="none";
$post="none";
if(array_key_exists("photoFile",$_FILES)){
	$file=$_FILES["photoFile"];
	$firephp->log("bah");
	$name=$file["name"];
}
if(array_key_exists("mask",$_POST))$post=$_POST["mask"][0];
// if($_FILES["photoFile"] != null)$name=$_FILES["photoFile"]["name"];
// if($_POST["mask"]!=null)$post=$_POST["mask"][0];
echo '{"file":"'.$name.'","post":"'.$post.'"}';

 

// $firephp->log($post);