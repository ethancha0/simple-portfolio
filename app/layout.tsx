import type { Metadata } from "next";
import "./globals.css";
import Grainient from "@/components/background";
import MuiProvider from "@/components/mui-provider";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Ethan Chao",
  description: "ethan's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Grainient
          className="fixed inset-0 -z-10"
          color1="#372d36"
          color2="#060606"
          color3="#134314"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={1}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <MuiProvider>
          <div className="flex items-center justify-center gap-10">
            <Navbar/>
            {children}
            
          </div>
        </MuiProvider>

    

        

      </body>

    </html>
  );
}
