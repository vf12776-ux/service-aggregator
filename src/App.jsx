import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [organizations, setOrganizations] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
    fetchOrganizations()
  }, [])

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
    if (!error) setCategories(data)
  }

  async function fetchOrganizations() {
    const { data, error } = await supabase
      .from('organizations')
      .select(`
        *,
        categories (name, icon)
      `)
    if (!error) setOrganizations(data)
  }

  return (
    <div className="app">
      <header>
        <h1>Агрегатор услуг</h1>
      </header>
      
      <main>
        <section className="categories">
          {categories.map(cat => (
            <div key={cat.id} className="category-card">
              <span className="icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
          ))}
        </section>

        <section className="organizations">
          <h2>Организации</h2>
          {organizations.map(org => (
            <div key={org.id} className="org-card">
              <h3>{org.name}</h3>
              <p>{org.description}</p>
              <p>📍 {org.city}</p>
              <p>📞 {org.phone}</p>
              <span className="badge">{org.categories?.name}</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App