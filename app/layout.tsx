import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Kelly Mahlangu",
  description: "Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <head>
        <title>Kelly Mahlangu - Fullstack Developer</title>
        <meta
          name="title"
          content="Kelly Mahlangu - Fullstack Developer Portfolio"
        />
        <meta
          name="description"
          content="Showcasing the best of fullstack development. Discover creative and functional solutions tailored to meet your needs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Kelly Mahlangu" />
        <meta
          name="keywords"
          content="Web Development, Mobile Development, Freelance Developer, Portfolio"
        />
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
