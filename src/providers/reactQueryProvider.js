// components/ReactQueryProvider.js
"use client";

import queryClient from "@/utils/reactQueryClient";
import {  QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default  function ReactQueryProvider({ children }) {


    return <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
}