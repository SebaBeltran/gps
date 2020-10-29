import React from 'react';
import './ExploreContainer.css';
import GeoLocation from './GeoLocation';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <GeoLocation />
    </div>
  );
};

export default ExploreContainer;
