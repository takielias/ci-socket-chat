<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller
{

    function test()
    {
        var_dump($this->detectUrl());
    }

    public function detectUrl($text = "kopa kia.cm")
    {
        $reg_exUrl = "/(http|https|www|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";

        $reg_exUrl2 = "/[\w\d\.]+\.(com|org|ca|net|uk|tk)/";

        if (preg_match($reg_exUrl, $text)) {
            return false;
        } elseif (preg_match($reg_exUrl2, $text)) {
            return false;
        } else {
            return true;
        }
    }

    public function index()
    {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $this->form_validation->set_rules('username', 'Username', 'required');

            $this->form_validation->set_rules('password', 'Password', 'required');

            if ($this->form_validation->run() == false) {

                $this->session->set_flashdata('errmsg', validation_errors());

                redirect('Login');

            } else {

                $this->load->model('User_model');

                $query = $this->User_model->Check_validation($this->input->get_post('username'),
                    $this->input->get_post('password'));

                if ($query != false) // if the user's credentials validated...

                {
                    // print_r($query->username);

                    $jwt = array(
                        'username' => $query->username,
                        'email' => $query->email,
                        'power' => $query->power,
                        'cc' => $query->cc
                    );

                    $data = array(
                        'username' => $query->username,
                        'email' => $query->email,
                        'power' => $query->power,
                        'cc' => $query->cc,
                        'token' => AUTHORIZATION::generateToken($jwt),
                        'is_user_logged_in' => true
                    );

                    $this->session->sess_expiration = '3600';// expires in 1 hours

                    $this->session->set_userdata($data);

                    redirect('Dashboard');

                } else {
                    $this->session->set_flashdata('errmsg', "Incorrect Username/Password.");
                    redirect('Login');
                }

            }

        }

        $this->load->view('login/index');
    }

    public function close()
    {

    }

}



