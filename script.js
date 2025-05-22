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

// PROFILE PAGE LOGIC
function populateProfileFromCookies() {
  const firstName = getCookie("firstName") || "Not set";
  const surname = getCookie("surname") || "Not set";
  const email = getCookie("email") || "Not set";
  const phone = getCookie("phone") || "Not set";
  const membership = getCookie("membershipTier") || "None";

  if (document.getElementById("firstName")) document.getElementById("firstName").innerText = firstName;
  if (document.getElementById("surname")) document.getElementById("surname").innerText = surname;
  if (document.getElementById("email")) document.getElementById("email").innerText = email;
  if (document.getElementById("phone")) document.getElementById("phone").innerText = phone;
  if (document.getElementById("membershipTier")) document.getElementById("membershipTier").innerText = membership;
  if (document.getElementById("welcome-text")) document.getElementById("welcome-text").innerText = `Hello! ${firstName} ${surname}`;
}

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

// MEMBERSHIP PAGE LOGIC
function updateGreeting() {
  const tier = getCookie("membershipTier");
  let greeting;
  if (tier === "Regular") {
    greeting = "Welcome Regular member! Want to upgrade to Deluxe? Just select it below.";
  } else if (tier === "Deluxe") {
    greeting = "Welcome Deluxe member! Enjoy your premium benefits.";
  } else {
    greeting = "No Membership with FlyDreamAir? You can fix that here";
  }
  if (document.getElementById("greeting")) document.getElementById("greeting").innerText = greeting;
}

function updateRadioSelection() {
  const tier = getCookie("membershipTier");
  if (document.getElementById("Deluxe")) document.getElementById("Deluxe").checked = tier === "Deluxe";
  if (document.getElementById("Regular")) document.getElementById("Regular").checked = tier === "Regular";
}

function handleMemberFormSubmit(e) {
  e.preventDefault();
  const tierInput = document.querySelector('input[name="MemberTier"]:checked');
  const tier = tierInput ? tierInput.value : "";

  if (tier) {
    setCookie("membershipTier", tier, 7);
    if (document.getElementById("status")) document.getElementById("status").innerText = `Membership tier '${tier}' saved!`;
  } else {
    setCookie("membershipTier", "", -1);
    if (document.getElementById("status")) document.getElementById("status").innerText = "Membership cleared.";
  }

  updateGreeting();
  updateRadioSelection();
}

function handleCancelMembership() {
  const confirmCancel = window.confirm("Are you sure you want to cancel your membership?");
  if (confirmCancel) {
    setCookie("membershipTier", "", -1); 
    if (document.getElementById("status")) document.getElementById("status").innerText = "Membership cleared.";
    updateGreeting();
    updateRadioSelection();
  } else {
    if (document.getElementById("status")) document.getElementById("status").innerText = "Membership cancellation aborted.";
  }
}

// UNIVERSAL INITIALIZER
window.onload = function() {
  // Profile page
  if (document.getElementById("firstName")) {
    populateProfileFromCookies();
    const editBtn = document.getElementById("edit-profile");
    if (editBtn) editBtn.addEventListener('click', handleUpdateProfile);
  }
  // Membership page
  if (document.getElementById("MemberForm")) {
    updateGreeting();
    updateRadioSelection();
    document.getElementById("MemberForm").onsubmit = handleMemberFormSubmit;
    const cancelBtn = document.getElementById("Cancel");
    if (cancelBtn) cancelBtn.addEventListener('click', handleCancelMembership);
  }
};

