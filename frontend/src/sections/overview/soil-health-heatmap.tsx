import type { Theme } from '@mui/material/styles';
import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

// ----------------------------------------------------------------------

type FieldData = {
  field: string;
  ph: number;
  nitrogen: 'low' | 'medium' | 'high';
  status: 'critical' | 'warning' | 'good' | 'excellent';
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  data: FieldData[];
};

export function SoilHealthHeatmap({
  title,
  subheader,
  data,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const getStatusColor = (status: FieldData['status']) => {
    switch (status) {
      case 'critical':
        return {
          main: theme.palette.error.main,
          channel: theme.vars.palette.error.mainChannel,
        };
      case 'warning':
        return {
          main: theme.palette.warning.main,
          channel: theme.vars.palette.warning.mainChannel,
        };
      case 'good':
        return {
          main: theme.palette.success.light,
          channel: theme.vars.palette.success.lightChannel,
        };
      case 'excellent':
        return {
          main: theme.palette.success.main,
          channel: theme.vars.palette.success.mainChannel,
        };
      default:
        return {
          main: theme.palette.grey[500],
          channel: theme.vars.palette.grey['500Channel'],
        };
    }
  };

  const getStatusText = (status: FieldData['status']) => {
    switch (status) {
      case 'critical':
        return '🔴 Critical';
      case 'warning':
        return '⚠️ Warning';
      case 'good':
        return '✅ Good';
      case 'excellent':
        return '🌟 Excellent';
      default:
        return 'Unknown';
    }
  };

  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,
          }}
        >
          {data.map((field, index) => {
            const statusColor = getStatusColor(field.status);

            return (
              <Box
                key={index}
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  backgroundColor: varAlpha(statusColor.channel, 0.12),
                  border: `2px solid ${varAlpha(statusColor.channel, 0.24)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Box sx={{ mb: 1.5 }}>
                  <Box sx={{ typography: 'subtitle2', color: 'text.primary' }}>
                    {field.field}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
                    pH Level
                  </Box>
                  <Box
                    sx={{
                      typography: 'body2',
                      fontWeight: 600,
                      color: statusColor.main,
                    }}
                  >
                    {field.ph.toFixed(1)}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 1.5,
                  }}
                >
                  <Box sx={{ typography: 'caption', color: 'text.secondary' }}>
                    Nitrogen
                  </Box>
                  <Box
                    sx={{ typography: 'body2', textTransform: 'capitalize' }}
                  >
                    {field.nitrogen}
                  </Box>
                </Box>

                <Box
                  sx={{
                    pt: 1.5,
                    borderTop: `1px dashed ${varAlpha(
                      theme.vars.palette.grey['500Channel'],
                      0.24
                    )}`,
                  }}
                >
                  <Box
                    sx={{
                      typography: 'caption',
                      fontWeight: 600,
                      color: statusColor.main,
                    }}
                  >
                    {getStatusText(field.status)}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Card>
  );
}
