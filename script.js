//membership.html script code
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

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

function updateRadioSelection() {
  const tier = getCookie("membershipTier");
  document.getElementById("Deluxe").checked = tier === "Deluxe";
  document.getElementById("Regular").checked = tier === "Regular";
}

updateGreeting();
updateRadioSelection();

document.getElementById("MemberForm").onsubmit = function(e) {
  e.preventDefault();
  const tierInput = document.querySelector('input[name="MemberTier"]:checked');
  const tier = tierInput ? tierInput.value : "";

  // Save or clear the cookie
  if (tier) {
    setCookie("membershipTier", tier, 7);
    document.getElementById("status").innerText = `Membership tier '${tier}' saved!`;
  } else {
    setCookie("membershipTier", "", -1);
    document.getElementById("status").innerText = "Membership cleared.";
  }

  updateGreeting();
  updateRadioSelection();
};

