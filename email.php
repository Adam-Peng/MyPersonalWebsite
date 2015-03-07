<?php
/**
 * Created by PhpStorm.
 * User: Vivian
 * Date: 2015-03-05
 * Time: 1:58 AM
 */

if($_POST) {
    $name = $_POST['name'];

    $email = $_POST['email'];


    $company = $_POST['company'];
    $phone = $_POST['phone'];
    $msg = $_POST['msg'];

    $subject = "Name: $name, Company: $company, Phone: $phone";
    $from = $email; //Site name
    // Change this to your email address you want to form sent to
    $to = "admin@pengboadam.com";


    $message = $_POST['msg'];
    mail($to,$subject,$msg,$from);

    echo "success";
}else{
    echo 'fail!';
}

