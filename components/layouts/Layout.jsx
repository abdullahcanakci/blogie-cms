import Footer from "../utilities/Footer";
import Header from "../utilities/Header";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-500 flex flex-col min-h-screen">
      <Header />
      <div className="max-w-prose mx-auto flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
