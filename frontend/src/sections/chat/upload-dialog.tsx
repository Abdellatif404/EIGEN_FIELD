import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => Promise<void>;
};

export function UploadDialog({ open, onClose, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      try {
        await onUpload(file);
        setFile(null);
        onClose();
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleClose = () => {
    if (!uploading) {
      setFile(null);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        Upload PDF Document
      </DialogTitle>

      <DialogContent sx={{ pb: 3 }}>
        {/* Drop Zone */}
        <Box
          component="label"
          htmlFor="file-upload"
          sx={{
            mt: 1,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'grey.500',
              bgcolor: 'action.hover',
            },
          }}
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            hidden
            onChange={handleFileChange}
            disabled={uploading}
          />

          <Iconify
            icon={"solar:cloud-upload-bold" as any}
            width={56}
            sx={{ mb: 2, color: 'text.disabled' }}
          />

          <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
            Drop PDF here or click to browse
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Supported format: PDF • Max size: 50MB
          </Typography>
        </Box>

        {/* Selected File Preview */}
        {file && (
          <Box
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.neutral',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Iconify icon={"vscode-icons:file-type-pdf2" as any} width={28} />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {file.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            </Box>

            {!uploading && (
              <Box
                component="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                sx={{
                  p: 0.5,
                  border: 'none',
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  borderRadius: 0.5,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <Iconify icon={"solar:close-circle-bold" as any} width={20} sx={{ color: 'text.disabled' }} />
              </Box>
            )}
          </Box>
        )}

        {/* Upload Progress */}
        {uploading && (
          <Box sx={{ mt: 3 }}>
            <LinearProgress sx={{ mb: 1.5, borderRadius: 1 }} />
            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              Uploading and indexing document...
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={uploading}
          size="large"
		  sx={{
			color: 'grey.500',
			'&:hover': { bgcolor: 'grey.100'},
			}}
        >
          Cancel
        </Button>
        <Button
		variant="contained"
		onClick={handleUpload}
		disabled={!file || uploading}
		size="large"
		sx={{
			bgcolor: 'success.main',
			'&:hover': { bgcolor: 'success.dark'}
		}}
		>
		Upload
		</Button>
      </DialogActions>
    </Dialog>
  );
}