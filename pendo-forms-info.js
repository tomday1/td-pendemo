saveButton.addEventListener('click', function(event) {
  // Prevent default form submission
  event.preventDefault();

  // Now you can safely display the alert
  const formData = new FormData(dealForm);

  const dealId = formData.get('dealId'); 
  const dealName = formData.get('dealName');
  const contact = formData.get('contact');
  const date = formData.get('date');
  const status = formData.get('status'); 

  alert(`Deal ID: ${dealId}\nDeal Name: ${dealName}\nContact: ${contact}\nDate: ${date}\nStatus: ${status}`);

  // Your Pendo tracking code
  pendo.track("Deal Submitted", {
    visitorId: window.visitorId,
    accountId: window.accountId, 
    dealId: dealId,
    dealName: dealName,
    contact: contact,
    date: date,
    status: status,
  });
});