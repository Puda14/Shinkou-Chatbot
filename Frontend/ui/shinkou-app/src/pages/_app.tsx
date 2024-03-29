import Head from "next/head";
import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { DashboardLayout } from "@/dashboard/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Chatbot UI</title>
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
