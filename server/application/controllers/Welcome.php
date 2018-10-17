<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends MY_Controller
{

    private $clients;

    private $users;

    private $RoomArrayObjectList = Array();

    private $RoomArrayNameList = Array();

    private $LoginClientsObj = Array();

    public $current_time;

    private $mroom = "";

    private $tempuserExistance;

    function __construct()
    {

        parent::__construct();

        $this->load->model('User_model');

    }

    public function _auth($datas = null, $client)
    {
        // Here you can verify everything you want to perform user login.
        // However, method must return integer (client ID) if auth succedeed and false if not.

        if ($this->validate($datas) != false) {

            $data['status'] = 1;

            array_push($this->LoginClientsObj, $client);

            $data['msg'] = 'Login Success.';

            return $data;

        } else {

            $data['status'] = 0;

            return $data;
        }


//        return (!empty($datas->user_id)) ? $datas->user_id : false;
    }

    public function _event($datas = null)
    {
        // Here you can do everyting you want, each time message is received
        echo 'Hey ! I\'m an EVENT callback' . PHP_EOL;

//        print_r($datas);

    }

    public function _close($datas = null)
    {
        // Here you can do everyting you want, each time message is received
        echo 'Hey ! I\'m an EVENT callback' . PHP_EOL;

//        print_r($datas);

    }


    public function _timer($data)
    {
        // Here you can do everyting you want, each time message is received
//        echo 'Hey ! I\'m Timer ' . $data . PHP_EOL;

//        print_r($datas);

    }

    public function _roomjoin($data, $client)
    {

        $room = $this->roomExist($data->room_name);

        if ($room != false) {

            $room->join($data, $client);

        } else {

            $this->load->library('Chatroom');

            $room = New Chatroom();

            $room->setRoom($data->room_name);

            array_push($this->RoomArrayObjectList, $room);

            $room->join($data, $client);
        }

    }


    public
    function index()
    {

        $this->ratchet_websocket->set_callback('auth', array($this, '_auth'));
        $this->ratchet_websocket->set_callback('event', array($this, '_event'));
        $this->ratchet_websocket->set_callback('close', array($this, '_close'));
        $this->ratchet_websocket->set_callback('citimer', array($this, '_timer'));
        $this->ratchet_websocket->set_callback('roomjoin', array($this, '_roomjoin'));
        $this->ratchet_websocket->run();
    }

    private
    function roomExist(
        $roomName
    ) {

        foreach ($this->RoomArrayObjectList as $room) {
            if ($room->RoomName == $roomName) {
                return $room;
            }
        }
        return false;
    }

    private function userExistInRoom($roomName, $userName)
    {

        foreach ($this->RoomArrayObjectList as $room) {

            if ($room->RoomName == $roomName) {

                foreach ($room->RoomUserList as $user) {

                    if ($user->user_id == $userName) {
                        return true;
                    }
                }

            }
        }
        return false;
    }

    private function validate($data)
    {
        $jwt = AUTHORIZATION::validateToken($data->token);
        if ($jwt->username == $data->user_id) {
            return $jwt;
        } else {
            return false;
        }
    }
}
