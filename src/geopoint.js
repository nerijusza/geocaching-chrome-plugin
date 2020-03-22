/**
 * Parse geocaching.com geocache coordinate to latitude and longitude
 *
 * @param value Sample value: "N 54° 40.484 E 025° 13.158"
 * @returns {{valid: boolean, latitude: null, longitude: null}}
 * @constructor
 */
GeoPoint = function (value) {
    let point = {
        latitude: null,
        longitude: null,
        valid: false,
    };

    let decode = function (value) {
        let DEGREE = "\u00B0";

        let pattern = "(N|S)\\s*(\\d+)" + DEGREE + "\\s*(\\d+\\.\\d+)"
            + "\\s*"
            + "(E|W)\\s*(\\d+)" + DEGREE + "\\s*(\\d+\\.\\d+)";

        return value.match(new RegExp(pattern));
    };

    let toDecimal = function (direction, deg, min) {

        deg = parseFloat(deg);
        min = parseFloat(min);

        if (isNaN(deg) || isNaN(min)) {
            return null;
        }

        let sign = direction === 'N' || direction === 'E' ? 1 : -1;

        return (deg + (min / 60.0)) * sign;
    };

    let matches = decode(value);
    if (matches.length !== 7) return point;

    point.latitude = toDecimal(matches[1], matches[2], matches[3]);
    point.longitude = toDecimal(matches[4], matches[5], matches[6]);
    point.valid = !isNaN(point.longitude) && !isNaN(point.latitude);

    if (point.valid) {
        point.latitude = point.latitude.toFixed(5);
        point.longitude = point.longitude.toFixed(5);
    }

    return point;
};
