import Link from "next/link";

const MenuItem = ({ path = "#" }) => {
  return (
    <div>
      <li class="nav-item">
        <Link href={path}>
          <a class="nav-link">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </Link>
      </li>
    </div>
  );
};

export default MenuItem;
