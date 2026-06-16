export function isNameValid(name) {
  // at least 2 characters, letters and spaces only
  return /^[A-Za-z\s]{2,50}$/.test(name.trim());
}
export function isEmailValid(email) {
  // default email format
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isPhoneValid(phone) {
  // starts with 09 followed by 9 digits
  return /^09\d{9}$/.test(phone);
}
export function isPasswordValid(password) {
  // at least: 9 chars, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,}$/.test(password);
}
