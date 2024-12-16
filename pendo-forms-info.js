const dealForm = document.getElementById('dealForm');
const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', function(event) {
  event.preventDefault(); 
  const formData = new FormData(dealForm);

  const dealId = formData.get('dealId'); 
  const dealName = formData.get('dealName');
  const contact = formData.get('contact');
  const date = formData.get('date');
  const status = formData.get('status'); 

  pendo.track("Deal Submitted", {
    dealId: dealId,
    dealName: dealName,
    contact: contact,
    date: date,
    status: status,
  });

});