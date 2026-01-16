import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useTheme, keyframes } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-8px);
  }
`;

export function TypingIndicator() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        justifyContent: 'flex-start',
      }}
    >
      {/* AI Avatar */}
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: 'grey.600',
        }}
      >
        <Iconify icon={'solar:cpu-bolt-bold' as any} width={20} />
      </Avatar>

      {/* Typing Animation */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          border: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          gap: 0.75,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: 'text.secondary',
              animation: `${bounce} 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
