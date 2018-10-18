<?php defined('BASEPATH') OR exit('No direct script access allowed');

use Ratchet\ConnectionInterface;

class Chatroom
{
    public $RoomName;

    public $RoomUserList;

    public $RoomUserObjList;

    private $roomlimit = 40;

    private $kickEffectTime = 5;

    private $kickUser = array();

    private $VotedUser = array();

    private $KickedUser = array();

    private $TargetName = false;

    private $VoteCount = 0;

    private $SecCount = 0;

    private $GameSecCount = 0;

    public $winner;

    private $TargetUserorTimer;

    public $GS = 0;

    public function __construct()
    {
        $this->RoomUserList = array();
        $this->RoomUserObjList = array();
    }

    public function setRoom($RoomName)
    {
        $this->RoomName = $RoomName;
    }

    public function join($data, ConnectionInterface $client)
    {
        if (in_array($data->user_id, $this->KickedUser)) {

            $msg = array(
                "type" => "error",
                "msg" => 'Recently you have been kicked from this room. Please Try again later.'
            );

            $client->send(json_encode($msg));

        } elseif (count($this->RoomUserList) > $this->roomlimit) {
            $msg = array(
                "type" => "error",
                "msg" => 'Room is Full.'
            );

            $client->send(json_encode($msg));

        } elseif (in_array($data->user_id, $this->RoomUserList)) {

            $msg = array(
                "status" => "1",
                "type" => "roomchat",
                "room_name" => $data->room_name,
                "sender" => $data->room_name,
                "receiver" => $data->room_name,
                "power" => 0,
                "msg" => $this->GetRoomUserList()
            );

            $client->send(json_encode($msg));

        } else {

            array_push($this->RoomUserList, $data->user_id);

            array_push($this->RoomUserObjList, $client);

            $msg = array(
                "status" => "1",
                "type" => "roomchat",
                "room_name" => $data->room_name,
                "sender" => $data->room_name,
                "receiver" => $data->room_name,
                "power" => 0,
                "msg" => $this->GetRoomUserList()
            );

            $client->send(json_encode($msg));

            $this->SendMsgToRoomAllUser($this->RoomName, $this->RoomName, 0, $data->user_id . " has joined.");

        }

    }

    public function leave($data, ConnectionInterface $client)
    {
        $this->RemoveFromList($client);

        $this->SendMsgRoom($this->RoomName, $this->RoomName, $data->user_id . " has left.");

    }

    public function SendMsgToRoomAllUser($sender, $receiver, $power, $msg)
    {
        foreach ($this->RoomUserObjList as $client) {

            $client->send(json_encode(array(
                "type" => "roomchat",
                "room_name" => $this->RoomName,
                "sender" => $sender,
                "receiver" => $receiver,
                "power" => $power,
                "msg" => $msg
            )));

        }
    }

    private function SendMsgRoom($sender, $receiver, $msg)
    {

        if ($this->RoomName == $sender) {

            foreach ($this->RoomUserObjList as $client) {

                $response_to = $msg;

                $client->send(json_encode(array(
                    "type" => "roomchat",
                    "room_name" => $this->RoomName,
                    "sender" => $sender,
                    "receiver" => $receiver,
                    "power" => 0,
                    "msg" => $response_to
                )));

            }
        }


    }

    public function GetRoomUserList()
    {

        $data = array();

        foreach ($this->RoomUserList as $client) {
            if (count($data) == 0) {
                $data[] = $client;
            } else {
                array_push($data, $client);
            }

        }
        return $data;

    }

    private function RemoveFromList($user)
    {

        $key = array_search($user->username, $this->RoomUserList);
        if ($key !== false) {
            unset($this->RoomUserList[$key]);
        }

        $key = array_search($user, $this->RoomUserObjList);
        if ($key !== false) {
            unset($this->RoomUserObjList[$key]);
        }
    }
}