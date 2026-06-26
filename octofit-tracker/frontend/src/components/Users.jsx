import { useEffect, useState } from 'react'

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

function Users() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl()
        const response = await fetch(`${apiBaseUrl}/api/users/`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setItems(normalizeCollection(payload))
      } catch (err) {
        setError(err.message)
      }
    }

    loadUsers()
  }, [])

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <p className="text-uppercase fw-semibold text-primary mb-1">Users</p>
            <h2 className="h4 fw-bold mb-0">Athlete profiles</h2>
          </div>
          <span className="badge bg-primary-subtle text-primary">{items.length} users</span>
        </div>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row g-3">
            {items.map((item) => (
              <div className="col-md-6" key={item._id || item.id || item.email}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 fw-semibold mb-1">{item.name || item.username || 'Unknown user'}</h3>
                  <p className="text-muted small mb-0">{item.email || item.role || 'No profile details provided.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Users
