import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";


function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <div className="group flex">
        <button className="rounded-full bg-blue-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </button>
        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">{secretMessage && <span>{secretMessage}</span>}</span>
      </div>

      <button
        className="rounded-full bg-red-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

const Home = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/chart"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">chart</h3>
              <div className="text-lg">balabala</div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/about"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">about</h3>
              <div className="text-lg">balabala</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}



export default Home;