class Store {
  constructor(name, minCustomers, maxCustomers, avgCookies) {
    this.name = name;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookies = avgCookies;
    this.cookiesSold = Array(12).fill(0);
    this.hourlyCustomers = [];
    this.hourlyCookies = [];
    this.totalCookies = 0;

    for (let i = 6; i <= 19; i++) {
      this.hourlyCustomers.push(0);
      this.hourlyCookies.push(0);
    }
  }

  randomCustomers() {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  }

  simulateSales() {
    for (let i = 0; i < 12; i++) {
      this.hourlyCustomers[i] = this.randomCustomers();
      this.hourlyCookies[i] = Math.round(this.hourlyCustomers[i] * this.avgCookies);
      this.cookiesSold[i] += this.hourlyCookies[i];
      this.totalCookies += this.hourlyCookies[i];
    }
  }
  //old Render
  render() {
    let title = document.createElement('h2');
    title.textContent = this.name;
    document.body.appendChild(title);

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    let header1 = document.createElement('th');
    header1.textContent = 'Hour';
    headerRow.appendChild(header1);

    for (let i = 0; i < this.cookiesSold.length; i++) {
      let header = document.createElement('th');
      header.textContent = `Hour ${i + 1}`;
      headerRow.appendChild(header);
    }

    let totalHeader = document.createElement('th');
    totalHeader.textContent = 'Total';
    headerRow.appendChild(totalHeader);

    table.appendChild(headerRow);

    let dataRow = document.createElement('tr');
    let dataHeader = document.createElement('td');
    dataHeader.textContent = 'Cookies Sold';
    dataRow.appendChild(dataHeader);

    let total = 0;
    for (let i = 0; i < this.cookiesSold.length; i++) {
      let data = document.createElement('td');
      data.textContent = this.cookiesSold[i];
      dataRow.appendChild(data);
      total += this.cookiesSold[i];
    }

    let totalData = document.createElement('td');
    totalData.textContent = total;
    dataRow.appendChild(totalData);

    table.appendChild(dataRow);

    document.body.appendChild(table);
  }

  // new function to render totals table
  static renderTotals() {

    function createCookieStand(name, minCustomers, maxCustomers, avgCookies) {
      // create new store instance
      const newStore = new Store(name, minCustomers, maxCustomers, avgCookies);

      // simulate sales and render table
      newStore.simulateSales();
      newStore.render();

      // render totals table
      Store.renderTotals();
    }

    const newCookieStandForm = document.getElementById('new-cookie-stand-form');

    newCookieStandForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting by default

      // Get the form input values and call the createCookieStand function with them
      const name = document.getElementById('name').value;
      const minCustomers = parseInt(document.getElementById('min-customers').value);
      const maxCustomers = parseInt(document.getElementById('max-customers').value);
      const avgCookies = parseFloat(document.getElementById('avg-cookies').value);

      createCookieStand(name, minCustomers, maxCustomers, avgCookies);

      // Clear the form inputs after creating a new cookie stand
      newCookieStandForm.reset();
    });
    // calculate hourly totals
    const hourlyTotals = Array(12).fill(0);
    for (const store of Store.stores) {
      for (let i = 0; i < store.cookiesSold.length; i++) {
        hourlyTotals[i] += store.cookiesSold[i];
      }
    }

    // calculate overall total
    const overallTotal = hourlyTotals.reduce((acc, cur) => acc + cur);

    // create table
    let title = document.createElement('h2');
    title.textContent = 'Hourly and Overall Sales Totals for All Stores';
    document.body.appendChild(title);

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    let header1 = document.createElement('th');
    header1.textContent = 'Hour';
    headerRow.appendChild(header1);

    for (let i = 0; i < hourlyTotals.length; i++) {
      let header = document.createElement('th');
      header.textContent = `Hour ${i + 1}`;
      headerRow.appendChild(header);
    }

    let totalHeader = document.createElement('th');
    totalHeader.textContent = 'Total';
    headerRow.appendChild(totalHeader);

    table.appendChild(headerRow);

    let dataRow1 = document.createElement('tr');
    let dataHeader1 = document.createElement('td');
    dataHeader1.textContent = 'Hourly Sales';
    dataRow1.appendChild(dataHeader1);

    let hourlyTotal = 0;
    for (let i = 0; i < hourlyTotals.length; i++) {
      let data = document.createElement('td');
      data.textContent = hourlyTotals[i];
      dataRow1.appendChild(data);
      hourlyTotal += hourlyTotals[i];
    }

    let hourlyTotalData = document.createElement('td');
    hourlyTotalData.textContent = hourlyTotal;
    dataRow1.appendChild(hourlyTotalData);

    table.appendChild(dataRow1);

    let dataRow2 = document.createElement('tr');
    let dataHeader2 = document.createElement('td');
    dataHeader2.textContent = 'Overall Sales';
    dataRow2.appendChild(dataHeader2);

    let overallTotalData = document.createElement('td');
    overallTotalData.colSpan = hourlyTotals.length + 1;
    overallTotalData.textContent = overallTotal;
    dataRow2.appendChild(overallTotalData);

    table.appendChild(dataRow2);

    document.body.appendChild(table);
  }
}

// create store instances
let Seattle = new Store('Seattle', 23, 65, 6.3);
let Tokyo = new Store('Tokyo', 3, 24, 1.2);
let Dubai = new Store('Dubai', 11, 38, 3.7);
let Paris = new Store('Paris', 20, 38, 2.3);
let Lima = new Store('Lima', 2, 16, 4.6);

// simulate sales and render tables
Store.stores = [Seattle, Tokyo, Dubai, Paris, Lima];
for (const store of Store.stores) {
  store.simulateSales();
  store.render();
}

Store.renderTotals();
