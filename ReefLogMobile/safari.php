<?php include_once "header.php" ?>

<div class="container">
    <h1>Camera API</h1>

    <section class="main-content">
        <p>Neem een foto</p>

        <p>
            <input type="file" id="take-picture" accept="image/*" class="btn btn-success login border" placeholder="Upload/Take a picture">
            <label for="take-picture" class="btn btn-success login border">Upload/Take a Picture </label>
        </p>

        <h2>Preview:</h2>
        <p>
            <img src="about:blank" alt="" id="show-picture">
        </p>

        <p id="error"></p>

        <div id="result">

        </div>

    </section>


</div>

<?php include_once "footer.php"?>