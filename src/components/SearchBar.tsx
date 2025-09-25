import React, { useState } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  placeholder?: string
  buttonLabel?: string
  onSearch?: (q: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search city or ZIP', buttonLabel = 'Search', onSearch }) => {
  const [q, setQ] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(q.trim())
  }

  return (
    <form className="searchbar" onSubmit={submit} role="search">
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search locations"
      />
      <button className="search-btn hoverable" type="submit">{buttonLabel}</button>
    </form>
  )
}

export default SearchBar
