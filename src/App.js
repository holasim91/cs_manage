import React from 'react';
import './App.css';
import Customer from './components/Customer'

const customers=[
  {
  'id':1,
  'img':'https://placeimg.com/64/64/1',
  'name':'Thor',
  'birth':'950413',
  'gender':'male',
  'job':'son of odin'
},
{
  'id':2,
  'img':'https://placeimg.com/64/64/2',
  'name':'Natasha',
  'birth':'920222',
  'gender':'female',
  'job':'Black Widow'
},
{
  'id':3,
  'img':'https://placeimg.com/64/64/3',
  'name':'Peter Quill',
  'birth':'910413',
  'gender':'male',
  'job':'Star Lord'
}
]



function App() {
  return (
    <div>
      {customers.map(customer => (
        <Customer
          key={customer.id}
          id={customer.id}
          img={customer.img}
          name={customer.name}
          birth={customer.birth}
          gender={customer.gender}
          job={customer.job}
        />
      ))}
    </div>
  );
}

export default App;
