import { useState, useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { ChatInput } from '../chat-input';
import { ChatMessage } from '../chat-message';
import { DocumentList } from '../document-list';
import { UploadDialog } from '../upload-dialog';


// ----------------------------------------------------------------------

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
  timestamp: string;
};

type Document = {
  filename: string;
  uploadDate: string;
  chunks?: number;
};

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('http://localhost:9000/documents');
      if (response.ok) {
        const data = await response.json();
        if (data.documents && Array.isArray(data.documents)) {
          const formattedDocs = data.documents.map((filename: string) => ({
            filename: filename,
            uploadDate: new Date().toLocaleDateString(),
            chunks: 0,
          }));
          setDocuments(formattedDocs);
        } else {
          setDocuments([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      setDocuments([]);
    }
  };

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const params = new URLSearchParams({ query: content, top_k: '3' });
      const response = await fetch(`http://localhost:9000/chat?${params.toString()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.answer,
          sources: data.sources,
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I could not connect to the server.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:9000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await fetchDocuments();
      } else {
        throw new Error(`Upload failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleDelete = async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:9000/documents/${filename}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchDocuments();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        AI Agriculture Assistant
      </Typography>

      <Box 
        sx={{ 
          height: 'calc(100vh - 160px)',
          overflow: 'hidden',
          pb: 2,
        }}
      >
        <Grid container spacing={3} sx={{ height: '100%' }}>
          {/* Chat Area */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {/* Messages Container */}
              <Box
                sx={{
                  flex: 1,
                  minHeight: 0,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flex: 1, minHeight: 0, position: 'relative' }}>
                  <Scrollbar 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      p: 3,
                      pb: 4,
                    }}
                  >
                    {messages.length === 0 ? (
                      <Box
                        sx={{
                          minHeight: '300px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          gap: 2,
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
                            icon={'solar:chat-round-dots-bold' as any} 
                            width={40} 
                            sx={{ color: 'text.secondary' }} 
                          />
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Start a Conversation
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary', 
                            textAlign: 'center',
                            maxWidth: 400,
                            px: 2,
                          }}
                        >
                          Upload agricultural documents and ask questions about farming practices, 
                          crop management, or soil health.
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        {messages.map((msg) => (
                          <ChatMessage key={msg.id} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </Scrollbar>
                </Box>
              </Box>

              {/* Input - Fixed at bottom */}
              <Box sx={{ flexShrink: 0 }}>
                <ChatInput onSend={handleSend} loading={loading} />
              </Box>
            </Box>
          </Grid>

          {/* Document List */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ height: '100%' }}>
              <DocumentList
                documents={documents}
                onUpload={() => setUploadOpen(true)}
                onDelete={handleDelete}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />
    </DashboardContent>
  );
}