import React, { FC, PropsWithChildren } from "react";
import {
    QueryClient, QueryClientProvider,
  } from '@tanstack/react-query'
import MainLayout from "../layouts/MainLayout";


const queryClient = new QueryClient()

export const Providers: FC<PropsWithChildren> = ({children}) => {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
            <MainLayout>{children}</MainLayout>
            </QueryClientProvider>
        </React.StrictMode>
    )
}