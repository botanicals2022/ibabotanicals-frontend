function FormatNumber(number = "", type) {
  if (type === "phone" || type === "fax") {
    let formatted = number
      .replace(/\D+/, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    return formatted;
  } else if (type === "fein") {
    let formatted = number
      .replace(/\D+/, "")
      .replace(/(\d{2})(\d{7})/, "$1-$2");
    return formatted;
  } else {
    return "invalid type (types allowed: phone, fax, fein)";
  }
}

export default FormatNumber;
