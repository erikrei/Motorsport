const results = document.querySelectorAll('article');
setMinAndMaxPrices(results);

const inputs = document.getElementsByClassName('input-event');

for (const input of inputs) {
    input.addEventListener('input', () => {
        const modell = document.getElementById('modell').value.toLowerCase();
        const farbe = document.getElementById('farbe').value;
        const preisVon = document.getElementById('preisspanne-von').value;
        const preisBis = document.getElementById('preisspanne-bis').value;

        resetDisplay();

        if (preisVon && preisBis) {
            for (const result of results) {
                const preis = getPriceOfElement(result.querySelector('p.preis'));
                if (preis < preisVon || preis > preisBis) {
                    result.classList.add('d-none');
                }
            }
        }

        if (farbe) {
            for(const result of results) {
                const farben = result.querySelectorAll('.farben-content > div');
                let farbenArr = [];
                for(const currFarbe of farben) {
                    farbenArr.push(currFarbe.getAttribute('class'));
                }
                if (!farbenArr.includes(farbe)) result.classList.add('d-none');
            }
        }

        if (modell) {
            for(const result of results) {
                const modellName = result.querySelector('h2').textContent.toLowerCase();
                if (!modellName.includes(modell)) result.classList.add('d-none');
            }
        }

        const displayNone = document.querySelectorAll('article.d-none').length;
        if (displayNone === results.length) {
            document.querySelector('p.error').classList.remove('d-none');
        } else {
            document.querySelector('p.error').classList.add('d-none');
        }
    })
}


function setMinAndMaxPrices(results) {
    const minInput = document.getElementById('preisspanne-von');
    const maxInput = document.getElementById('preisspanne-bis');
    let prices = [];
    for (const result of results) {
        const priceString = result.querySelector('p.preis');
        const price = getPriceOfElement(priceString);
        prices.push(price);
    }
    prices = prices.sort((a, b) => a - b);
    minInput.value = prices[0];
    maxInput.value = prices[prices.length - 1];
}

function getPriceOfElement(element) {
    return Number(element.textContent.replace('€', ''));
}

function resetDisplay() {
    for(const result of results) {
        result.classList.remove('d-none');
    }
}