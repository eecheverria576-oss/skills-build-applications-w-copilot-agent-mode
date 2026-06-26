import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase fw-semibold text-primary mb-3">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Modern multi-tier fitness tracking</h1>
              <p className="lead text-muted">
                This starter now includes a React 19 frontend, an Express and TypeScript API, and MongoDB-ready data access.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a className="btn btn-primary btn-lg" href="http://localhost:8000/api/health">
                  Check API
                </a>
                <a className="btn btn-outline-secondary btn-lg" href="http://localhost:5173">
                  Open frontend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
