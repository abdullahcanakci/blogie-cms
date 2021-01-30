import Footer from "../utilities/Footer";
import Header from "../utilities/Header";
import Background from "./Background";

export default function Layout({ children }) {
  return (
    <Background>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="max-w-prose mx-auto flex-grow">{children}</div>
      </div>
    </Background>
  );
}
