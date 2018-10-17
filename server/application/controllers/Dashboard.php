<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends MY_Controller {

    function __construct()
    {
        parent::__construct();
        $this->check_login();
    }

    private function check_login()
    {
        $is_merx_logged_in = $this->session->userdata('is_user_logged_in');
        if (!isset($is_merx_logged_in) || $is_merx_logged_in != true) {
            redirect('Login');
        }
    }

	public function index()
	{
		$this->load->view('welcome_message');
	}
}
