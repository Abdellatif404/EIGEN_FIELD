import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Recommendation = {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  estimatedCost?: string;
  estimatedImpact?: string;
  source?: string;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  recommendations: Recommendation[];
};

export function AIRecommendations({
  title,
  subheader,
  recommendations,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const getPriorityConfig = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return {
          color: theme.palette.error.main,
          bgColor: varAlpha(theme.palette.error.mainChannel, 0.08),
          borderColor: varAlpha(theme.palette.error.mainChannel, 0.24),
          hoverBg: varAlpha(theme.palette.error.mainChannel, 0.12),
        };
      case 'medium':
        return {
          color: theme.palette.warning.main,
          bgColor: varAlpha(theme.palette.warning.mainChannel, 0.08),
          borderColor: varAlpha(theme.palette.warning.mainChannel, 0.24),
          hoverBg: varAlpha(theme.palette.warning.mainChannel, 0.12),
        };
      case 'low':
        return {
          color: theme.palette.info.main,
          bgColor: varAlpha(theme.palette.info.mainChannel, 0.08),
          borderColor: varAlpha(theme.palette.info.mainChannel, 0.24),
          hoverBg: varAlpha(theme.palette.info.mainChannel, 0.12),
        };
      default:
        return {
          color: theme.palette.grey[500],
          bgColor: varAlpha(theme.palette.grey['500Channel'], 0.08),
          borderColor: varAlpha(theme.palette.grey['500Channel'], 0.24),
          hoverBg: varAlpha(theme.palette.grey['500Channel'], 0.12),
        };
    }
  };

  return (
    <Card 
      sx={[
        { 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column' 
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]} 
      {...other}
    >
      <CardHeader 
        title={title} 
        subheader={subheader}
        sx={{ pb: 2 }}
      />

      <Divider />

      <Box sx={{ p: 3, flex: 1, overflow: 'auto' }}>
        {recommendations.map((rec, index) => {
          const priorityConfig = getPriorityConfig(rec.priority);

          return (
            <Box key={rec.id}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  bgcolor: priorityConfig.bgColor,
                  border: `1px solid ${priorityConfig.borderColor}`,
                  mb: index < recommendations.length - 1 ? 2 : 0,
                  transition: theme.transitions.create(['all'], {
                    duration: theme.transitions.duration.shorter,
                  }),
                  '&:hover': {
                    bgcolor: priorityConfig.hoverBg,
                    transform: 'translateY(-2px)',
                    boxShadow: theme.customShadows.z8,
                  },
                }}
              >
                {/* Header */}
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {rec.title}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={rec.priority.toUpperCase()}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontWeight: 700,
                        bgcolor: priorityConfig.color,
                        color: 'white',
                        '& .MuiChip-label': {
                          px: 1,
                        },
                      }}
                    />
                    <Chip
                      label={rec.category}
                      size="small"
                      variant="outlined"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        borderColor: varAlpha(theme.palette.grey['500Channel'], 0.32),
                        '& .MuiChip-label': {
                          px: 1,
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    lineHeight: 1.7,
                  }}
                >
                  {rec.description}
                </Typography>

                {/* Metrics */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  {rec.estimatedCost && (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: varAlpha(theme.palette.grey['500Channel'], 0.08),
                      }}
                    >
                      <Iconify
                        icon={"solar:dollar-minimalistic-bold" as any}
                        width={14}
                        sx={{ color: 'warning.main' }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                        }}
                      >
                        {rec.estimatedCost}
                      </Typography>
                    </Box>
                  )}

                  {rec.estimatedImpact && (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: varAlpha(theme.palette.success.mainChannel, 0.08),
                      }}
                    >
                      <Iconify
                        icon={"solar:chart-2-bold" as any}
                        width={14}
                        sx={{ color: 'success.main' }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ 
                          fontWeight: 600, 
                          color: 'success.main',
                        }}
                      >
                        {rec.estimatedImpact}
                      </Typography>
                    </Box>
                  )}

                  {rec.source && (
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: varAlpha(theme.palette.grey['500Channel'], 0.08),
                      }}
                    >
                      <Iconify
                        icon={"solar:document-text-bold" as any}
                        width={14}
                        sx={{ color: 'info.main' }}
                      />
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          fontWeight: 500,
                        }}
                      >
                        {rec.source}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}

        {/* Empty State */}
        {recommendations.length === 0 && (
          <Box
            sx={{
              py: 10,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: varAlpha(theme.palette.success.mainChannel, 0.08),
                mx: 'auto',
                mb: 3,
              }}
            >
              <Iconify
                icon={"solar:check-circle-bold" as any}
                width={48}
                sx={{ color: 'success.main' }}
              />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              All Clear!
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              No recommendations at this time.
              <br />
              Your farm is performing optimally.
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}