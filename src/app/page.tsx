import { page } from "@d-exclaimation/next";
import Image from "next/image";
import Link from "next/link";
import example from "./example.jpg";

export default page(() => {
  return (
    <>
      <nav className="w-full flex items-center gap-3 md:gap-4 py-8 px-8">
        <img className="w-8 h-8" src="/pixle.png" />
        <span className="text-white font-medium">Camjam</span>
        <div className="ml-auto">
          <img className="w-6 h-6" src="/github.svg" />
        </div>
      </nav>
      <main className="w-full min-h-[80dvh] flex flex-col md:flex-row items-center md:justify-centermd:pt-0 px-4 md:px-12">
        <section className="md:flex-[3] flex flex-col p-3 w-full h-full justify-center gap-5">
          <div className="flex items-center gap-4">
            <span className="text-blue-400 font-semibold text-xl md:text-2xl">
              Camjam
            </span>

            <div className="text-blue-400 px-3 py-0.5 text-xs outline outline-blue-400 rounded-full">
              Free &amp; Open source
            </div>
          </div>

          <h1 className="text-white font-bold text-3xl md:text-4xl lg:text-6xl">
            Capture the world,
            <br />
            one picture at a time
          </h1>

          <div className="flex flex-col gap-4 py-2">
            <span className="flex items-center gap-2 text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              Global and fun challenge every day
            </span>

            <span className="flex items-center gap-2 text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              Share your best shots with the world
            </span>

            <span className="flex items-center gap-2 text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              Powered by AI running on device
            </span>

            <span className="flex items-center gap-2 text-neutral-200">
              <img src="/check.svg" className="w-5 h-5 inline-block" />
              No ads, no tracking, no BS
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/app"
              className="px-4 py-2 rounded-full text-white bg-blue-500"
            >
              Open in browser
            </Link>

            <button className="px-4 py-2 rounded-full text-sm text-blue-400 outline outline-blue-400">
              Install &rarr;
            </button>
          </div>
        </section>

        <section className="flex pt-8 md:pt-0 md:flex-[2] w-full h-full items-center justify-start px-8">
          <div
            className="relative scale-75 lg:scale-100 flex items-center justify-center px-6 pt-6 pb-16
          bg-white shadow-xl shadow-blue-400/30 rounded-lg rotate-2 animate-unrotate"
          >
            <Image
              className="w-60 lg:w-80 aspect-square object-cover rounded-md outline outline-neutral-800"
              src={example}
              alt="example-image"
              sizes="320px"
              placeholder="blur"
            />

            <div className="absolute scale-75 lg:scale-100 top-[4.25rem] lg:top-[6.5rem] w-32 h-32 outline outline-blue-300 rounded-full animate-slideup" />
            <span className="absolute scale-75 lg:scale-100 top-[10.25rem] lg:top-[13.5rem] bg-blue-300 text-black px-2 text-xs py-0.5 rounded-full animate-slideup [animation-delay:0.5s]">
              Dog 🐶
            </span>
          </div>
        </section>
      </main>
    </>
  );
});
