const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
let items = [
  { id: 1, text: 'Молоко', bought: false },
  { id: 2, text: 'Хлеб', bought: false }
];
app.get('/items', (req, res) => {
  res.json(items);
});
app.post('/items', (req, res) => {
  const text = req.body.text?.trim();
  if (!text) {
    return res.status(400).json({ error: 'Название товара обязательно' });
  }
  const newItem = {
    id: Date.now(),     
    text: text,
    bought: false
  };
  items.push(newItem); 
  res.status(201).json(newItem);
});
app.listen(3001, () => {
  console.log('Сервер работает на http://localhost:3001');
});

app.put('/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find(i=> i.id === id);
  const newStatus  = req.body.bought ?? ! item.bought;
  item.bought = newStatus;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const id = Number (req.params.id);
  const index = items.findIndex(i=> i.id === id);
  const deleteItem = items.splice(index,1)[0];
  res.json(deleteItem);
})