window.onload = function() {
    if (window.location.hostname.includes('geocaching.com')) {
        geocachingMain();
    } else { // moves count
        movesCountMain();
    }
};

function geocachingMain() {
    let cacheName = latinize($('.cacheDetailsTitle span').html());
    let geocacheCoordinateElement = $('#uxLatLon');

    geocacheCoordinateElement.parent().closest('div')
        .append("<div id='nChromePluginContainer'><b>Chrome plugin</b><br /></div>");

    let pluginContainer = $('#nChromePluginContainer');

    let geocacheCoordinate = geocacheCoordinateElement.html();
    console.log(">>> " + geocacheCoordinate);

    let geoPoint = GeoPoint(geocacheCoordinate);

    let text = geoPoint.valid
        ? geoPoint.latitude + " " + geoPoint.longitude
        : "Error: unable to parse coordinates";

    if (geoPoint.valid) {
        pluginContainer.append("<div><button id='nCopy'>Copy</button> <span id='ncoordinates'>" + text + "</span></div>");

        $('#nCopy').on( "click", function() {
            copyToClipboard('#ncoordinates');
            toastr.success('Full coordinates copied!');
            return false;
        });

        pluginContainer.append("<div><button id='nCopyLat'>Copy</button> <span id='nLat'>" + geoPoint.latitude + "</span></div>");
        $('#nCopyLat').on( "click", function() {
            copyToClipboard('#nLat');
            toastr.success('Latitude copied!');
            return false;
        });

        pluginContainer.append("<div><button id='nCopyLon'>Copy</button> <span id='nLon'>" + geoPoint.longitude + "</span></div>");
        $('#nCopyLon').on( "click", function() {
            copyToClipboard('#nLon');
            toastr.success('Longitude copied!');
            return false;
        });

        pluginContainer.append("<br />Point name:<br /><div><input type='text' id='ncacheName' value='" + cacheName + "'> <button id='nExportToMovesCount'>Export to Movescount</button></div>");

    } else {
        pluginContainer.append("Error: " + text);
    }
}

function movesCountMain() {
    setTimeout(function () {
        console.log("1111");
        $('#CreateWaypointBtn').click();
        $('#ctl00_leftColumn_Navigation_WaypointEditTemplate0_Controls_NameTb').click().val('hahaha');
        $('#ctl00_leftColumn_Navigation_WaypointEditTemplate0_Controls_LatTb').focus().val('54.43532');
        $('#ctl00_leftColumn_Navigation_WaypointEditTemplate0_Controls_LonTb').focus().val('24.6666');
        $('#ctl00_leftColumn_Navigation_WaypointEditTemplate0_CancelSaveBtns_SaveBtn').click();
        $('#ctl00_leftColumn_Navigation_WaypointEditTemplate0_Controls_NameTb').click().val('gagaga');
        console.log("2222");
    }, 6000);
}


function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}