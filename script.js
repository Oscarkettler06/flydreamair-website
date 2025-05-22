//membership code
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
  const tier = getCookie("membershipTier");
  let greeting;
  if (tier === "Regular") {
    greeting = "Welcome Regular member! Want to upgrade to Deluxe? Just select it below.";
  } else if (tier === "Deluxe") {
    greeting = "Welcome Deluxe member! Enjoy your premium benefits.";
  } else {
    greeting = "No Membership with RyanAir? You can fix that here";
  }
  document.getElementById("greeting").innerText = greeting;
}

// Update which radio button is selected
function updateRadioSelection() {
  const tier = getCookie("membershipTier");
  document.getElementById("Deluxe").checked = tier === "Deluxe";
  document.getElementById("Regular").checked = tier === "Regular";
}

// Handle membership form submission
function handleMemberFormSubmit(e) {
  e.preventDefault();
  const tierInput = document.querySelector('input[name="MemberTier"]:checked');
  const tier = tierInput ? tierInput.value : "";

  if (tier) {
    setCookie("membershipTier", tier, 7);
    document.getElementById("status").innerText = `Membership tier '${tier}' saved!`;
  } else {
    setCookie("membershipTier", "", -1);
    document.getElementById("status").innerText = "Membership cleared.";
  }

  updateGreeting();
  updateRadioSelection();
}

// Handle cancel membership button
function handleCancelMembership() {
  const confirmCancel = window.confirm("Are you sure you want to cancel your membership?");
  if (confirmCancel) {
    setCookie("membershipTier", "", -1); 
    document.getElementById("status").innerText = "Membership cleared.";
    updateGreeting();
    updateRadioSelection();
  } else {
    document.getElementById("status").innerText = "Membership cancellation aborted.";
  }
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



function initializeMembershipPage() {
    populateProfileFromCookies();
    updateGreeting();
    updateRadioSelection();
    document.getElementById("MemberForm").onsubmit = handleMemberFormSubmit;
    document.getElementById("Cancel").addEventListener('click', handleCancelMembership);
    document.getElementById("edit-profile").addEventListener('click', handleUpdateProfile);
}

// Run initialization after DOM is loaded
window.onload = initializeMembershipPage;