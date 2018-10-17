<?php

class MY_Controller extends CI_Controller
{

    function __construct()
    {
        parent::__construct();

        $this->load->add_package_path(FCPATH . 'application/third_party/vendor/romainrg/codeigniter-ratchet-websocket');
        $this->load->library('ratchet_websocket');
        $this->load->remove_package_path(FCPATH . 'application/third_party/vendor/romainrg/codeigniter-ratchet-websocket');
    }

}
