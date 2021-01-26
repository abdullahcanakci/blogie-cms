import Background from "./Background";

export default function Layout({ children }) {
  return (
    <Background>
      <div className="container mx-auto min-h-screen">{children}</div>
    </Background>
  );
}
