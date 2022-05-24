'use strict';
const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

const displayUI = function (data, className = '') {
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
        <p class="country__row"><span>💰</span>${data.currencies[0].name} ${data.currencies[0].symbol}</p>
      </div>
    </article>
  </div>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
