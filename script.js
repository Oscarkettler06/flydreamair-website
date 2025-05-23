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

// Update the greeting message
function updateGreeting() {
  const greetingElem = document.getElementById("greeting");
  if (!greetingElem) return;
  const tier = getCookie("membershipTier");
  let greeting;
  if (tier === "Silver") {
    greeting = "Welcome Silver member! You now have access to free lounge bookings.";
  } else if (tier === "Gold") {
    greeting = "Welcome Gold member! Enjoy your free lounge booking & premium benefits.";
  } else {
    greeting = "No Membership with RyanAir? You can fix that here";
  }
  greetingElem.innerText = greeting;
}

// Update which radio button is selected
function updateRadioSelection() {
  const tier = getCookie("membershipTier");
  const deluxeRadio = document.getElementById("Deluxe");
  const regularRadio = document.getElementById("Regular");
  if (deluxeRadio) deluxeRadio.checked = tier === "Deluxe";
  if (regularRadio) regularRadio.checked = tier === "Regular";
}

// Handle membership form submission
function handleMemberFormSubmit(e) {
  e.preventDefault();
  const tierInput = document.querySelector('input[name="MemberTier"]:checked');
  const tier = tierInput ? tierInput.value : "";

  const statusElem = document.getElementById("status");
  if (tier) {
    setCookie("membershipTier", tier, 7);
    if (statusElem) statusElem.innerText = `Membership tier '${tier}' saved!`;
  } else {
    setCookie("membershipTier", "", -1);
    if (statusElem) statusElem.innerText = "Membership cleared.";
  }

  updateGreeting();
  updateRadioSelection();
}

// Handle cancel membership button
function handleCancelMembership() {
  const confirmCancel = window.confirm("Are you sure you want to cancel your membership?");
  const statusElem = document.getElementById("status");
  if (confirmCancel) {
    setCookie("membershipTier", "", -1);
    if (statusElem) statusElem.innerText = "Membership cleared.";
    updateGreeting();
    updateRadioSelection();
  } else {
    if (statusElem) statusElem.innerText = "Membership cancellation aborted.";
  }
}

// Populate user profile fields from cookies
function populateProfileFromCookies() {
  const firstNameElem = document.getElementById("firstName");
  const surnameElem = document.getElementById("surname");
  const emailElem = document.getElementById("email");
  const phoneElem = document.getElementById("phone");
  const membershipElem = document.getElementById("membershipTier");
  const welcomeTextElem = document.getElementById("welcome-text");

  const firstName = getCookie("firstName") || "Not set";
  const surname = getCookie("surname") || "Not set";
  const email = getCookie("email") || "Not set";
  const phone = getCookie("phone") || "Not set";
  const membership = getCookie("membershipTier") || "None";

  if (firstNameElem) firstNameElem.innerText = firstName;
  if (surnameElem) surnameElem.innerText = surname;
  if (emailElem) emailElem.innerText = email;
  if (phoneElem) phoneElem.innerText = phone;
  if (membershipElem) membershipElem.innerText = membership;
  if (welcomeTextElem) welcomeTextElem.innerText = `Hello! ${firstName} ${surname}`;
}

// Edit profile handler (optional, add button as needed)
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

// Initialize membership page
function initializeMembershipPage() {
  const memberForm = document.getElementById("MemberForm");
  const cancelBtn = document.getElementById("Cancel");
  if (!memberForm) return;
  updateGreeting();
  updateRadioSelection();
  memberForm.onsubmit = handleMemberFormSubmit;
  if (cancelBtn) cancelBtn.addEventListener('click', handleCancelMembership);
}

// Initialize profile page
function initializeProfilePage() {
  if (!document.getElementById("firstName")) return;
  populateProfileFromCookies();
  // Optionally add profile edit event listener if button exists
  const editProfileBtn = document.getElementById("edit-profile");
  if (editProfileBtn) editProfileBtn.addEventListener('click', handleUpdateProfile);
}

// Run initialization after DOM is loaded
window.onload = function() {
  initializeMembershipPage();
  initializeProfilePage();
};

