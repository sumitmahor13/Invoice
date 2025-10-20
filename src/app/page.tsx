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
        <div className="w-9/12 mx-auto min-h-screen flex flex-col gap-3 justify-center items-center">
          <div className="w-full h-full text-center pt-8 text-3xl font-medium flex flex-col items-center gap-6 transition-all duration-700 ease-in-out">
            <div>
              <div className="text-md flex gap-2 justify-center items-center font-semibold mb-4">
                <div className="w-6 h-6 flex items-center justify-center rounded-full text-white p-1 bg-gradient-to-r from-fuchsia-500 to-cyan-500"><Feather/></div>
                <h3 className="text-[1.5rem]">
                  Invoice Pro
                </h3>
              </div>
              <div className="text-3xl font-semibold lg:text-4xl mb-3">
                {getTimeGreeting()}, Dear!
              </div>
              <div className="text-5xl leading-20 font-semibold lg:text-8xl">
                Generate Professional{" "}
                <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent font-semibold">
                  Invoices
                </span>{" "}
                in seconds.
              </div>
              <p className="mt-3 text-gray-600 text-[1.2rem]">The ultimate toolkit for creating professional invoices for your Bussiness. Generate beautiful Invoices, Layout with logo upload, and proper calculation in seconds.</p>
              <Link href={"/invoice"}>
                <Button variant={"secondary"} className="hover:scale-110 cursor-pointer bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white h-12 text-[1.4rem] py-2 mt-5 rounded-lg">
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