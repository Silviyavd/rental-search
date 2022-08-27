import React from 'react';
import './styles.css';
import { RentalCardProps } from "../../models/interface";

const RentalCard: React.FC<RentalCardProps> = ({ rental }) => {
  return (
    <div className="card">

      <img
        src={rental.attributes.imageUrl}
        alt='rental'
        className="card--image"
      />

      <div className="card--content">
        <h3 className="card--title">{rental.attributes.name}</h3>
      </div>
    </div>
  );
}

export default RentalCard;