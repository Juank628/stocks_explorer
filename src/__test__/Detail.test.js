import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/store';
import '@testing-library/jest-dom';
import Detail from '../pages/Detail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    sector: 'Technology',
  }),
}));

describe('Home page', () => {
  test('renders home page', () => {
    const element = render(
      <Provider store={store}>
        <BrowserRouter>
          <Detail />
        </BrowserRouter>
      </Provider>,
    );
    expect(element.toJSON).toMatchSnapshot();
  });
});
