// Set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

// Get a cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
}

// Populate user profile fields from cookies
function populateProfileFromCookies() {
  const firstName = getCookie("firstName") || "Not set";
  const surname = getCookie("surname") || "Not set";
  const email = getCookie("email") || "Not set";
  const phone = getCookie("phone") || "Not set";
  const membership = getCookie("membershipTier") || "None";

  document.getElementById("firstName").innerText = firstName;
  document.getElementById("surname").innerText = surname;
  document.getElementById("email").innerText = email;
  document.getElementById("phone").innerText = phone;
  document.getElementById("membershipTier").innerText = membership;

  // Update welcome text
  document.getElementById("welcome-text").innerText = `Hello! ${firstName} ${surname}`;
}

// Edit profile handler
function handleUpdateProfile(e) {
  e.preventDefault();
  const firstName = prompt("First Name:", getCookie("firstName") || "");
  const surname = prompt("Surname:", getCookie("surname") || "");
  const email = prompt("Email:", getCookie("email") || "");
  const phone = prompt("Phone:", getCookie("phone") || "");

  if (firstName !== null) setCookie("firstName", firstName, 7);
  if (surname !== null) setCookie("surname", surname, 7);
  if (email !== null) setCookie("email", email, 7);
  if (phone !== null) setCookie("phone", phone, 7);

  populateProfileFromCookies();
}

// Initialize the page and event listeners
function initializeMembershipPage() {
  populateProfileFromCookies();
  document.getElementById("edit-profile").addEventListener('click', handleUpdateProfile);
}

// Run initialization after DOM is loaded
window.onload = initializeMembershipPage;
