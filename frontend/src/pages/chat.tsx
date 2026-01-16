import { CONFIG } from 'src/config-global';

import { ChatView } from 'src/sections/chat/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Chat - ${CONFIG.appName}`}</title>
      <meta
        name='description'
        content='Chat with your agricultural documents using AI-powered RAG system'
      />
      <meta name='keywords' content='chat,ai,rag,agriculture,assistant' />

      <ChatView />
    </>
  );
}
