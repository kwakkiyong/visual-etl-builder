import Highcharts from "highcharts"

// CEO 대시보드 스타일의 파란색 계열 테마
export function applyHighchartsTheme() {
  Highcharts.setOptions({
    colors: [
      "#4A90E2", // 메인 파란색
      "#5BA3F5", // 밝은 파란색
      "#6BB6FF", // 더 밝은 파란색
      "#7CC7FF", // 연한 파란색
      "#8DD8FF", // 매우 연한 파란색
      "#2E7CD6", // 진한 파란색
      "#1E5FA8", // 더 진한 파란색
      "#0F4A7A", // 가장 진한 파란색
      "#50C878", // 성공 색상 (초록)
      "#FF6B6B", // 실패 색상 (빨강)
    ],
    chart: {
      backgroundColor: "transparent",
      style: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
    },
    title: {
      style: {
        color: "#333333",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    subtitle: {
      style: {
        color: "#666666",
        fontSize: "12px",
      },
    },
    xAxis: {
      gridLineColor: "#E5E7EB",
      lineColor: "#D1D5DB",
      tickColor: "#D1D5DB",
      labels: {
        style: {
          color: "#6B7280",
          fontSize: "12px",
        },
      },
      title: {
        style: {
          color: "#374151",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
    },
    yAxis: {
      gridLineColor: "#E5E7EB",
      lineColor: "#D1D5DB",
      tickColor: "#D1D5DB",
      labels: {
        style: {
          color: "#6B7280",
          fontSize: "12px",
        },
      },
      title: {
        style: {
          color: "#374151",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
    },
    legend: {
      itemStyle: {
        color: "#374151",
        fontSize: "12px",
      },
      itemHoverStyle: {
        color: "#111827",
      },
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "#D1D5DB",
      borderRadius: 6,
      shadow: {
        color: "rgba(0, 0, 0, 0.1)",
        offsetX: 0,
        offsetY: 2,
        opacity: 0.1,
        width: 3,
      },
      style: {
        color: "#374151",
        fontSize: "12px",
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          style: {
            color: "#374151",
            fontSize: "11px",
            fontWeight: "500",
          },
        },
      },
      column: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 4,
      },
      bar: {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 4,
      },
      pie: {
        borderColor: "#FFFFFF",
        borderWidth: 2,
        dataLabels: {
          style: {
            color: "#374151",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
      },
      area: {
        fillOpacity: 0.3,
      },
      line: {
        lineWidth: 2,
        marker: {
          radius: 4,
          lineWidth: 2,
          lineColor: "#FFFFFF",
        },
      },
    },
  })
}

