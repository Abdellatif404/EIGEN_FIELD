import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Document = {
  filename: string;
  uploadDate: string;
  chunks?: number;
};

type Props = CardProps & {
  documents: Document[];
  onDelete?: (filename: string) => void;
  onUpload?: () => void;
  deletingFile?: string | null;
};

export function DocumentList({
  documents,
  onDelete,
  onUpload,
  deletingFile,
  sx,
  ...other
}: Props) {
  const safeDocuments = Array.isArray(documents) ? documents : [];

  return (
    <Card
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <CardHeader
        title='Your Documents'
        subheader={`${safeDocuments.length} file${
          safeDocuments.length !== 1 ? 's' : ''
        }`}
        action={
          <Button
            size='small'
            variant='outlined'
            startIcon={<Iconify icon={'solar:upload-bold' as any} />}
            onClick={onUpload}
            sx={{
              borderColor: 'grey.300',
              color: 'grey.600',
              fontWeight: 500,
              '&:hover': {
                borderColor: 'grey.400',
                bgcolor: 'grey.50',
              },
            }}
          >
            Upload
          </Button>
        }
        sx={{ flexShrink: 0, pb: 2 }}
        titleTypographyProps={{ fontWeight: 600 }}
        subheaderTypographyProps={{ fontWeight: 400 }}
      />

      <Divider />

      {/* Scrollable area with absolute positioning */}
      <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
        {safeDocuments.length === 0 ? (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              p: 4,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'action.hover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <Iconify
                icon={'solar:document-add-bold' as any}
                width={40}
                sx={{ color: 'text.secondary' }}
              />
            </Box>
            <Typography
              variant='subtitle1'
              sx={{ mb: 1, color: 'text.primary', fontWeight: 600 }}
            >
              No Documents Yet
            </Typography>
            <Typography
              variant='body2'
              sx={{ color: 'text.secondary', fontWeight: 400 }}
            >
              Upload PDF files to start chatting
            </Typography>
          </Box>
        ) : (
          <Scrollbar
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              py: 0.5,
              pb: 2,
            }}
          >
            <List disablePadding>
              {safeDocuments.map((doc, index) => {
                const displayName =
                  doc.filename?.split('/').pop() ||
                  doc.filename ||
                  'Unknown file';

                return (
                  <Box key={`${doc.filename}-${index}`}>
                    <ListItem
                      secondaryAction={
                        onDelete && (
                          <IconButton
                            edge='end'
                            size='small'
                            onClick={() => onDelete(doc.filename)}
                            sx={{
                              color: 'error.main',
                              '&:hover': { bgcolor: 'error.lighter' },
                            }}
                          >
                            <Iconify
                              icon={'solar:trash-bin-trash-bold' as any}
                              width={20}
                            />
                          </IconButton>
                        )
                      }
                      sx={{
                        py: 1.5,
                        px: 2,
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'error.lighter',
                          mr: 2,
                          flexShrink: 0,
                        }}
                      >
                        <Iconify
                          icon={'vscode-icons:file-type-pdf2' as any}
                          width={24}
                        />
                      </Box>
                      <ListItemText
                        primary={displayName}
                        secondary={doc.uploadDate}
                        primaryTypographyProps={{
                          variant: 'body2',
                          noWrap: true,
                          fontWeight: 500,
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          color: 'text.disabled',
                          fontWeight: 400,
                        }}
                      />
                    </ListItem>
                    {index < safeDocuments.length - 1 && <Divider />}
                  </Box>
                );
              })}
            </List>
          </Scrollbar>
        )}
      </Box>
    </Card>
  );
}
