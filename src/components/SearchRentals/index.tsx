import React, { FormEvent, useState, useEffect } from 'react';
import RentalCard, { RentalData } from '../RentalCard'
import './styles.css';

const SearchRentals: React.FC = () => {
  const [query, setQuery] = useState('');
  const [rentals, setRentals] = useState<RentalData[]>([]);

  useEffect(() => {
    const loadData = async () => {

      if (query === '') {
        return;
      }

      const url = `https://search.outdoorsy.com/rentals?filter[keywords]=${query}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        data.data.forEach((x: any) => {
          x.attributes.imageUrl = data.included.find((y: any) => y.id === x.relationships.primary_image.data.id).attributes.url;
        });
        setRentals(data.data);
        debugger
      } catch (err) {
        console.log(err);
      }
    }
    
    loadData();
  }, [query]);

  const searchRentals = async (event: FormEvent) => {
    event.preventDefault();
  }

  return <div>
    <form className="form" onSubmit={searchRentals}>
      <label htmlFor="query" className="label"></label>
      <input
        type="text"
        className="input"
        name="query"
        placeholder="Please, enter search keyword..."
        value={query}
        onChange={(e) => { setQuery(e.target.value) }}
      />
    </form>

    <div className="card-list">
      {rentals.map((rental: RentalData) => (
        <RentalCard rental={rental} key={rental.id} />
      ))}
    </div>
  </div>
}

export default SearchRentals;