const data2 = {
    labels: [
        'Intentional',
        'Unintentional',
        'Others'
    ],
    datasets: [{
        label: 'My Second Dataset',
        data: [7, 70, 23],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};
const config2 = {
    type: 'doughnut',
    data: data2,
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Intentional & Unintentional Injury',
                font: {
                    size: 24
                },
                padding: 20
            },
            legend: {
                display: true
            }
        }
    }
};
var myChart = new Chart(
    document.getElementById('myChart2'),
    config2
);