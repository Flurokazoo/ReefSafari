<?php
require_once "header.php";
isLoggedIn();
?>

    <div id="detailsModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <div class="col-sm-5">
                    <img class="modalImg" id="modalCoralAvatar" src="">


                </div>
                <div class="col-sm-7">
                    <div id="reefName" class="white-text text-center">
                        <span id="modalCoralName"></span>
                    </div>
                    <div class="col-sm-12 modalDescription">
                        <h3>Rarity</h3>

                        <div id="modalCoralRarity"></div>

                        <h3>Venomous</h3>

                        <p id="modalCoralVenomous"></p>

                        <button class="border modal-button btn btn-default btn-danger" id="deleteButton" type="submit">Delete</button>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <section class="body-section">
        <div id="fixed-nav" class="col-sm-12">
            <div id="reeflog-logo" class="col-sm-6">
                <a href="reeflog.php"><h1><span class="yellow-text">Reef</span><span
                            class="white-text italic-text">Log</span></h1></a>
            </div>
            <nav id="fixed-search" class="col-sm-12 search">
                <div id="searchBox">
                    <label for="search-input">Search</label>
                    <input class="form-control border" type="text" id="search-input">
                </div>
            </nav>
        </div>
        <div class="col-sm-4">
        </div>
        <div id="content-container" class="col-sm-12">
        </div>
    </section>


<?php require_once "footer.php"; ?>
<script src="assets/js/reeflog.js"></script>
