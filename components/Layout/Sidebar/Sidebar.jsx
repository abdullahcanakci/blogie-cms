import classNames from "classnames";
import { useMemo, useState } from "react";
import Dropdown from "./Dropdown";
import styles from "./index.module.scss";
import Link from "./Link";

const Sidebar = ({ current }) => {
  const [navOpen, setNavOpen] = useState(false);
  const menu = useMemo(() => {
    return [
      {
        type: "entry",
        link: "/",
        label: "Dashboard",
      },
      {
        type: "group",
        name: "content",
        label: "Contents",
        elements: [
          {
            type: "entry",
            link: "/content/blog",
            label: "Blogs",
          },
          {
            type: "entry",
            link: "/content/project",
            label: "Projects",
          },
        ],
      },
    ];
  });

  const renderLink = (link) => {
    return (
      <Link
        label={link.label}
        isActive={link.name == current}
        link={link.link}
      />
    );
  };

  return (
    <div className={styles.container} onBlur={() => setNavOpen(false)}>
      <div className={styles.mobile_header}>
        <a href="#" className={styles.link}>
          Flowtrail UI
        </a>
        <button
          className={styles.toggle_button}
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
            {!navOpen ? (
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            ) : (
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            )}
          </svg>
        </button>
      </div>
      <nav
        className={classNames(styles.sidebar_container, { hidden: !navOpen })}
      >
        {menu.map((entry) => {
          if (entry.type == "group") {
            return (
              <Dropdown label={entry.label}>
                {entry.elements.map((element) => renderLink(element))}
              </Dropdown>
            );
          } else {
            return renderLink(entry);
          }
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
