import { useState, useEffect } from "react";
import {toast} from "react-toastify"

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const API = 'http://localhost:3001';
  useEffect(() => {
    fetch(`${API}/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(() => toast.error('Не удалось загрузить список'));
  }, []);
  const addItem = () => {
    const text = inputValue.trim();
    if (!text) {
      toast.error('Введи название товара!');
      return;
    }
    fetch(`${API}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(newItem => {
        setItems([...items, newItem]);
        setInputValue('');
        toast.success('Добавлено!');
      })
      .catch(() => toast.error('Ошибка добавления'));
  };

  const toggleBought = (id) => {
    const currentItem = items.find(i => i.id === id);
    const newBought = !currentItem.bought;
    setItems(items.map(item =>
      item.id === id ? { ...item, bought: newBought } : item
    ));
    fetch(`${API}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bought: newBought })
    })
      .then(res => {
        if (!res.ok) {
          setItems(items.map(item =>
            item.id === id ? { ...item, bought: currentItem.bought } : item
          ));
          throw new Error();
        }
        return res.json();
      })
      .then(updatedItem => {
        setItems(items.map(item =>
          item.id === id ? updatedItem : item
        ));
        toast.success(newBought ? 'Куплено!' : 'Не куплено!');
      })
      .catch(() => toast.error('Ошибка обновления'));
  };

   const deleteItem = (id) => {
     fetch(`${API}/items/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error();
      })
      .then(() => {
        setItems(items.filter(item => item.id !== id));
        toast.success('Удалено');
      })
      .catch(() => toast.error('Ошибка удаления'));
  };

 return (
    <div>
      <h1>Мой список покупок</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          placeholder="Новый товар"
        />
        <button onClick={addItem}>Добавить</button>
      </div>
     
              
         {items.length === 0 ? (
        <p>Список пуст</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span style={{
                textDecoration: item.bought ? 'line-through' : 'none',
                opacity: item.bought ? 0.6 : 1
              }}>
                {item.text}
              </span>
              <button onClick={() => toggleBought(item.id)}>
                {item.bought ? 'Не куплено' : 'Куплено'}
              </button>
              <button onClick={() => deleteItem(item.id)} style={{ color: 'red' }}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ShoppingList;