function buildChart(num) {
    var myData = [{x:0,y:0},{x:num,y:num}] // ,{x:2,y:1},{x:3,y:3}];
    var ctx = document.getElementById('grid').getContext('2d');
    var icon = new Image();
    icon.src = './flatcoin.png';
    gradient = ctx.createLinearGradient(0, 0, 0, 450);
    gradient.addColorStop(0, 'rgba(0, 0, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.25)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Current Value',
            backgroundColor: gradient, //'rgb(89, 89, 89, 0.1);',
            borderColor: 'white',
            data: [myData[0]],
            lineTension: 0,
            pointStyle: []
        }]
    },
    options: {
        legend: {  // turn off the dataset label
            display: false
        },
        tooltips: {
            enabled: false
        },
        animation: {
            easing: 'linear',
            duration: num * 1000
        },
        scales: {
        xAxes: [{
            type: 'linear',
            ticks: {
                min: 0,
                max: 15,
                display: false
            },
            gridLines: {
                color: 'white',
                display: false
            }
        }],
        yAxes: [{
            ticks: {
                min: 0,
                max: 15,
                display: false
            },
            gridLines: {
                color: 'white',
                display: false
            }
        }]
        }
    }
    });

    var next = function() {
        var data = myChart.data.datasets[0].data;
        var count = data.length;
        data[count] = data[count - 1];
        myChart.update({duration: 0});
        data[count] = myData[count];
        myChart.data.datasets[0].pointStyle[1] = icon;
        myChart.update();
        // if (count < myData.length) {
        //     setTimeout(next, 0);
        // }
    }
    setTimeout(next, 0);
}

// chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'bar',

//     // The data for our dataset
//     data: {
//         labels: ['bet'],
//         datasets: [{
//             barPercentage: 0.5,
//             barThickness: 2,
//             maxBarThickness: 2,
//             minBarLength: 2,
//             data: [45]
//         }]
//         // datasets: [{
//         //     label: 'My First dataset',
//         //     backgroundColor: 'green',
//         //     borderColor: 'blue',
//         //     data: [0, 45]
//         // }]
//     },

//     // Configuration options go here
//     options: { animation: { duration: 10000 } }
// })

// function buildChart(num) {
//     var ctx = document.getElementById('grid').getContext('2d');
//     chart = new Chart(ctx, {
//         // // The type of chart we want to create
//         // type: 'line',
    
//         // // The data for our dataset
//         // data: {
//         //     labels: ['bet'],
//         //     // datasets: [{
//         //     //     barPercentage: 0.1,
//         //     //     barThickness: 2,
//         //     //     maxBarThickness: 2,
//         //     //     minBarLength: 2,
//         //     //     data: [num]
//         //     // }]
//         //     datasets: [{
//         //         label: 'My First dataset',
//         //         backgroundColor: 'rgb(89, 89, 89, 0.1);',
//         //         borderColor: 'white',
//         //         pointStyle: 'rectRot',
//         //         data: [0, num, 25, 40, 100]
//         //     }]
//         // },
    
//         // // Configuration options go here
//         // options: { responsive: true,
//         //            animation: {
//         //                 easing: 'easeOutQuart', 
//         //                 duration: 10000,
//         //            },
//         //            layout: {color: 'white'},
//         //            scales: {
//         //                 xAxes: [{ 
//         //                     gridLines: {
//         //                         color: 'white',
//         //                     },
//         //                     ticks: {
//         //                         fontColor: "white", // this here
//         //                     },
//         //                 }],
//         //                 yAxes: [{
//         //                     gridLines: {
//         //                         color: 'white',
//         //                     },
//         //                     ticks: {
//         //                         fontColor: "white"
//         //                     }
//         //                     // display: false,
//         //                     // gridLines: {
//         //                     //     display: false,
//         //                     // },
//         //                 }],
//         //             } 
//         //     }
//     });
// }