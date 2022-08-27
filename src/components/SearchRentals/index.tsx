import React, { FormEvent, useState, useEffect } from 'react';
import RentalCard, { RentalData } from '../RentalCard'
import './styles.css';

const SearchRentals: React.FC = () => {
  const [query, setQuery] = useState('');
  const [rentals, setRentals] = useState<RentalData[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  useEffect(() => {
    const loadData = async () => {

      if (query === '') {
        return;
      }

      const url = `https://search.outdoorsy.com/rentals?filter[keywords]=${query}&page[limit]=${limit}&page[offset]=${offset}`;
      //const url = `https://search.outdoorsy.com/rentals?filter[keywords]=${query}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        data.data.forEach((x: any) => {
          x.attributes.imageUrl = data.included.find((y: any) => y.id === x.relationships.primary_image.data.id).attributes.url;
        });
        setRentals(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    
    loadData();
  }, [query, offset]);

  const searchRentals = async (event: FormEvent) => {
    event.preventDefault();
  }

  const nextPage = () => {
    debugger
     if (limit > rentals.length) {
      return;
    }

    setOffset(() => offset + limit);
  }

  const prevPage = () => {
    setOffset(() => offset - limit);
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
      {query.length !== 0 && rentals.map((rental: RentalData) => (
        <RentalCard rental={rental} key={rental.id} />
      ))}
    </div>
    {query.length !== 0 && rentals.length > 0 && (
      <div className='pageNav'>
        <button className="button" onClick={prevPage}>Prev</button>
        <button className="button" onClick={nextPage}>Next</button>
      </div>
  )}
    {rentals.length === 0 && query.length !== 0 && (
      <div className='pageNav'><p>No results</p></div>
      )}
  </div>
}

export default SearchRentals;