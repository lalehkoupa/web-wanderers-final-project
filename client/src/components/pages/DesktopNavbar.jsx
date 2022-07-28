const DesktopNavbar = () => {
  return (
    <div className="desktop-navigation-div">
      <ul className="nav-items h4 fw-bold">
        <li className="mx-3">
          <a href="/">Home</a>
        </li>
        <li className="mx-3">
          <a href="/about">What we do</a>
        </li>
        <li className="mx-3">
          <a href="/rota">What you can do</a>
        </li>
        <li className="mx-3">
          <a href="/signup">Contact</a>
        </li>
        <li className="mx-3">
          <a href="/dashboard">Admin</a>
        </li>
      </ul>
    </div>
  );
};

export default DesktopNavbar;
