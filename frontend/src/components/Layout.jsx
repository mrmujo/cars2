import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
        <div className="flex-1 min-h-full flex flex-col align-middle">{children}</div>
      <Footer />
    </div>
  )
}

// Generate a function to loop components

export default Layout
