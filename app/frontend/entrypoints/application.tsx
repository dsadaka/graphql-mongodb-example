import { Provider } from "components/ui/provider"
import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactTable } from "@tanstack/react-table";
import App from 'App';

import 'virtual:windi.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
      <QueryClientProvider client={ queryClient }>
          <Provider>
              <App />
          </Provider>
      </QueryClientProvider>
  </React.StrictMode>,
);
