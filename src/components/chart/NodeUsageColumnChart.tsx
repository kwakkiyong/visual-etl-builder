import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function NodeUsageColumnChart() {
    const options: Highcharts.Options = {
        accessibility: {
            enabled: false,
        },
        chart: { type: 'column' },
        title: { text: '노드 사용 통계' },
        xAxis: {
            categories: ['Source-File', 'Source-DB', 'Filter', 'Map', 'Load-File', 'Load-DB'],
        },
        series: [
            {
                type: 'column',
                name: '사용 횟수',
                data: [12, 5, 20, 17, 8, 14],
            },
        ],
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
}