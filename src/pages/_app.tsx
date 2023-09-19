import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { AppLayout } from "~/layouts/AppLayout";
import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
    <AppLayout>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>

    </AppLayout>
    </>
  );
};

export default api.withTRPC(MyApp);
