const localMarkets = [
    {
        product: "Vieiras",
        markets: [ 
            {
                city: "Madrid",
                price: 500
            },
            {
                city: "Barcelona",
                price: 450
            },
            {
                city: "Lisboa",
                price: 600
            }
        ]
    }, {   product: "Pulpo",
        markets: [ 
            {
                city: "Madrid",
                price: 0
            },
            {
                city: "Barcelona",
                price: 120
            },
            {
                city: "Lisboa",
                price: 100
            }
        ]

    }, { 
        product: "Centollo", 
        markets: [
            {
                city: "Madrid",
                price: 450
            },
            {
                city: "Barcelona",
                price: 0
            },
            {
                city: "Lisboa",
                price: 500
            }
        ],

    } 

];
   
const amount  = {
    centollo : 50,
    pulpo : 100,
    vieira : 50
}

const distanceToCities= [
    {
        city: "Madrid",
        distance: 800
    },{
        city: "Barcelona",
        distance: 1100
    },{
        city: "Lisboa",
        distance: 600
    }
];

const costFixLoadTruck = 5;
const costPerKm = 2;

const lostPercent = 0.1;
const lostKms = 100;

export {
    localMarkets,
    amount,
    distanceToCities,
    costFixLoadTruck,
    costPerKm,
    lostPercent,
    lostKms
  }