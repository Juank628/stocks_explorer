import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import '@testing-library/jest-dom';
import Home from '../pages/Home';

describe('Home page', () => {
  test('renders home page', () => {
    const element = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(element.toJSON).toMatchSnapshot();
  });
});
