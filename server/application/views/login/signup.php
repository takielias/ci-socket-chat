<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Chilro.com</title>

    <link href="<?php echo base_url(); ?>asset/bootstrap-4.1.3/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?php echo base_url(); ?>asset/css/style.css" rel="stylesheet">

</head>

<body class="text-center">

<?php echo form_open('Signup', array('class' => 'form-signin')); ?>

<?php $mmsg = $this->session->flashdata('msg'); ?>
<?php if (isset($mmsg)) : ?>
    <div class="alert alert-info">
        <button class="close" data-dismiss="alert">
            <i class="ace-icon fa fa-times"></i>
        </button>
        <?php echo $mmsg; ?>
    </div>
<?php endif; ?>

<?php $mmsg = $this->session->flashdata('errmsg'); ?>
<?php if (isset($mmsg)) : ?>
    <div class="alert alert-danger">
        <button class="close" data-dismiss="alert">
            <i class="ace-icon fa fa-times"></i>
        </button>
        <?php echo $mmsg; ?>
    </div>
<?php endif; ?>

<h3 class="h3 mb-3 font-weight-normal">Chilro Signup</h3>
<label for="inputEmail" class="sr-only">User Name</label>
<input type="text" id="inputEmail" name="user" class="form-control" placeholder="User Name" required=""
       autofocus="">
<label for="inputEmail" class="sr-only">Email</label>
<input type="email" name="email" id="inputPassword" class="form-control" placeholder="Email" required="">

<label for="inputPassword" class="sr-only">Password</label>
<input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required="">

<button class="btn btn-primary btn-block" type="submit">Sign up</button>

<hr>
<a href="<?php echo base_url(); ?>index.php/Login">Login</a>

<hr>
<p class="mt-5 mb-3 text-muted">Chilro © 2017-2018</p>
<?php echo form_close(); ?>

</body>
</html>