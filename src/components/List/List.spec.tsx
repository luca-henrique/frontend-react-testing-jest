import {render, waitFor, screen} from '@testing-library/react';
import App from './List';

import userEvent from '@testing-library/user-event';

const mockData = ['Lucas', 'Henrique', 'Paes'];

describe('List Component', () => {
  it('should render list items', async () => {
    const {getByText} = render(<App initialItems={mockData} />);

    expect(getByText('Lucas')).toBeInTheDocument();
    expect(getByText('Henrique')).toBeInTheDocument();
    expect(getByText('Paes')).toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const {getByText, getByPlaceholderText, findByText, debug, queryByText} =
      render(<App initialItems={[]} />);
    const user = userEvent.setup();

    const inputElement = getByPlaceholderText('Novo item');

    const addButton = getByText('Adicionar');

    await user.type(inputElement, 'Novo');

    await user.click(addButton);

    expect(await findByText('Novo')).toBeInTheDocument();
  });

  it('should be able to remove new item from the list', async () => {
    const {findAllByText, queryByText, debug} = render(
      <App initialItems={mockData} />,
    );
    const user = userEvent.setup();

    debug();
    const removeButtons = await findAllByText('remover');

    console.log(removeButtons[0]);

    await user.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText('Lucas')).not.toBeInTheDocument();
    });
  });
});
