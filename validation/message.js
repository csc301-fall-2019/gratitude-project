const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateMessageInput(data) {
  let errors = {};

  //if no input make them empty strings because the Validator library only takes in strings as input
  data.beneficiaryName = !isEmpty(data.beneficiaryName)
    ? data.beneficiaryName
    : "";
  data.recipientName = !isEmpty(data.recipientName) ? data.recipientName : "";
  data.recipientEmail = !isEmpty(data.recipientEmail)
    ? data.recipientEmail
    : "";
  data.videoURL = !isEmpty(data.videoURL) ? data.videoURL : "";

  if (Validator.isEmpty(data.beneficiaryName)) {
    errors.beneficiaryName = "Beneficiary Name is required";
  }
  if (Validator.isEmpty(data.recipientName)) {
    errors.recipientName = "Recipient Name is required";
  }
  if (Validator.isEmpty(data.recipientEmail)) {
    errors.recipientEmail = "Recipient Email is required";
  }
  if (!isEmpty(data.videoURL)) {
    if (!Validator.isURL(data.videoURL)) {
      errors.videoURL = "Not a valid Video URL";
    }
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
