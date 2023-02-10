import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  test('renders navbar', () => {
    const element = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );
    expect(element.toJSON).toMatchSnapshot();
  });
});
