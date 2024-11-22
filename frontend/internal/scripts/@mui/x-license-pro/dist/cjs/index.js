"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./generateLicense-c091cf37.js"),t=require("@material-ui/utils");function r(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var i=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var i,n=r(require("react"));t.ponyfillGlobal.__MUI_LICENSE_INFO__=t.ponyfillGlobal.__MUI_LICENSE_INFO__||{key:void 0,releaseInfo:void 0};class s{static getKey(){return t.ponyfillGlobal.__MUI_LICENSE_INFO__.key}static getReleaseInfo(){return t.ponyfillGlobal.__MUI_LICENSE_INFO__.releaseInfo}static setLicenseKey(e){t.ponyfillGlobal.__MUI_LICENSE_INFO__.key=e}static setReleaseInfo(e){t.ponyfillGlobal.__MUI_LICENSE_INFO__.releaseInfo=e}}function o(e){console.error(["************************************************************","*************************************************************","",...e,"","*************************************************************","*************************************************************"].join("\n"))}function a(){o(["Material-UI X: Invalid license.","","Your license for Material-UI X is not valid, please visit","https://material-ui.com/r/x-license to get a valid license."])}function l(){o(["Material-UI X: License key not found.","","This is a trial-only version of Material-UI X.","While all the features are unlocked, it is not licensed for","development use on projects intended for production.","","To purchase a license, please visit","https://material-ui.com/r/x-license to get a valid license."])}function c(){o(["Material-UI X: License key expired.","","Please visit https://material-ui.com/r/x-license to renew","your subscription and get the latest version of Material-UI X."])}exports.LicenseStatus=void 0,(i=exports.LicenseStatus||(exports.LicenseStatus={})).NotFound="NotFound",i.Invalid="Invalid",i.Expired="Expired",i.Valid="Valid";const u=/^.*EXPIRY=([0-9]+),.*$/;function p(t,r){if(!t)throw new Error("Material-UI: The release information is missing. Not able to validate license.");if(!r)return exports.LicenseStatus.NotFound;const i=r.substr(0,32),n=r.substr(32);if(i!==e.md5(n))return exports.LicenseStatus.Invalid;const s=e.base64Decode(n);let o=0;try{if(o=parseInt(s.match(u)[1],10),!o||Number.isNaN(o))return console.error("Error checking license. Expiry timestamp not found or invalid!"),exports.LicenseStatus.Invalid}catch(e){return console.error("Error extracting license expiry timestamp.",e),exports.LicenseStatus.Invalid}const a=parseInt(e.base64Decode(t),10);if(Number.isNaN(a))throw new Error("Material-UI: The release information is invalid. Not able to validate license.");return o<a?exports.LicenseStatus.Expired:exports.LicenseStatus.Valid}exports.generateLicence=e.generateLicence,exports.LicenseInfo=s,exports.generateReleaseInfo=function(){const t=new Date;return t.setHours(0,0,0,0),e.base64Encode(t.getTime().toString())},exports.showExpiredLicenseError=c,exports.showInvalidLicenseError=a,exports.showNotFoundLicenseError=l,exports.useLicenseVerifier=function(){return LicenseStatus.Valid;},exports.verifyLicense=function(){return LicenseStatus.Valid;};