<?php if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class User_model extends CI_Model
{

    private $C_date = 0;
    private $C_date_time = 0;


    function __construct()
    {

        parent::__construct();

        $this->C_date = $this->get_current_date();

        $this->C_date_time = $this->get_current_date_time();

    }


    private function get_current_date_time()
    {

        $dt = new DateTime("now", new DateTimeZone('Asia/Dhaka'));

        return $dt->format('Y-m-d H:i:s');
    }

    private function get_current_date()
    {

        $dt = new DateTime("now", new DateTimeZone('Asia/Dhaka'));

        return $dt->format('Y-m-d');
    }

    public function Check_Existing_User()
    {

        $this->db->select('id');

        $this->db->where('username', preg_replace('/\s+/', '', $this->input->post('user')));

        $query = $this->db->get('user');

        if ($query->num_rows() != 0) {
            return false;
        }

        return true;
    }

    public function Check_Existing_Email()
    {
        $this->db->select('id');

        $this->db->where('email', $this->input->post('email'));

        $query = $this->db->get('user');

        if ($query->num_rows() != 0) {
            return false;
        }

        return true;
    }

    function RemoveSpecialChar($value)
    {
        $result = preg_replace('/[^a-zA-Z0-9_ -]/s', '', $value);

        return $result;
    }

    public function Insert()
    {
        $data = array(

            'username' => strtolower($this->input->post('user')),
            'email' => strtolower($this->input->post('email')),
            'password' => password_hash(sha1($this->input->post('password')), PASSWORD_BCRYPT),
            'created_at' => $this->input->post('user')

        );

        $data = $this->security->xss_clean($data);

        $this->db->insert('user', $data);

        if ($this->db->affected_rows() > 0) {
            return true;
        } else {
            return false;
        }

    }


    public function Check_validation($user, $pass)
    {
        $this->db->where('username', $user);

        $this->db->where('power!=', 0);

        $query = $this->db->get('user');

        if ($query->num_rows() == 1) {

            if (password_verify(sha1($pass), $query->row()->password)) {
                return $query->row();
            } else {
                return false;
            }
        }

        return false;
    }


}



