import {useState} from 'react';

type ListProps = {
  initialItems: string[];
};

const List = ({initialItems}: ListProps) => {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(initialItems);
  const addToList = () => {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
    }, 500);
  };

  const removeItemFromList = (removeItem: string) => {
    setTimeout(() => {
      setList((state) => state.filter((item) => item !== removeItem));
    }, 500);
  };

  return (
    <>
      <input
        type='text'
        placeholder='Novo item'
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map((item) => (
          <>
            <li key={item}>{item}</li>
            <button onClick={() => removeItemFromList(item)}>remover</button>
          </>
        ))}
      </ul>
    </>
  );
};

export default List;
