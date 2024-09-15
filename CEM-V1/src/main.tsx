import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { asyncStoragePersister, queryClient } from "./queries";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      persistOptions={{ persister: asyncStoragePersister }}
      client={queryClient}
    >
      <App />
    </PersistQueryClientProvider>
  </React.StrictMode>
);
