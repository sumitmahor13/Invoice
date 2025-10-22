import { Button } from "@/components/ui/button";
import { ArrowRight, Feather, FeatherIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
              radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
            `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      >
        {/* content */}
        <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto min-h-screen flex flex-col gap-3 justify-center items-center">
          <div className="w-full h-full text-center pt-8 text-3xl font-medium flex flex-col items-center gap-6 transition-all duration-700 ease-in-out">
            <div>
              <div className="text-md flex gap-1 md:gap-2 justify-center items-center font-semibold mb-4">
                <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full text-white p-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500"><Feather/></div>
                <h3 className="text-sm md:text-[1.3rem]">
                  Invoice Pro
                </h3>
              </div>
              <div className="text-[1.3rem] md:text-3xl font-semibold lg:text-4xl mb-3">
                {getTimeGreeting()}, Dear!
              </div>
              <div className="font-bold md:font-semibold text-3xl md:text-5xl lg:leading-20  lg:text-8xl">
                Generate Professional{" "}
                <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent font-semibold">
                  Invoices
                </span>{" "}
                in seconds.
              </div>
              <p className="mt-3 text-gray-600 text-sm md:text-[1.2rem]">The ultimate toolkit for creating professional invoices for your Bussiness. Generate beautiful Invoices, Layout with logo upload, and proper calculation in seconds.</p>
              <Link href={"/invoice"}>
                <Button className="text-sm md:text-md mt-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white md:w-60 md:h-12 rounded-lg border border-gray-400 ">
                  Generate Invoice <ArrowRight size={40}/>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};