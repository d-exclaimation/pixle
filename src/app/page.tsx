import { page } from "@d-exclaimation/next";
import Image from "next/image";
import Link from "next/link";
import example from "./example.jpg";
import InstallForIOS from "./ios";

export default page(() => {
  return (
    <>
      <nav className="w-full flex items-center gap-3 md:gap-4 py-6 px-8">
        <img className="w-8 h-8" src="/pixle.png" />
        <span className="text-black dark:text-white font-medium">Pixle</span>
        <a className="ml-auto" href="https://github.com/d-exclaimation/pixle">
          <img className="w-6 h-6" src="/github.svg" />
        </a>
      </nav>
      <main className="w-full flex-1 flex flex-col md:flex-row items-center justify-center md:pt-0 px-4 md:px-[8vw] pb-[16dvh]">
        <section className="md:flex-[3] flex flex-col p-3 w-full h-full justify-center gap-5">
          <div className="flex items-center gap-4">
            <span className="text-sky-600 dark:text-sky-400 font-semibold text-xl md:text-2xl">
              Pixle
            </span>

            <div className="text-sky-600 dark:text-sky-400 px-3 py-0.5 text-xs border border-sky-600 dark:border-sky-400 rounded-full">
              Free &amp; Open source
            </div>
          </div>

          <h1 className="text-black dark:text-white font-bold text-3xl md:text-4xl lg:text-6xl">
            Capture the world,
            <br />
            one picture at a time
          </h1>

          <div className="flex flex-col gap-4 py-2">
            <span className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              Global and fun challenge every day
            </span>

            <span className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              Share your best shots with the world
            </span>

            <span className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              Powered by AI running on device
            </span>

            <span className="flex items-center gap-2 text-neutral-800 dark:text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              No ads, no tracking, no BS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/app"
              className="px-4 py-2 rounded-md text-sky-50 dark:text-sky-950 bg-black dark:bg-white"
            >
              Open in browser
            </Link>
          </div>
        </section>

        <section className="hidden md:flex pt-8 md:pt-0 md:flex-[2] w-full h-full items-center justify-start px-8">
          <div
            className="relative scale-75 lg:scale-100 flex items-center justify-center px-6 pt-6 pb-16
          bg-white shadow-xl shadow-sky-400/30 rounded-lg rotate-2 animate-unrotate"
          >
            <Image
              className="w-60 lg:w-80 aspect-square object-cover rounded-md border border-neutral-800"
              src={example}
              alt="example-image"
              sizes="320px"
              placeholder="blur"
            />

            <div className="absolute top-[12.25rem] lg:top-[16.5rem] flex items-center gap-2">
              <span className="bg-green-50 border border-green-400 backdrop-blur-xl shadow text-black px-3 py-1.5 text-lg rounded-xl animate-slideup [animation-delay:0.25s]">
                👤
              </span>
              <span className="bg-neutral-50 border border-neutral-400 backdrop-blur-xl shadow text-black px-3 py-1.5 text-lg rounded-xl animate-slideup [animation-delay:0.5s]">
                🍦
              </span>
              <span className="bg-yellow-50 border border-yellow-400 backdrop-blur-xl shadow text-black px-3 py-1.5 text-lg rounded-xl animate-slideup [animation-delay:0.75s]">
                🚘
              </span>
            </div>
          </div>
        </section>

        <InstallForIOS />
      </main>
    </>
  );
});
