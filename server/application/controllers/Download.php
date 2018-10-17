<?php

class Download extends CI_Controller
{

    function android()
    {
        //load the download helper
        $this->load->helper('download');
        //Get the file from whatever the user uploaded (NOTE: Users needs to upload first), @See http://localhost/CI/index.php/upload
        $data = file_get_contents(".Chilro.apk");
        //Read the file's contents
        $name = 'Chilro.apk';
        //use this function to force the session/browser to download the file uploaded by the user
        force_download($name, $data);

    }

    public function CalculateCard()
    {
        $test = array(

            array(
                'id' => 'user1',
                'val' => 2
            ),
            array(
                'id' => 'user2',
                'val' => 3
            ),
            array(
                'id' => 'user3',
                'val' => 2
            )
        );

        $cardValArray = array();

        foreach ($test as $player) {

            array_push($cardValArray, $player['val']);

        }

        $value = max($cardValArray);

        $key = array_search($value, $cardValArray);

        print_r($test[$key]);

    }

    public function countDuplicate($drawDoneOBJ)
    {
        $fil = array();

        foreach ($drawDoneOBJ as $item) {
            array_push($fil, $item['val']);
        }

        $counts = array_count_values($fil);
        $filtered = array_filter($fil, function ($value) use ($counts) {
            return $counts[$value] > 1;
        });

        return $filtered;

    }


    public function test()
    {

        $test = array(

            array(
                'id' => 'user1',
                'val' => 2
            ),
            array(
                'id' => 'user2',
                'val' => 3
            ),
            array(
                'id' => 'user3',
                'val' => 3
            )
        );

        if (!empty($this->countDuplicate($test))) {
            echo "Duplicate Found";
        } else {
            echo "No Duplicate Found";
        }
    }

}
