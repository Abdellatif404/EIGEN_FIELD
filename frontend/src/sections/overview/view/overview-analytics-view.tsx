import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { YieldGauge } from '../yield-gauge';
import { AIRecommendations } from '../ai-recommendations';
import { SoilHealthHeatmap } from '../soil-health-heatmap';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { RainfallIrrigationChart } from '../rainfall-irrigation-chart';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';


// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={4}>

        {/* ============================================================ */}
        {/* ROW 1: KPI CARDS */}
        {/* ============================================================ */}

		<Grid size={{ xs: 12, sm: 6, md: 3 }}>
		<AnalyticsWidgetSummary
			title="Current Yield"
			percent={5.2}
			total={2847}
			color="info"
			unit="tons"
			icon={
			<Box
				sx={{
				width: 48,
				height: 48,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				background: (theme) => `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${theme.palette.info.dark} 100%)`,
				}}
			>
				<Iconify icon={"solar:chart-2-bold-duotone" as any} width={28} sx={{ color: 'white' }} />
			</Box>
			}
			chart={{
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			series: [180, 220, 350, 420, 580, 650, 720, 2847],
			}}
		/>
		</Grid>

		<Grid size={{ xs: 12, sm: 6, md: 3 }}>
		<AnalyticsWidgetSummary
			title="Target Yield"
			percent={-2.3}
			total={3200}
			color="success"
			unit="tons"
			icon={
			<Box
				sx={{
				width: 48,
				height: 48,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				background: (theme) => `linear-gradient(135deg, ${theme.palette.success.light} 0%, ${theme.palette.success.dark} 100%)`,
				}}
			>
				<Iconify icon={"mdi:bullseye-arrow" as any} width={28} sx={{ color: 'white' }} />
			</Box>
			}
			chart={{
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			series: [200, 250, 400, 500, 650, 750, 850, 3200],
			}}
		/>
		</Grid>

		<Grid size={{ xs: 12, sm: 6, md: 3 }}>
		<AnalyticsWidgetSummary
			title="Total Fields"
			percent={0}
			total={1250}
			color="warning"
			unit="acres"
			icon={
			<Box
				sx={{
				width: 48,
				height: 48,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				background: (theme) => `linear-gradient(135deg, ${theme.palette.warning.light} 0%, ${theme.palette.warning.dark} 100%)`,
				}}
			>
				<Iconify icon={"mdi:land-fields" as any} width={28} sx={{ color: 'white' }} />
			</Box>
			}
			chart={{
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			series: [1250, 1250, 1250, 1250, 1250, 1250, 1250, 1250],
			}}
		/>
		</Grid>

		<Grid size={{ xs: 12, sm: 6, md: 3 }}>
		<AnalyticsWidgetSummary
			title="Active Crops"
			percent={12.5}
			total={8}
			color="secondary"
			unit="types"
			icon={
			<Box
				sx={{
				width: 48,
				height: 48,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '50%',
				background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.dark} 100%)`,
				}}
			>
				<Iconify icon={"mdi:sprout" as any} width={28} sx={{ color: 'white' }} />
			</Box>
			}
			chart={{
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
			series: [5, 6, 6, 7, 7, 8, 8, 8],
			}}
		/>
		</Grid>

        {/* ============================================================ */}
        {/* ROW 2: YIELD MONITORING */}
        {/* ============================================================ */}

        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <YieldGauge
            title="Wheat Yield Progress"
            current={3.5}
            target={4.0}
            unit="t/ha"
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <AnalyticsWebsiteVisits
            title="Yield Trends"
            subheader="Historical performance by crop type"
            chart={{
              categories: ['2019', '2020', '2021', '2022', '2023', '2024'],
              series: [
                { name: 'Wheat', data: [2.8, 3.0, 3.2, 2.9, 3.5, 2.5] },
                { name: 'Corn', data: [6.5, 6.8, 7.1, 6.8, 7.5, 6.2] },
                { name: 'Soybean', data: [2.5, 2.7, 2.8, 2.6, 3.0, 2.8] },
              ],
            }}
            sx={{ width: '100%' }}
          />
        </Grid>

        {/* ============================================================ */}
        {/* ROW 3: CROP ANALYSIS */}
        {/* ============================================================ */}

        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <AnalyticsCurrentVisits
            title="Crop Distribution"
            chart={{
              series: [
                { label: 'Corn', value: 40 },
                { label: 'Wheat', value: 50 },
                { label: 'Soybean', value: 21 },
              ],
            }}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <AnalyticsConversionRates
            title="Yield Comparison"
            subheader="Your farm vs regional and national averages"
            chart={{
              categories: ['Wheat', 'Corn', 'Soybean'],
              series: [
                { name: 'Your Farm', data: [2.5, 6.2, 2.8] },
                { name: 'Regional Avg', data: [3.8, 7.5, 3.5] },
                { name: 'National Avg', data: [3.5, 7.0, 3.2] },
              ],
            }}
            sx={{ width: '100%' }}
          />
        </Grid>

        {/* ============================================================ */}
        {/* ROW 4: ENVIRONMENTAL */}
        {/* ============================================================ */}

        <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
          <AnalyticsCurrentSubject
            title="Soil Health - North Field"
            chart={{
              categories: ['pH', 'Nitrogen', 'Phosphorus', 'Potassium', 'Moisture', 'Organic'],
              series: [
                { name: 'Current', data: [60, 45, 80, 70, 50, 70] },
                { name: 'Optimal', data: [90, 80, 99, 70, 60, 60] }
              ],
            }}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <RainfallIrrigationChart
            title="Water Management"
            subheader="Last 6 months rainfall vs irrigation"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              series: [
                { name: 'Rainfall', data: [45, 30, 10, 5, 15, 25] },
                { name: 'Irrigation', data: [20, 35, 60, 70, 55, 40] },
              ],
            }}
            sx={{ width: '100%' }}
          />
        </Grid>

        {/* ============================================================ */}
        {/* ROW 5: SOIL HEALTH */}
        {/* ============================================================ */}

        <Grid size={{ xs: 12 }}>
          <SoilHealthHeatmap
            title="Soil Health Overview"
            subheader="Current status across all fields"
            data={[
              { field: 'North Field', ph: 6.2, nitrogen: 'medium', status: 'good' },
              { field: 'South Field', ph: 5.8, nitrogen: 'low', status: 'warning' },
              { field: 'East Field', ph: 7.1, nitrogen: 'high', status: 'excellent' },
              { field: 'West Field', ph: 5.2, nitrogen: 'low', status: 'critical' },
            ]}
          />
        </Grid>

        {/* ============================================================ */}
        {/* ROW 6: ACTIVITIES & AI */}
        {/* ============================================================ */}

        <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex' }}>
          <AnalyticsOrderTimeline
            title="Recent Farm Activities"
            list={[
              { id: '1', title: 'Wheat Planting - North Field', time: '2024-01-15', type: 'order1' },
              { id: '2', title: 'NPK Fertilization', time: '2024-02-10', type: 'order2' },
              { id: '3', title: 'Drip Irrigation Setup', time: '2024-03-05', type: 'order3' },
              { id: '4', title: 'Fungicide Application', time: '2024-03-20', type: 'order4' },
            ]}
            sx={{ width: '100%' }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} sx={{ display: 'flex' }}>
          <AIRecommendations
            title="AI-Powered Recommendations"
            subheader="Based on your farm data"
            recommendations={[
              {
                id: '1',
                title: 'Apply Lime to North Field',
                description: 'Soil pH of 5.8 is below optimal. Apply 2 tons/ha of lime.',
                priority: 'high',
                category: 'Soil Management',
                estimatedCost: '$1,200',
                estimatedImpact: '+0.5 t/ha',
                source: 'Wheat Guide.pdf',
              },
              {
                id: '2',
                title: 'Increase Drip Irrigation',
                description: 'Dry forecast ahead. Increase irrigation by 25%.',
                priority: 'medium',
                category: 'Water Management',
                estimatedCost: '$350',
                estimatedImpact: 'Prevent 15% loss',
                source: 'Irrigation.pdf',
              },
            ]}
            sx={{ width: '100%' }}
          />
        </Grid>



      </Grid>
    </DashboardContent>
  );
}
