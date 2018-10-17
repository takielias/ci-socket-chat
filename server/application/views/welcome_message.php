<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Chilro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="<?php echo base_url(); ?>asset/css/bootstrap.min.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>asset/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>asset/jemoji/dist/emojionearea.css" rel="stylesheet">

    <link href="<?php echo base_url(); ?>asset/css/dashboard.css" rel="stylesheet">

</head>
<body>

<div class="container">

    <div class="row">

        <div class="panel messages-panel ">

            <div class="contacts-list">

                <div class="inbox-categories">

                    <div id="rmldiv" data-toggle="tab" data-target="#rml">Room</div>

                    <div id="totalroommsg" data-toggle="tab" data-target="#status">Chat <span
                                style="visibility:hidden;"
                                class="button" id="ttcount">0</span>
                    </div>

                    <div><a id="clogout" href="#">Logout</a></div>

                </div>

                <div class="tab-content">

                    <div id="rml" class="contacts-outter-wrapper tab-pane active">

                        <div class="contacts-outter">

                            <ul class="list-unstyled contacts" id="roomlist">

                                <li data-toggle="tab" class="active">

                                    <div class="vcentered info-combo">
                                        <h3 class="no-margin-bottom name"><a href="#">Bangladesh</a></h3>
                                    </div>

                                </li>
                                <li data-toggle="tab">

                                    <div class="vcentered info-combo">
                                        <h3 class="no-margin-bottom name"><a href="#">Pakistan</a></h3>
                                    </div>

                                </li>

                                <li data-toggle="tab">

                                    <div class="vcentered info-combo">
                                        <h3 class="no-margin-bottom name"><a href="#">Indonesia</a></h3>
                                    </div>

                                </li>

                                <li data-toggle="tab">

                                    <div class="vcentered info-combo">
                                        <h3 class="no-margin-bottom name"><a href="#">India</a></h3>
                                    </div>

                                </li>

                                <li data-toggle="tab">

                                    <div class="vcentered info-combo">
                                        <h3 class="no-margin-bottom name"><a href="#">Nepal</a></h3>
                                    </div>

                                </li>

                                <li data-toggle="tab">

                                    <div class="vcentered info-combo">
                                        <h3 class="no-margin-bottom name"><a href="#">Maldives</a></h3>
                                    </div>

                                </li>

                            </ul>
                        </div>


                    </div>


                    <div id="status" class="contacts-outter-wrapper tab-pane">

                        <div class="contacts-outter">

                            <ul class="list-unstyled contacts success" id="tab-contacts-outter">

                            </ul>

                        </div>
                    </div>

                </div>

            </div>

            <div class="tab-content" id="allmsg"></div>

        </div>


    </div>

</div>

<input type="hidden" id="session" value="<?php echo $this->session->userdata('username'); ?>">

<input type="hidden" id="token" value="<?php echo $this->session->userdata('token'); ?>">

<input type="hidden" id="login_path" value="<?php echo base_url(); ?>">

<input type="hidden" id="tempvar">

<script src="<?php echo base_url(); ?>asset/js/jquery.min.js"></script>

<script src="<?php echo base_url(); ?>asset/js/bootstrap.min.js"></script>

<script src="<?php echo base_url(); ?>asset/chat/bundle.js"></script>

<script type="text/javascript" src="<?php echo base_url(); ?>asset/jemoji/dist/emojionearea.min.js"></script>

</body>

</html>