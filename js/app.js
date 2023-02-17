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
    this.hourlyTotals = Array(12).fill(0); // initialize here

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

      // update hourlyTotals for all stores
      this.hourlyTotals[i] += this.hourlyCookies[i];
    }
  }

  //Table Render
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
  //Total Render
  static renderTotals() {

    // create table
    let title = document.createElement('h2');
    title.textContent = 'Hourly and Overall Sales Totals for All Stores';
    document.body.appendChild(title);

    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    let header1 = document.createElement('th');
    header1.textContent = 'Hour';
    headerRow.appendChild(header1);

    for (let i = 0; i < 12; i++) {
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

    let hourlyTotals = Array(12).fill(0);
    for (const store of Store.stores) {
      for (let i = 0; i < 12; i++) {
        hourlyTotals[i] += store.hourlyTotals[i];
      }
    }

    let total = 0;
    for (let i = 0; i < 12; i++) {
      let data = document.createElement('td');
      data.textContent = hourlyTotals[i];
      dataRow.appendChild(data);
      total += hourlyTotals[i];
    }

    let totalData = document.createElement('td');
    totalData.textContent = total;
    dataRow.appendChild(totalData);

    table.appendChild(dataRow);

    document.body.appendChild(table);
  }
}

// add event listener for form submission
document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission behavior

  // get the form data
  const name = event.target.name.value;
  const minCustomers = Number(event.target['min-customers'].value);
  const maxCustomers = Number(event.target['max-customers'].value);
  const avgCookies = Number(event.target['avg-cookies'].value);

  // create a new store instance
  const newStore = new Store(name, minCustomers, maxCustomers, avgCookies);

  // add the new store to the stores array
  Store.stores.push(newStore);

  // keep form
  event.preventDefault();

  // re-render the tables
  document.body.innerHTML = '';
  for (const store of Store.stores) {
    store.simulateSales();
    store.render();
  }

  // render totals table
  Store.renderTotals();
});

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


