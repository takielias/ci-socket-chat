<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Signup extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('User_model');
    }


    public function index()

    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            $this->form_validation->set_rules('user', 'User Name',
                'required|callback_check_existing_user|callback_detectSc|min_length[2]|max_length[25]');

            $this->form_validation->set_rules('email', 'User Email',
                'required|valid_email|callback_check_existing_email');

            $this->form_validation->set_rules('password', 'User Password', 'required');

            if ($this->form_validation->run() == true) {

                $this->load->model('User_model');

                if ($this->User_model->Insert() != false) {

                    $this->session->set_flashdata('msg', "Successfully Registered.");

                    redirect('Login');

                } else {

                    $this->session->set_flashdata('errmsg', "Failed.");

                    redirect('Signup');
                }

            } else {


                $this->session->set_flashdata('errmsg', validation_errors());

                redirect('Signup');
            }

        }

        $this->load->view('login/signup');
    }


    public function check_existing_user()
    {

        $tempUser = $this->User_model->Check_Existing_User();

        if ($tempUser == false) {

            $this->form_validation->set_message('check_existing_user', 'User Already Registered.');

            return false;

        }

        return true;

    }

    public function check_existing_email()
    {
        $tempEmail = $this->User_model->Check_Existing_Email();

        if ($tempEmail == false) {

            $this->form_validation->set_message('check_existing_email', 'Email Already Registered.');

            return false;
        }

        return true;
    }

    public function detectSc($string)
    {
        $regex_lowercase = '/[a-z,0-9]/';

        if (!preg_match('/^[a-z,0-9._\-]+$/i', $string)) {
            $this->form_validation->set_message('detectSc',
                'The {field} field must not have special character.');
            return false;
        } elseif (preg_match_all($regex_lowercase, $string) < 1) {
            $this->form_validation->set_message('detectSc',
                'The {field} field must be at least one letter.');
            return false;
        }

        return true;
    }

    public function valid_password($password)
    {
        $password = trim($password);
        //$regex_lowercase = '/[a-z]/';
        //$regex_uppercase = '/[A-Z]/';
        $regex_number = '/[0-9]/';
        $regex_special = '/[!@#$%^&*()\-_=+{};:,?|<.>§~]/`';
        if (empty($password)) {
            $this->form_validation->set_message('valid_password', 'The {field} field is required.');
            return false;
        }

//        if (preg_match_all($regex_lowercase, $password) < 1)
//        {
//            $this->form_validation->set_message('valid_password', 'The {field} field must be at least one lowercase letter.');
//            return FALSE;
//        }
//        if (preg_match_all($regex_uppercase, $password) < 1)
//        {
//            $this->form_validation->set_message('valid_password', 'The {field} field must be at least one uppercase letter.');
//            return FALSE;
//        }

        if (preg_match_all($regex_number, $password) < 1) {
            $this->form_validation->set_message('valid_password', 'The {field} field must have at least one number.');
            return false;
        }
        if (preg_match_all($regex_special, $password) < 1) {
            $this->form_validation->set_message('valid_password',
                'The {field} field must have at least one special character.' . ' ' . htmlentities('!@#$%^&*()\-_=+{};:,<.>§~'));
            return false;
        }
        if (strlen($password) < 6) {
            $this->form_validation->set_message('valid_password',
                'The {field} field must be at least 6 characters in length.');
            return false;
        }
        if (strlen($password) > 32) {
            $this->form_validation->set_message('valid_password',
                'The {field} field cannot exceed 32 characters in length.');
            return false;
        }
        return true;
    }


}
