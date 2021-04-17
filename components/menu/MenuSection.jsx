const MenuSection = ({ children, sectionTitle }) => {
  return (
    <div>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">{sectionTitle}</div>
      {children}
    </div>
  );
};

export default MenuSection;
