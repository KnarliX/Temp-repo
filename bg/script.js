const form = document.getElementById("paymentForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const card = document.getElementById("cardNumber").value.replace(/\s/g, "");
  const name = document.getElementById("cardName").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;

  if (card.length !== 16 || isNaN(card)) {
    msg.style.color = "red";
    msg.innerText = "Invalid card number";
    return;
  }

  if (cvv.length !== 3 || isNaN(cvv)) {
    msg.style.color = "red";
    msg.innerText = "Invalid CVV";
    return;
  }

  if (!expiry.includes("/")) {
    msg.style.color = "red";
    msg.innerText = "Invalid expiry date";
    return;
  }

  msg.style.color = "lime";
  msg.innerText = "Payment Successful (Demo)";
});
