<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends MY_Controller
{


    public function _auth($datas = null)
    {
        // Here you can verify everything you want to perform user login.
        // However, method must return integer (client ID) if auth succedeed and false if not.

        //print_r($datas);

        return (!empty($datas->user_id)) ? $datas->user_id : false;
    }

    public function _event($datas = null)
    {
        // Here you can do everyting you want, each time message is received
//        echo 'Hey ! I\'m an EVENT callback' . PHP_EOL;

        //print_r($datas);

    }

    public function _close($datas = null)
    {
        // Here you can do everyting you want, each time message is received
//        echo 'Hey ! I\'m an EVENT callback' . PHP_EOL;

        //print_r($datas);

    }

    public function index()
    {

        $this->ratchet_websocket->set_callback('auth', array($this, '_auth'));
        $this->ratchet_websocket->set_callback('event', array($this, '_event'));
        $this->ratchet_websocket->set_callback('close', array($this, '_close'));
        $this->ratchet_websocket->run();
    }
}
