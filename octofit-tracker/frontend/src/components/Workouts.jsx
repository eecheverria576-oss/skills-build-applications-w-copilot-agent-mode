import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const getApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}/`

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

function Workouts() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl('workouts'))
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeCollection(payload))
      } catch (err) {
        setError(err.message)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Workouts</p>
            <h2 className="h4 fw-bold mb-0">Recommended training plans</h2>
          </div>
          <span className="badge bg-primary-subtle text-primary">{items.length} workouts</span>
        </div>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row g-3">
            {items.map((item) => (
              <div className="col-md-6" key={item._id || item.id || item.name}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-semibold mb-2">{item.name || 'Workout plan'}</h3>
                  <p className="text-muted small mb-0">
                    {item.description || item.type || 'No details available.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Workouts
