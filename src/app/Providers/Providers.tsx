import React, { FC } from "react";
import {
    QueryClient, QueryClientProvider,
  } from '@tanstack/react-query'
import MainLayout from "../layouts/MainLayout";

interface IProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient()

export const Providers: FC<IProps> = ({children}) => {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
            <MainLayout>{children}</MainLayout>
            </QueryClientProvider>
        </React.StrictMode>
    )
}