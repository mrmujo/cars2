import Layout from "./components/Layout";

function App() {
  return (
    <Layout> 
      <div className="App">
        <h1 className="bg-red-500 text-center text-white">Tailwind kaja!</h1>
      </div>
    </Layout>
  )
}

const numbers = [...Array(10).keys()];
export default App;
