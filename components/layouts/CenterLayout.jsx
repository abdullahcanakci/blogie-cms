import Background from "./Background";

export default function Layout({ children }) {
  return (
    <Background>
      <div
        className="columns is-centered is-marginless is-vcentered is-fullheight"
        style={{ minHeight: "100vh" }}
      >
        <div className="column is-gapless is-paddingless is-full-mobile is-two-thirds-tablet is-half-desktop">
          {children}
        </div>
      </div>
    </Background>
  );
}
