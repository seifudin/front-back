import { useState, useCallback } from 'react'
import { toast } from 'react-toastify';
import { HooksOne } from './hooks/HooksOne';

function App() {

    const finishelItems = [
      { id: 1, text:'123', bought: false},
      { id: 1, text:'123', bought: false}
    ];

   const [items, setItems] = HooksOne(finishelItems);

    const [inputValue, setInputValue] = useState('');

    const addItem = () => {
      if (inputValue.trim() === '') {
        toast.error('Введите название товара!', { position: 'top-center'});
        return;
      }
      const newItem = { id: Date.now(), text: inputValue, bought: false};
      setItems(prefItems =>  [...prefItems, newItem]);
      setInputValue('');
      toast.success(`добавлен: ${newItem.text}` , {
        position: 'top-center',
        autoClose: 2000 
      });
    };

    const deleteItem =  (id) => {
      setItems(prefItems => prefItems.filter(item => item.id !== id));
      toast.info('товар удален из списка', {position: "top-center", autoClose: 3500});
    };

   
      const toggleBought = useCallback((id) => {
    setItems(prevItems => {
      const newItems = prevItems.map(item => 
        item.id === id 
          ? { ...item, bought: !item.bought }  
          : item 
      );
      const toggledItem = newItems.find(item => item.id === id);
      toast.info(
        toggledItem.bought 
          ? 'Отмечено как взято!'
          : 'Снята отметка!',     
        { position: "top-center" }
      );
      return newItems;
    });
  }, [setItems]);

    const clearList = () => {
      if (items.length === 0) {
        toast.warning('список уже пуст!', {position: "top-center"});
        return;
      } 
      setItems([]);
      toast.success('список очищен!', { position: "top-center"});
    };

  
}

export default App
