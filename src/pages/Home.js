import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readStocks } from '../redux/slices/stocks';

export default function Home() {
  const { list } = useSelector((store) => store.stocksReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (list.length === 0) {
      dispatch(readStocks());
    }
  }, [dispatch, list.length]);

  return (
    <div>Home</div>
  );
}
