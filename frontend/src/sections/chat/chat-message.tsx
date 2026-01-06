import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
};

type Props = CardProps & {
  message: Message;
};

export function ChatMessage({ message, sx, ...other }: Props) {
  const theme = useTheme();
  const isUser = message.role === 'user';

  return (
    <Box
      sx={[
        {
          display: 'flex',
          gap: 2,
          mb: 3,
          justifyContent: isUser ? 'flex-end' : 'flex-start',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* AI Avatar */}
      {!isUser && (
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'grey.600',
          }}
        >
          <Iconify icon={'solar:cpu-bolt-bold' as any} width={20} />
        </Avatar>
      )}

      {/* Message Content */}
      <Box sx={{ maxWidth: '70%', minWidth: 200 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isUser ? varAlpha(theme.palette.grey['500Channel'], 0.08) : 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.7,
              color: 'text.primary',
              fontWeight: 400,
            }}
          >
            {message.content}
          </Typography>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && (
            <Box sx={{ mt: 2, pt: 2, borderTop: `1px dashed ${theme.palette.divider}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <Iconify icon={'solar:document-text-bold' as any} width={14} sx={{ color: 'text.secondary' }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Sources
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {message.sources.map((source, index) => (
                  <Chip
                    key={index}
                    label={source}
                    size="small"
                    sx={{
                      fontSize: 11,
                      height: 22,
                      fontWeight: 400,
                      bgcolor: varAlpha(theme.palette.grey['500Channel'], 0.08),
                      border: `1px solid ${theme.palette.divider}`,
                      '& .MuiChip-label': { px: 1 },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: 'block',
            color: 'text.disabled',
            textAlign: isUser ? 'right' : 'left',
            px: 1,
            fontWeight: 400,
          }}
        >
          {message.timestamp}
        </Typography>
      </Box>

      {/* User Avatar */}
      {isUser && (
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'grey.300',
            color: 'grey.600',
          }}
        >
          <Iconify icon={'solar:user-rounded-bold' as any} width={20} />
        </Avatar>
      )}
    </Box>
  );
}