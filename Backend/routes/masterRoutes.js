// this master route is for fetching the final response data and downloading the pdf
const express = require("express");

const { getFinalResponseData, downloadFinalResponsePdf } = require("../controllers/masteragent");
const router = express.Router(); // express router is used 

// This route gets the UI
router.get("/:id/data", getFinalResponseData);

// this route is used for  do JSON data for thewnloading  PDF file
router.get("/:id/download", downloadFinalResponsePdf);

module.exports = router;