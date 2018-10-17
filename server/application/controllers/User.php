<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends MY_Controller {


    public function index($user_id = null)
    {
        // We load the CI welcome page with some lines of Javascript
        $this->load->view('welcome_message1', array('user_id' => $user_id));
    }
}
