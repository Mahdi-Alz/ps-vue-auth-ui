export function isNameValid(name) {
  return /^[A-Za-z\s]{2,50}$/.test(name.trim()) ? "" : "Invalid Name";
}

export function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Invalid email";
}

export function isPhoneValid(phone) {
  return /^09\d{9}$/.test(phone) ? "" : "Invalid Phone Number";
}

export function isPasswordValid(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/.test(password)
    ? ""
    : "Must contain 9+ chars, uppercase, lowercase and number";
}

export function isIdentifierValid(identifier) {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const isPhone = /^09\d{9}$/.test(identifier);
  return isEmail || isPhone ? "" : "Enter a valid email or phone number";
}
