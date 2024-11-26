import React from 'react';
import { Provider } from "components/ui/provider";
import { Provider as ReduxProvider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from 'App';
import store from '../src/store'; 
import 'virtual:windi.css';

const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={ queryClient }>
          <Provider>
              <App />
          </Provider>
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
