import { useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';


// ----------------------------------------------------------------------

type Props = {
  onSend: (message: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

export function ChatInput({ onSend, disabled, loading }: Props) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about your agricultural documents..."
        disabled={disabled}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress size={24} color="success" />
                ) : (
                  <IconButton
                    color="success"
                    onClick={handleSend}
                    disabled={!message.trim() || disabled}
                  >
                    <Iconify icon={"solar:plain-2-bold" as any} width={24} />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
      />
    </Paper>
  );
}