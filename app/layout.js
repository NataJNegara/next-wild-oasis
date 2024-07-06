import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "The Wild Oasis - %s",
    default: "The Wild Oasis",
  },
  description: "Most confortable cabin hotel with the best view",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={josefin.className}>
      <body className="relative flex flex-col min-h-screen bg-primary-950 text-primary-50">
        <Header />

        <div className="grid flex-1 px-8 py-12">
          <main className="w-full mx-auto max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
