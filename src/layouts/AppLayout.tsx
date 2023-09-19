import type { ReactNode } from "react";
import Image from 'next/image';
import Head from "next/head";
type LayoutContentWrapperProps = {
  children: ReactNode;
  className?: string;
}
const LayoutContentWrapper = ({
  children,
}: LayoutContentWrapperProps) => {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </Head>
      <div className="flex flex-col items-center h-screen bg-gradient-to-r from-emerald-400 to-cyan-400">
        <div className="flex flex-row">

          <header>
            <h1 className="font-extrabold tracking-tight text-white sm:text-[5rem]">
              <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-l from-teal-400 to-yellow-200">T3 App</span> -
              <span className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">Cloud Desk</span>
            </h1>
          </header>
          <Image
            src="/logo.svg"
            width={120}
            height={120}
            alt="Picture of the author"
          />
        </div>
        {children}
      </div>
    </>
  );
};

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {

  return (
    <>
      <LayoutContentWrapper>{children}</LayoutContentWrapper>
    </>
  );
};