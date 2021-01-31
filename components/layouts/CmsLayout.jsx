import Background from "./Background";

export default function Layout({ children }) {
  return (
    <Background>
      <div
        className="columns is-marginless is-fullheight"
        style={{ minHeight: "100vh" }}
      >
        <div className="column is-paddingless">{children}</div>
      </div>
    </Background>
  );
}
