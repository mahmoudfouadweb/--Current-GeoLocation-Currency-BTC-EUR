//use strict mode
'use strict';

// set DOM variables
const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

// display fetched data to user
const displayUI = function (data, className = '', currency, BTC) {
  let html = `
    <div class="${className}">
     <article class="country">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h3 class="country__name">${data.nativeName}</h3>
        <h4 class="country__region">${data.capital}</h4>
        <p class="country__row"><span>👫</span>${data.population}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name} ${data.currencies[0].symbol}</p>
        <p class="country__row"><span>💰</span>${currency}${data.currencies[0].symbol} ➡  1 EUR</p>
        <p class="country__row"><span>💰</span>${BTC}${data.currencies[0].symbol}  ➡ 1 BTC</p>
      </div>
    </article>
  </div>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
// get user current location based on latitude & longitude
const currentPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// get current currency based on getted user location
const whereAmI = async function () {
  try {
    // set user position
    const position = await currentPosition();
    console.log(position);
    const { latitude: lat, longitude: lng } = position.coords;

    // get current position data
    const resPosition = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    const dataPosition = await resPosition.json();
    console.log(dataPosition);

    // get current user country data
    const resCountry = await fetch(`https://restcountries.com/v2/alpha/are`);
    const dataCountry = await resCountry.json();
    console.log(dataCountry);

    // get user currency
    const resCurrency = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`
    );
    const dataCurrensy = await resCurrency.json();
    const currencyCode = dataCountry.currencies[0].code.toLowerCase();

    // exchange rate based on EUR
    const eur = dataCurrensy.eur;
    const userCurrency = eur[currencyCode];
    // get BTC prices
    const BTCRes = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json`
    );
    const BTCData = await BTCRes.json();
    // exchange rate based on BTC price to user currency
    const BTCRate = await BTCData.btc;
    const BTCToEgp = await Math.round(BTCRate[currencyCode]);
    // console.log(BTCData.btc);
    // console.log(currencyCode);
    // console.log(eur[currencyCode]);
    // console.log(BTCToEgp);

    // Display fetched data to user
    displayUI(dataCountry, 'country', userCurrency, BTCToEgp);
  } catch (err) {
    console.error(`${err} 💣💥 ${err.message}`);
  }
};
whereAmI();
//mone
//
//
//
//

// api by country name **kept as refrance
// `https://restcountries.com/v2/name/${dataPos.country}`
