import type { CardProps } from '@mui/material/Card';

import { memo } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
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

export const ChatMessage = memo(function ChatMessage({
  message,
  sx,
  ...other
}: Props) {
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
      {!isUser && (
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'grey.600' }}>
          <Iconify icon={'solar:cpu-bolt-bold' as any} width={20} />
        </Avatar>
      )}

      <Box sx={{ maxWidth: '70%', minWidth: 200 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isUser
              ? varAlpha(theme.palette.grey['500Channel'], 0.08)
              : 'background.paper',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant='body2'
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              lineHeight: 1.7,
              color: 'text.primary',
            }}
          >
            {message.content}
          </Typography>
        </Box>

        <Typography
          variant='caption'
          sx={{
            mt: 0.5,
            display: 'block',
            color: 'text.disabled',
            textAlign: isUser ? 'right' : 'left',
          }}
        >
          {message.timestamp}
        </Typography>
      </Box>

      {isUser && (
        <Avatar
          sx={{ width: 36, height: 36, bgcolor: 'grey.300', color: 'grey.600' }}
        >
          <Iconify icon={'solar:user-rounded-bold' as any} width={20} />
        </Avatar>
      )}
    </Box>
  );
});
