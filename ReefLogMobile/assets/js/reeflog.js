/**
 * Created by Niek on 25-1-2016.
 */
$(reeflog);

function reeflog(){
    $('#search-input').bind('input', searchEntries);
    getAllEntries();
}