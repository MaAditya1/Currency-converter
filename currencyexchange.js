const convertBtn = document.getElementById('convertBtn');

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');

const fromFlag = document.getElementById('fromFlag');
const toFlag = document.getElementById('toFlag');

const amount = document.getElementById('amount');

const resultDiv = document.getElementById('result');


async function fetchFlag(currencyCode, flagElement) {
    try {
        const flagURL = `https://flagcdn.com/48x36/${currencyCode.slice(0, 2).toLowerCase()}.png`; // Adjust API URL if needed
        flagElement.src = flagURL;
    } catch (error) {
        console.error('Error fetching flag:', error);
    }
}


async function getExchangeRate(fromCurr, toCurr, amountValue) {
const apiURL = `https://api.frankfurter.app/latest?amount=${amountValue}&from=${fromCurr}&to=${toCurr}`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        const conversionResult = data.rates[toCurr];

        resultDiv.textContent = `${amountValue} ${fromCurr} = ${conversionResult} ${toCurr}`;
    } catch (error) {
        resultDiv.textContent = 'Error fetching the exchange rate';
    }
    
}

convertBtn.addEventListener('click', () => {
    const fromCurrValue = fromCurrency.value;
    const toCurrValue = toCurrency.value;
    const amountValue = amount.value;

    if (amountValue === '' || isNaN(amountValue) || amountValue <= 0) {
        resultDiv.textContent = 'Please enter a valid amount';
    } else {
        getExchangeRate(fromCurrValue, toCurrValue, amountValue);
    }
});

fromCurrency.addEventListener('change', () => {
    const fromCurrValue = fromCurrency.value;
    fetchFlag(fromCurrValue, fromFlag);
});

toCurrency.addEventListener('change', () => {
    const toCurrValue = toCurrency.value;
    fetchFlag(toCurrValue, toFlag);
});

fetchFlag(fromCurrency.value, fromFlag);
fetchFlag(toCurrency.value, toFlag);