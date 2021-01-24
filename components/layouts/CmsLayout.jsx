import Background from "./Background";

export default function Layout({ children }) {
  return (
    <Background>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow mx-auto">{children}</div>
      </div>
    </Background>
  );
}
