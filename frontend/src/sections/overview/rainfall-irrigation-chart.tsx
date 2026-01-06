import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function RainfallIrrigationChart({ title, subheader, chart, sx, ...other }: Props) {
  const theme = useTheme();

  const chartColors = [
    hexAlpha(theme.palette.info.main, 0.9),
    hexAlpha(theme.palette.success.main, 0.9),
  ];

  const chartOptions = useChart({
    colors: chartColors,
    chart: { stacked: true },
    stroke: { width: 0 },
    xaxis: { categories: chart.categories },
    legend: { show: true, position: 'top', horizontalAlign: 'right' },
    tooltip: {
      y: {
        formatter: (value: number) => `${value} mm`,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
        borderRadius: 4,
      },
    },
    ...chart.options,
  });

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="bar"
        series={chart.series}
        options={chartOptions}
        slotProps={{ loading: { p: 2.5 } }}
        sx={{
          pl: 1,
          py: 2.5,
          pr: 2.5,
          height: 364,
        }}
      />
    </Card>
  );
}