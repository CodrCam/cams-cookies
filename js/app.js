class Store {
  constructor(name, minCustomers, maxCustomers, avgCookies) {
    this.name = name;
    this.minCustomers = minCustomers;
    this.maxCustomers = maxCustomers;
    this.avgCookies = avgCookies;
    this.cookiesSold = [];
  }

  randomCustomers() {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  }

  simulateSales() {
    for (let i = 0; i < 12; i++) {
      let hourlyCustomers = this.randomCustomers();
      let hourlyCookies = Math.round(hourlyCustomers * this.avgCookies);
      this.cookiesSold.push(hourlyCookies);
    }
  }

  render() {
    let title = document.createElement('h2');
    title.textContent = this.name;
    document.body.appendChild(title);

    let list = document.createElement('ul');
    let total = 0;
    for (let i = 0; i < this.cookiesSold.length; i++) {
      let item = document.createElement('li');
      item.textContent = `Hour ${i + 1}: ${this.cookiesSold[i]} cookies`;
      list.appendChild(item);
      total += this.cookiesSold[i];
    }
    let totalItem = document.createElement('li');
    totalItem.textContent = `Total: ${total} cookies`;
    list.appendChild(totalItem);
    document.body.appendChild(list);
  }
}

//Function to call up the literasl
function processCities(cities) {
  for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    let store = new Store(city.name, city.minCustomers, city.maxCustomers, city.avgCookies);
    store.simulateSales();
    store.render();
  }
}

let cities = [
  { name: "Seattle", minCustomers: 23, maxCustomers: 65, avgCookies: 6.3 },
  { name: "Tokyo", minCustomers: 3, maxCustomers: 24, avgCookies: 1.2 },
  { name: "Dubai", minCustomers: 11, maxCustomers: 38, avgCookies: 3.7 },
  { name: "Paris", minCustomers: 20, maxCustomers: 38, avgCookies: 2.3 },
  { name: "Lima", minCustomers: 2, maxCustomers: 16, avgCookies: 4.6 }
];

processCities(cities);

//Create unlimited cities into page without function
/* let Seattle = new Store('Seattle', 23, 65, 6.3);
Seattle.simulateSales();
Seattle.render();

let Tokyo = new Store('Tokyo', 3, 24, 1.2);
Tokyo.simulateSales();
Tokyo.render();

let Dubai = new Store('Dubai', 11, 38, 3.7);
Dubai.simulateSales();
Dubai.render();

let Paris = new Store('Paris', 20, 38, 2.3);
Paris.simulateSales();
Paris.render();

let Lima = new Store('Lima', 2, 16, 4.6);
Lima.simulateSales();
Lima.render();
 */
