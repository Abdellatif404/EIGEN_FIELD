import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

import { fNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  current: number;
  target: number;
  unit?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
};

export function YieldGauge({
  title,
  current,
  target,
  unit = 't/ha',
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const percentage = (current / target) * 100;
  const isLow = percentage < 70;
  const isGood = percentage >= 70 && percentage < 90;
  const isExcellent = percentage >= 90;

  const gaugeColor = isLow ? 'error' : isGood ? 'warning' : 'success';

  return (
    <Card
      sx={[
        {
          p: 3,
          boxShadow: 'none',
          position: 'relative',
          backgroundColor: 'common.white',
          backgroundImage: `linear-gradient(135deg, ${varAlpha(
            theme.vars.palette[gaugeColor].lighterChannel,
            0.48
          )}, ${varAlpha(theme.vars.palette[gaugeColor].lightChannel, 0.48)})`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ typography: 'subtitle2', color: 'text.secondary' }}>
          {title}
        </Box>
      </Box>

      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Box sx={{ typography: 'h3', color: `${gaugeColor}.main`, mb: 1 }}>
          {fNumber(current)} {unit}
        </Box>
        <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
          Target: {fNumber(target)} {unit}
        </Box>
      </Box>

      <LinearProgress
        variant='determinate'
        value={Math.min(percentage, 100)}
        color={gaugeColor}
        sx={{
          height: 12,
          borderRadius: 1,
          backgroundColor: varAlpha(
            theme.vars.palette[gaugeColor].mainChannel,
            0.16
          ),
        }}
      />

      <Box
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'space-between',
          typography: 'caption',
          color: 'text.secondary',
        }}
      >
        <span>0%</span>
        <span>{Math.round(percentage)}%</span>
        <span>100%</span>
      </Box>

      <Box
        sx={{
          mt: 2,
          p: 1.5,
          borderRadius: 1,
          backgroundColor: varAlpha(
            theme.vars.palette[gaugeColor].mainChannel,
            0.08
          ),
        }}
      >
        <Box sx={{ typography: 'caption', color: `${gaugeColor}.darker` }}>
          {isLow && '⚠️ Below target - Action needed'}
          {isGood && '📊 Good progress - Keep monitoring'}
          {isExcellent && '✅ Excellent performance'}
        </Box>
      </Box>
    </Card>
  );
}
