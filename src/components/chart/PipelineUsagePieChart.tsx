import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function PipelineUsagePieChart() {
    const options: Highcharts.Options = {
        accessibility: {
            enabled: false,
        },
        chart: { type: 'pie' },
        title: { text: '파이프라인 실행 비중' },
        plotOptions: {
            pie: {
                innerSize: '50%', // donut
            },
        },
        series: [
            {
                type: 'pie',
                name: '실행수',
                data: [
                    ['Pipeline A', 40],
                    ['Pipeline B', 25],
                    ['Pipeline C', 20],
                    ['Pipeline D', 15],
                ],
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}