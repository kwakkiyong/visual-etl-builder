import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function DailySuccessRateChart() {
    // 당일 작업 성공률 데이터 (예시: 87%)
    const successRate = 87;
    const totalJobs = 20;
    const successJobs = Math.round((successRate / 100) * totalJobs);
    const failedJobs = totalJobs - successJobs;

    const options: Highcharts.Options = {
        accessibility: {
            enabled: false,
        },
        chart: {
            type: 'pie',
        },
        title: {
            text: '당일 작업 성공률',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/>작업 수: <b>{point.y}</b>',
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                },
            },
        },
        series: [
            {
                name: '작업',
                type: 'pie',
                data: [
                    {
                        name: '성공',
                        y: successJobs,
                        color: '#4A90E2', // 파란색 계열
                    },
                    {
                        name: '실패',
                        y: failedJobs,
                        color: '#FF6B6B', // 빨간색 (대비를 위해)
                    },
                ],
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

