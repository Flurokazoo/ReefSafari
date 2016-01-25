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

                <div class="col-lg-5">
                    <img class="modalImg" id="modalCoralAvatar" src="">

                    <div id="reefName" class="white-text text-center">
                        <span id="modalCoralName"></span>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="col-lg-6 modalDescription">
                        <h3>Rarity</h3>

                        <div id="modalCoralRarity"></div>
                        <p id="modalCoralRarityText"></p>

                        <h3>Description</h3>

                        <p id="modalCoralInformation"></p>


                    </div>
                    <div class="col-lg-6 modalDescription">
                        <h3>Personal description</h3>

                        <p id="modalCoralUserDescription"></p>

                        <form>
                            <textarea type="text" id="modalDescriptionEdit"></textarea>
                        </form>
                        <button class="border modal-button btn btn-default btn-success" id="editButton" type="submit">
                            Edit
                        </button>
                        <button class="border modal-button btn btn-default btn-success" id="saveButton" type="submit">
                            Save
                        </button>
                        <button class="border modal-button btn btn-default btn-danger" id="deleteButton" type="submit">
                            Delete
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                </div>
            </div>
        </div>
    </div>
    <section class="body-section">
        <div id="fixed-nav" class="col-lg-4">
            <div id="reeflog-logo" class="col-lg-6">
                <a href="index.php"><h1><span class="yellow-text">Reef</span><span
                            class="white-text italic-text">Log</span></h1></a>
            </div>
            <nav id="fixed-search" class="col-lg-10 search">
                <ul id="search-date-list">
                </ul>
                <div id="searchBox">
                    <label for="search-input">Search</label>
                    <input class="form-control border" type="text" id="search-input">
                </div>
            </nav>
        </div>
        <div class="col-lg-4">
        </div>
        <div id="content-container" class="col-lg-8">
        </div>
    </section>


<?php require_once "footer.php"; ?>