import Link from "next/link";
import { useState } from "react";

const Navbar = ({ current = "" }) => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="shadow-sm px-4">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setNavbar(!navbar)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`navbar-collapse ${navbar ? "" : "collapse"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${current == "home" ? "active" : ""}`}>
              <Link href="/admin">
                <a className="nav-link" href="#">
                  Ana Sayfa
                </a>
              </Link>
            </li>
            <li className={`nav-item ${current == "posts" ? "active" : ""}`}>
              <Link href="/admin/posts">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </Link>
            </li>
            <li className={`nav-item ${current == "projects" ? "active" : ""}`}>
              <Link href="/admin/projects">
                <a className="nav-link">Proje</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
