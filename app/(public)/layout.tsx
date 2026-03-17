import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Layout for all public-facing portfolio routes:
 * /, /about, /projects, /contact
 * Renders the public Navbar and Footer.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
