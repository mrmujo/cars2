import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex justify-between relative items-center font-mono h-16">
      <Link to="/" className="pl-8 text-xl font-bold text-white">Cars FARM</Link>
      <div className="pl-8 text-xl font-bold text-white">
        <NavLink className={({ isActive }) => isActive ? "active-link" : "p-4" } to="/">Home</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : "p-4" } to="/cars">Cars</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : "p-4" } to="/new">New Car</NavLink>
        <NavLink className={({ isActive }) => isActive ? "active-link" : "p-4" } to="/about">About</NavLink>
      </div>
    </nav>
  )
}

export default Header
