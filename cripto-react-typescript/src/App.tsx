import CriptoSearchForm from "./components/CriptoSearchForm"


function App() {

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          Cotizador de <span>Criptomonedas</span>

          <div className="content">
            <CriptoSearchForm/>
          </div>
        </h1>
      </div>
    </>
  )
}

export default App
