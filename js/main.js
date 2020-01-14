import { localMarkets, amount, distanceToCities, costFixLoadTruck, costPerKm, lostPercent, lostKms}  from "../data/data.js";

// Calculo del beneficio producto/ciudad
const profitProduct = (amount, product) => amount * product

// A cada mercado local se le añade la propiedad del benecio "bruto" de cada producto
const localMarketsWithprofit = localMarkets.filter( localMarket => {
    if (localMarket.product === "Vieiras") {
            localMarket.markets = localMarket.markets.map( market => {
            return {
                profit: profitProduct(amount.vieira, market.price),
                ...market
            };
        });
    } else if (localMarket.product === "Pulpo") {
        localMarket.markets = localMarket.markets.map( market => {
            return {
                profit: profitProduct(amount.pulpo, market.price),
                ...market
            };
        });
    } else if (localMarket.product === "Centollo") {
        localMarket.markets = localMarket.markets.map( market => {
            return {
                profit: profitProduct(amount.centollo, market.price),
                ...market
            };
        });
    }
    return localMarkets;
});

// Calculo de pérdida valor de compra por kilómetro.
const lostShell = (lostPercent, lostKms, distance) => {
    let lostShell = lostPercent * lostKms * distance;
    return lostShell;
}

// Calculo de pérdida valor por transporte
const calculateTransportToCity = (fixedCost, costPerKm, distance) => {
    let costTransport = fixedCost + costPerKm * distance;
    return costTransport;
}

// Cálculo del beneficio bruto por ciudad
const calculateprofitPerCity = (localMarketsWithprofit,city) => {
    let cityMarket = localMarketsWithprofit.map(localMarket => localMarket.markets.filter(market => market.city === city));
    let mergedCityMadrid = [].concat.apply([], cityMarket);
    let profitCity = mergedCityMadrid.reduce((sum, value) => ( sum + value.profit ), 0);
    return profitCity;
}

// Cálculo del beneficio neto de cada ciudad
const calculateNetProfit = (localMarketsWithprofit, distanceToCity,costFixLoadTruck, costPerKm, lostPercent, lostKms ) => {
    let netProfit = calculateprofitPerCity(localMarketsWithprofit, distanceToCity.city) 
                    - calculateTransportToCity(costFixLoadTruck, costPerKm, distanceToCity.distance) 
                    - lostShell(lostPercent, lostKms, distanceToCity.distance);
    return netProfit;
}

// Cálculo del beneficio neto de las ciudades
const profitPerCity = (localMarketsWithprofit, distanceToCities) => {
    let profitByCity = distanceToCities.map( distanceToCity => {
        return {
          cityProfit:  calculateNetProfit(localMarketsWithprofit, distanceToCity,costFixLoadTruck, costPerKm, lostPercent, lostKms ),
          city: distanceToCity.city
        };
      });
    
    return profitByCity;
}

// Cálculo de la ciudad con mayor beneficio
const cityWinner =  profitPerCity(localMarketsWithprofit, distanceToCities).reduce((accum, cityCandidate) => {
    if(cityCandidate.cityProfit > accum.cityProfit)
        return cityCandidate;
        return accum;
  });


// Mostrar en pantalla
const showSolution = () => {
    const el = document.querySelector('.solution');
    el.innerHTML = cityWinner.city;
}

showSolution();
