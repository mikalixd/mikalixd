const labels1 = ["Boys 0-4 years", "Girls 0-4 years", "Boys 10-14 years", "Boys 15-19 years"]
        const data1 = {
            labels: labels1,
            datasets: [{
                // label: 'My First Dataset',
                data: [11000, 9500, 9000, 8000],
                backgroundColor: [
                    // 'rgb(255, 99, 132)',
                    // 'rgb(255, 159, 64)',
                    // 'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderColor: [
                    // 'rgb(255, 99, 132)',
                    // 'rgb(255, 159, 64)',
                    // 'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }],
        };
        const config1 = {
            type: 'bar',
            data: data1,
            options: {
                indexAxis: 'y',
                scales: {
                    // X-Axis Title
                    x: {
                        title: {
                            display: true,
                            text: "per 100,000 children",
                            font: {
                                size: 18
                            },
                            padding: 20
                        }
                    },
                    // Y-Axis Title
                    y: {
                        // Define the range of y-axis and ticks
                        suggestedMin: 0,
                        suggestedMax: 12000.0,
                        title: {
                            display: false
                        },
                        ticks: {
                            stepSize: 2000
                        }
                    }

                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Vulnerable Groups for Tai Po District',
                        font: {
                            size: 24
                        },
                        padding: 20
                    },
                    legend: {
                        display: false
                    }
                },
            }
        };
        var myChart = new Chart(
            document.getElementById('myChart1'),
            config1 
        );