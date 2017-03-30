(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utilities = exports.Utilities = function () {
    function Utilities() {
        _classCallCheck(this, Utilities);
    }

    _createClass(Utilities, null, [{
        key: "URL",
        get: function get() {
            return {
                contains: function contains(pathArray, keepQueryString) {
                    var url, baseurl;

                    if (!keepQueryString || typeof keepQueryString === "undefined") {
                        url = window.location.href;
                        baseurl = url.split("?")[0];
                    } else {
                        baseurl = window.location.href;
                    }

                    for (var i = 0; i < pathArray.length; i++) {
                        if (baseurl.indexOf(pathArray[i]) === -1 && baseurl.indexOf(pathArray[i].toLowerCase()) === -1) {
                            return false;
                        }
                    }
                    return true; // did we reach the end? everything passed
                },
                hasParameter: function hasParameter(name) {

                    var fullQString = window.location.search.substring(1);

                    if (fullQString.length > 0) {

                        var paramArray = fullQString.split("&");

                        for (var i = 0; i < paramArray.length; i++) {
                            var currentParameter = paramArray[i].split("=");
                            if (currentParameter[0] === name) {
                                return true;
                            }
                        }
                    }

                    return false;
                },
                getParameter: function getParameter(name) {
                    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
                    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
                }

            };
        }
    }, {
        key: "Files",
        get: function get() {
            return {
                getFileNameWithoutExtension: function getFileNameWithoutExtension(filename) {
                    return filename.substring(0, filename.lastIndexOf("."));
                },
                getFileExtension: function getFileExtension(filename) {
                    var i = filename.lastIndexOf('.');
                    return i < 0 ? '' : filename.substr(i);
                }
            };
        }
    }, {
        key: "Dates",
        get: function get() {
            return {
                getFormattedDate: function getFormattedDate(date) {
                    var month = date.getMonth() + 1; // getMonth() returns 0 -11
                    if (month <= 9) month = '0' + month;

                    var day = date.getDate();
                    if (day <= 9) day = '0' + day;

                    return date.getFullYear() + '/' + month + '/' + day;
                }
            };
        }
    }, {
        key: "Text",
        get: function get() {

            return {
                generateRandomString: function generateRandomString(strLength) {
                    if (typeof strLength === 'undefined') strLength = 8;

                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < strLength; i++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }

                    return text;
                }
            };
        }
    }, {
        key: "Cookies",
        get: function get() {
            return {
                createCookie: function createCookie(name, value, days) {
                    var expires;
                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                        expires = "; expires=" + date.toGMTString();
                    } else {
                        expires = "";
                    }
                    document.cookie = name + "=" + value + expires + "; path=/";
                },
                readCookie: function readCookie(name) {
                    var nameEQ = name + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) === ' ') {
                            c = c.substring(1, c.length);
                        }
                        if (c.indexOf(nameEQ) === 0) {
                            return c.substring(nameEQ.length, c.length);
                        }
                    }
                    return null;
                },
                destroyCookie: function destroyCookie(name) {
                    this.createCookie(name, "", -1);
                }
            };
        }
    }, {
        key: "Validation",
        get: function get() {

            return {
                isEqual: function isEqual(one, two) {
                    if (one == two) return true;else return false;
                },
                isIdentical: function isIdentical(one, two) {
                    if (one === two) return true;else return false;
                },
                isNullOrEmpty: function isNullOrEmpty(check) {
                    var errors = false;

                    if (Object.prototype.toString.call(check) === '[object Array]') {
                        for (var i = 0; i < check.length; i++) {

                            if (!check[i]) {
                                errors = true;
                            }
                            if (check[i].trim() === '') {
                                errors = true;
                            }
                        }
                    } else if (typeof check === 'string') {
                        if (!check) {
                            errors = true;
                        }
                        if (check.trim() === '') {
                            errors = true;
                        }
                    }

                    return errors;
                },
                validateEmail: function validateEmail(email) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                },
                validateDate: function validateDate(dateString) {
                    // Check pattern
                    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateString)) return false;

                    // Parse the date parts to integers
                    var parts = dateString.split("/");
                    var year = parseInt(parts[0], 10);
                    var month = parseInt(parts[1], 10);
                    var day = parseInt(parts[2], 10);

                    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

                    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                    // Adjust for leap years
                    if (year % 400 === 0 || year % 100 !== 0 && year % 4 === 0) monthLength[1] = 29;

                    return day > 0 && day <= monthLength[month - 1];
                },
                validateURL: function validateURL(url) {
                    var re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi;
                    return re.test(url);
                },
                validateCommaSeparatedURLs: function validateCommaSeparatedURLs(urls) {
                    var re = /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)(\s*,\s*((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?))*$/gi;
                    return re.test(urls);
                },
                validateSlug: function validateSlug(slug) {
                    var re = /^[a-z0-9-]+$/;
                    return re.test(slug);
                },
                validateIP: function validateIP(ip) {
                    var re = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                    return re.test(ip);
                }
            };
        }
    }]);

    return Utilities;
}();

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _Baseline = require('./Baseline.Utilities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Baseline = function Baseline() {
    _classCallCheck(this, Baseline);

    this.Utilities = _Baseline.Utilities;
};

global.Baseline = new Baseline();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./Baseline.Utilities":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzXFxCYXNlbGluZS5VdGlsaXRpZXMuanMiLCJzcmNcXGpzXFxzcmNcXGpzXFxCYXNlbGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBYSxTLFdBQUEsUztBQUVULHlCQUFhO0FBQUE7QUFFWjs7Ozs0QkFFZ0I7QUFDYixtQkFBTztBQUNILDBCQUFVLGtCQUFVLFNBQVYsRUFBcUIsZUFBckIsRUFBc0M7QUFDNUMsd0JBQUksR0FBSixFQUFTLE9BQVQ7O0FBRUEsd0JBQUksQ0FBQyxlQUFELElBQW9CLE9BQU8sZUFBUCxLQUEyQixXQUFuRCxFQUFnRTtBQUM1RCw4QkFBTSxPQUFPLFFBQVAsQ0FBZ0IsSUFBdEI7QUFDQSxrQ0FBVSxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFWO0FBQ0gscUJBSEQsTUFHTztBQUNILGtDQUFVLE9BQU8sUUFBUCxDQUFnQixJQUExQjtBQUNIOztBQUVELHlCQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBVSxNQUE5QixFQUFzQyxHQUF0QyxFQUEyQztBQUN2Qyw0QkFBSSxRQUFRLE9BQVIsQ0FBZ0IsVUFBVSxDQUFWLENBQWhCLE1BQWtDLENBQUMsQ0FBbkMsSUFBd0MsUUFBUSxPQUFSLENBQWdCLFVBQVUsQ0FBVixFQUFhLFdBQWIsRUFBaEIsTUFBZ0QsQ0FBQyxDQUE3RixFQUFnRztBQUM1RixtQ0FBTyxLQUFQO0FBQ0g7QUFDSjtBQUNELDJCQUFPLElBQVAsQ0FmNEMsQ0FlL0I7QUFDaEIsaUJBakJFO0FBa0JILDhCQUFjLHNCQUFVLElBQVYsRUFBZ0I7O0FBRTFCLHdCQUFJLGNBQWMsT0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLFNBQXZCLENBQWlDLENBQWpDLENBQWxCOztBQUVBLHdCQUFJLFlBQVksTUFBWixHQUFxQixDQUF6QixFQUE0Qjs7QUFFeEIsNEJBQUks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dGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGNsYXNzIFV0aWxpdGllcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IFVSTCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAocGF0aEFycmF5LCBrZWVwUXVlcnlTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsLCBiYXNldXJsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwUXVlcnlTdHJpbmcgfHwgdHlwZW9mIGtlZXBRdWVyeVN0cmluZyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgICAgICAgICAgICAgYmFzZXVybCA9IHVybC5zcGxpdChcIj9cIilbMF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYmFzZXVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNldXJsLmluZGV4T2YocGF0aEFycmF5W2ldKSA9PT0gLTEgJiYgYmFzZXVybC5pbmRleE9mKHBhdGhBcnJheVtpXS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gZGlkIHdlIHJlYWNoIHRoZSBlbmQ/IGV2ZXJ5dGhpbmcgcGFzc2VkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGFzUGFyYW1ldGVyOiBmdW5jdGlvbiAobmFtZSkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxRU3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZnVsbFFTdHJpbmcubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbUFycmF5ID0gZnVsbFFTdHJpbmcuc3BsaXQoXCImXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1BcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRQYXJhbWV0ZXIgPSBwYXJhbUFycmF5W2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFyYW1ldGVyWzBdID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0UGFyYW1ldGVyOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IFJlZ0V4cCgnWz8mXScgKyBuYW1lICsgJz0oW14mXSopJykuZXhlYyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2ggJiYgZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBGaWxlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldEZpbGVOYW1lV2l0aG91dEV4dGVuc2lvbjogZnVuY3Rpb24oZmlsZW5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWxlbmFtZS5zdWJzdHJpbmcoMCxmaWxlbmFtZS5sYXN0SW5kZXhPZihcIi5cIikpOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRGaWxlRXh0ZW5zaW9uOiBmdW5jdGlvbihmaWxlbmFtZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBmaWxlbmFtZS5sYXN0SW5kZXhPZignLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoaSA8IDApID8gJycgOiBmaWxlbmFtZS5zdWJzdHIoaSk7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IERhdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0Rm9ybWF0dGVkRGF0ZTogZnVuY3Rpb24oZGF0ZSl7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTsgLy8gZ2V0TW9udGgoKSByZXR1cm5zIDAgLTExXG4gICAgICAgICAgICAgICAgaWYobW9udGggPD0gOSlcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSAnMCcrbW9udGg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF5PSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICBpZihkYXkgPD0gOSlcbiAgICAgICAgICAgICAgICAgICAgZGF5ID0gJzAnK2RheTsgICAgXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICsgJy8nICsgbW9udGggKyAnLycgKyBkYXk7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBUZXh0KCl7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdlbmVyYXRlUmFuZG9tU3RyaW5nOiBmdW5jdGlvbihzdHJMZW5ndGgpe1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBzdHJMZW5ndGggPT09ICd1bmRlZmluZWQnKSBcbiAgICAgICAgICAgICAgICAgICAgc3RyTGVuZ3RoID0gODtcblxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICB2YXIgcG9zc2libGUgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5XCI7XG5cbiAgICAgICAgICAgICAgICBmb3IoIHZhciBpPTA7IGkgPCBzdHJMZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0OyAgICAgICAgXG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgQ29va2llcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNyZWF0ZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4cGlyZXM7XG4gICAgICAgICAgICAgICAgaWYgKGRheXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjsgcGF0aD0vXCI7XG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHJlYWRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWVFUSA9IG5hbWUgKyBcIj1cIjtcbiAgICAgICAgICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gY2FbaV07XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7IGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aCk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7IHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aCk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUNvb2tpZShuYW1lLCBcIlwiLCAtMSk7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IFZhbGlkYXRpb24oKXtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNFcXVhbDogZnVuY3Rpb24ob25lLCB0d28pe1xuICAgICAgICAgICAgICAgIGlmKG9uZSA9PSB0d28pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSWRlbnRpY2FsOiBmdW5jdGlvbihvbmUsdHdvKXtcbiAgICAgICAgICAgICAgICBpZihvbmUgPT09IHR3bylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9LCAgICAgICAgXG4gICAgICAgICAgICBpc051bGxPckVtcHR5OiBmdW5jdGlvbihjaGVjayl7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGNoZWNrKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaSA8IGNoZWNrLmxlbmd0aDsgaSsrKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWNoZWNrW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNoZWNrW2ldLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYodHlwZW9mIGNoZWNrID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpZighY2hlY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoY2hlY2sudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcnM7ICAgICAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsaWRhdGVFbWFpbDogZnVuY3Rpb24oZW1haWwpe1xuICAgICAgICAgICAgICAgIHZhciByZSA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgICAgICAgICAgICAgIHJldHVybiByZS50ZXN0KGVtYWlsKTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWxpZGF0ZURhdGU6IGZ1bmN0aW9uKGRhdGVTdHJpbmcpe1xuICAgICAgICAgICAgICAgIC8vIENoZWNrIHBhdHRlcm5cbiAgICAgICAgICAgICAgICBpZighL15cXGR7NH1cXC9cXGR7MSwyfVxcL1xcZHsxLDJ9JC8udGVzdChkYXRlU3RyaW5nKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGRhdGUgcGFydHMgdG8gaW50ZWdlcnNcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBkYXRlU3RyaW5nLnNwbGl0KFwiL1wiKTtcbiAgICAgICAgICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHBhcnRzWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgdmFyIG1vbnRoID0gcGFyc2VJbnQocGFydHNbMV0sIDEwKTtcbiAgICAgICAgICAgICAgICB2YXIgZGF5ID0gcGFyc2VJbnQocGFydHNbMl0sIDEwKTtcblxuICAgICAgICAgICAgICAgIGlmKHllYXIgPCAxMDAwIHx8IHllYXIgPiAzMDAwIHx8IG1vbnRoID09PSAwIHx8IG1vbnRoID4gMTIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBtb250aExlbmd0aCA9IFsgMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMSBdO1xuXG4gICAgICAgICAgICAgICAgLy8gQWRqdXN0IGZvciBsZWFwIHllYXJzXG4gICAgICAgICAgICAgICAgaWYoeWVhciAlIDQwMCA9PT0gMCB8fCAoeWVhciAlIDEwMCAhPT0gMCAmJiB5ZWFyICUgNCA9PT0gMCkpXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoTGVuZ3RoWzFdID0gMjk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF5ID4gMCAmJiBkYXkgPD0gbW9udGhMZW5ndGhbbW9udGggLSAxXTsgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWxpZGF0ZVVSTDogZnVuY3Rpb24odXJsKXtcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSAvXihodHRwcz86XFwvXFwvKT8oW1xcZGEtelxcLi1dKylcXC4oW2EtelxcLl17Miw2fSkoW1xcL1xcdyBcXC4tXSopKlxcLz8kL2dpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZS50ZXN0KHVybCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsaWRhdGVDb21tYVNlcGFyYXRlZFVSTHM6IGZ1bmN0aW9uKHVybHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSAvXigoaHR0cHM/OlxcL1xcLyk/KFtcXGRhLXpcXC4tXSspXFwuKFthLXpcXC5dezIsNn0pKFtcXC9cXHcgXFwuLV0qKSpcXC8/KShcXHMqLFxccyooKGh0dHBzPzpcXC9cXC8pPyhbXFxkYS16XFwuLV0rKVxcLihbYS16XFwuXXsyLDZ9KShbXFwvXFx3IFxcLi1dKikqXFwvPykpKiQvZ2k7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlLnRlc3QodXJscykgICAgXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHZhbGlkYXRlU2x1ZzogZnVuY3Rpb24oc2x1Zyl7XG4gICAgICAgICAgICAgICAgdmFyIHJlID0gL15bYS16MC05LV0rJC87XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlLnRlc3Qoc2x1Zyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFsaWRhdGVJUDogZnVuY3Rpb24oaXApe1xuICAgICAgICAgICAgICAgIHZhciByZSA9IC9eKD86KD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLil7M30oPzoyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pJC87XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlLnRlc3QoaXApO1xuICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgIH1cblxuICAgIH1cblxufSIsImltcG9ydCB7VXRpbGl0aWVzfSBmcm9tICcuL0Jhc2VsaW5lLlV0aWxpdGllcyc7XG5cbmNsYXNzIEJhc2VsaW5lIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLlV0aWxpdGllcyA9IFV0aWxpdGllcztcbiAgICB9XG59XG5cbmdsb2JhbC5CYXNlbGluZSA9IG5ldyBCYXNlbGluZSgpOyJdfQ==
