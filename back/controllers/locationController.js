const google_api_key = require("../google-api-key");
var request = require("request");

/**
 * GET: Find coordinate (lat / lng), for a given address
 * ex :
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887
 *      },
 *      ...
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.find = async function (req, res, next) {
    let result;
    let requestResult = [];
    let onError = false;

    let address_array = [];
    if (req.query.address.includes(",")) {
        address_array = req.query.address.split(",");
    } else {
        address_array = [req.query.address];
    }
    let jsonResponseGoogleAPI;
    let data_array = [];
    for (let i = 0; i < address_array.length; i++) {
        let address = address_array[i];
        if (!address) {

            res.status(204).json({ data:[] });

            return;
        }

        await getResponseAsync({
            uri: "https://maps.googleapis.com/maps/api/geocode/json",
            qs: {
                key: google_api_key.api_key,
                address: address
            }
        }).then((body) => {
            jsonResponseGoogleAPI = JSON.parse(body);
            data_array.push({
                latitude: jsonResponseGoogleAPI.results[0].geometry.location.lat,
                longitude: jsonResponseGoogleAPI.results[0].geometry.location.lng,
                radius: 1000
            });
        }).catch((err) => {
            result = new RequestResult({
                code: 404,
                result: null,
                error: { error: "Google maps API not found or API key outdate" }
            });
            onError = true;
            return;
        });
    }

    if (onError) {
        res.status(result.code).json({ error: result.error.error });
        return;
    }

    if (jsonResponseGoogleAPI.results.length == 0) {
        res.status(404).json({ error: "Location not found" });
        return;
    }

    if (!jsonResponseGoogleAPI.results[0].geometry
        || !jsonResponseGoogleAPI.results[0].geometry.location
        || !jsonResponseGoogleAPI.results[0].geometry.location.lat
        || !jsonResponseGoogleAPI.results[0].geometry.location.lng
    ) {
        res.status(500).json({ error: "Google map API break change" });
        return;
    }

    res.status(200).json(data_array);

}

/**
 * POST: Found all from coordinate cities
 * Body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.all = async function (req, res, next) {
    let temp = [];
    let result = [];
    let error = false;
    await getLocationInfoByType(req, "tourist_attraction", "Activities or events").then((s) => {
        temp.push(s);
        if (s.code != 200) {
            error = true;
            res.code(s.code).json(s.error);
        }
    });
    if (error) {
        return;
    }

    await getLocationInfoByType(req, "lodging", "Accomodations").then((s) => {
        temp.push(s);
        if (s.code != 200) {
            error = true;
            res.code(s.code).json(s.error);
        }
    });
    if (error) {
        return;
    }

    await getLocationInfoByType(req, "transit_station", "Transit stations").then((s) => {
        temp.push(s);
        if (s.code != 200) {
            error = true;
            res.code(s.code).json(s.error);
        }
    });
    if (error) {
        return;
    }

    await getLocationInfoByType(req, "restaurant", "Restaurant").then((s) => {
        temp.push(s);
        if (s.code != 200) {
            error = true;
            res.code(s.code).json(s.error);
        }
    });
    if (error) {
        return;
    }

    await getLocationInfoByType(req, "bar", "Bar").then((s) => {
        temp.push(s);
        if (s.code != 200) {
            error = true;
            res.code(s.code).json(s.error);
        }
    });
    if (error) {
        return;
    }

    temp.forEach((globalElem) => {
        globalElem.result.forEach((element) => {
            result.push(element);
        });
    });

    res.status(200).json(result);
}

/**
 * POST: Found activities / events from coordinate city
 * Body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.enjoy = async function (req, res, next) {
    await getLocationInfoByType(req, "tourist_attraction", "Activities or events").then((s) => {
        if (s.error !== null) {
            res.status(s.code).json(s.error);
        } else {
            res.status(s.code).json(s.result);
        }
    });
}

/**
 * POST: Found accommodations from coordinate city
 * Body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.sleep = async function (req, res, next) {
    await getLocationInfoByType(req, "lodging", "Accomodations").then((s) => {
        if (s.error !== null) {
            res.status(s.code).json(s.error);
        } else {
            res.status(s.code).json(s.result);
        }
    });
}

/**
 * POST: Found transport from coordinate city
 * Body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.travel = async function (req, res, next) {
    await getLocationInfoByType(req, "transit_station", "Transit stations").then((s) => {
        if (s.error !== null) {
            res.status(s.code).json(s.error);
        } else {
            res.status(s.code).json(s.result);
        }
    });
}

/**
 * POST: Found restaurant from coordinate city
 * Body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.eat = async function (req, res, next) {
    await getLocationInfoByType(req, "restaurant", "Restaurant").then((s) => {
        if (s.error !== null) {
            res.status(s.code).json(s.error);
        } else {
            res.status(s.code).json(s.result);
        }
    });
}

/**
 * POST: Found bar from coordinate city
 * Body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} req request
 * @param {*} res response
 * @param {*} next next
 */
exports.drink = async function (req, res, next) {
    await getLocationInfoByType(req, "bar", "Bar").then((s) => {
        if (s.error !== null) {
            res.status(s.code).json(s.error);
        } else {
            res.status(s.code).json(s.result);
        }
    });
}

/**
 * Return a promise for a specified url
 * @param {*} url url to request
 */
function getResponseAsync(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject("Invalid status code <" + response.statusCode + ">");
            }
            resolve(body);
        });
    });
}

/**
 * Get location infos by type
 * req.body:
 * [
 *      {
 *          "latitude": 43.5937762,
 *          "longitude": 1.4481887,
 *          "radius": 10000
 *      }
 * ]
 * @param {*} res response
 * @param {*} req request
 * @param {*} type type of search
 * @param {*} errMsg type of location
 */
async function getLocationInfoByType(req, type, errMsg) {
    let result;
    let requestResult = [];
    let onError = false;

    for (let i = 0; i < req.body.length; i++) {
        const { latitude, longitude, radius } = req.body[i];

        if (!latitude || !longitude || !radius) {
            result = new RequestResult({
                code: 400,
                result: null,
                error: { error: "Incomplete query params" }
            });
            onError = true;
            return;
        }

        let jsonResponseGoogleAPI;
        await getResponseAsync({
            uri: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            qs: {
                key: google_api_key.api_key,
                type: type,
                location: latitude + "," + longitude,
                radius: radius
            }
        }).then((body) => {
            jsonResponseGoogleAPI = JSON.parse(body);
        }).catch((err) => {
            result = new RequestResult({
                code: 404,
                result: null,
                error: { error: "Google maps API not found or API key outdate" }
            });
            onError = true;
            return;
        });

        if (jsonResponseGoogleAPI.results.length == 0) {
            result = new RequestResult({
                code: 404,
                result: null,
                error: { error: errMsg + " not found" }
            });
            onError = true;
            return;
        }

        jsonResponseGoogleAPI.results.forEach((event) => {
            requestResult.push(new LocationInfos(event));
        });
    }
    if (!onError) {
        result = new RequestResult({
            code: 200,
            result: requestResult,
            error: null
        });
    }
    return result;
}

/**
 * Location infos class
 */
class LocationInfos {
    constructor(obj) {
        if (obj) {
            this.name = obj.name;
            this.icon = obj.icon;
            this.rating = obj.rating;
            this.user_ratings_total = obj.user_ratings_total;
            this.vicinity = obj.vicinity;
            this.location = obj.geometry.location;
        }
    }
}

/**
 * Request result
 */
class RequestResult {
    constructor(obj) {
        if (obj) {
            this.code = obj.code;
            this.result = obj.result;
            this.error = obj.error;
        }
    }
}