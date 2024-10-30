const dataTable = document.getElementById('dataTable');


dataTable.addEventListener('click', function(event) {
  const cell = event.target.closest('td');

  if (cell) {
    const row = cell.parentNode;

    const cells = row.querySelectorAll('td');

    const name = cells[0].textContent;
    const position = cells[1].textContent;
    const office = cells[2].textContent;
    const age = cells[3].textContent;
    const startDate = cells[4].textContent;
    const salary = cells[5].textContent;

    alert(`Name: ${name}\nPosition: ${position}\nOffice: ${office}\nAge: ${age}\nStart date: ${startDate}\nSalary: ${salary}`);

    pendo.track("Table Data Clicked", {
      visitorId: window.visitorId,
      accountId: window.accountId, 
      name: name,
      position: position,
      office: office,
      age: age,
      startDate: startDate,
      salary: salary
    });
  }
});