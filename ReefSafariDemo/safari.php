<?php include_once "header.php" ?>

    <section class="header-section">
        <div id="reeflog-logo" class="col-lg-6">
            <h1><span class="yellow-text">Reef</span><span
                    class="white-text italic-text">Safari</span></h1>
        </div>
    </section>

<div class="container">

    <section class="main-content">

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