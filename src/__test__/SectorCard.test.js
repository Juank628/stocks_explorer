import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import SectorCard from '../components/SectorCard';

describe('sector card', () => {
  const data = {
    name: 'Comunication services',
    numberOfCompanies: 189,
    marketCap: 1000,
  };
  it('should have the correct link', () => {
    render(
      <BrowserRouter>
        <SectorCard sectorData={data} />
      </BrowserRouter>,
    );
    const link = screen.getAllByRole('link');
    expect(link[0]).toHaveAttribute('href', '/detail/Comunication-services');
  });

  it('should have the correct sector market cap', () => {
    render(
      <BrowserRouter>
        <SectorCard sectorData={data} />
      </BrowserRouter>,
    );
    const text = screen.getAllByText('1000M');
    expect(text).toHaveLength(1);
  });
});
