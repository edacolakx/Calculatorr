import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { createTheme, MantineProvider } from '@mantine/core'; // Import createTheme from Mantine
import '@mantine/core/styles.css';
import './App.css';
import { Input,Button,Group } from '@mantine/core';
import axios from 'axios';
function App() {
  const [message, setMessage] = useState('');
  const [number1, setnumber1] = useState('');
  const [number2, setnumber2] = useState('');
  const [toplama, settoplama] = useState('');
  const [cikarma, setcikarma] = useState('');
  const [carpma, setcarpma] = useState('');
  const [bolme, setbolme] = useState('');

  const theme = createTheme({
  });
  const handleChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) { 
      setnumber1(value);
    }
  };
  const handleChange1 = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) { 
      setnumber2(value);
    }
  };

  function operation(e) {
    let url =''
    switch (e) {
      case 'add':
        url = 'http://localhost:8080/add';
        break;
      case 'sub':
        url = 'http://localhost:8080/sub';
        break;
      case 'multi':
        url = 'http://localhost:8080/multi';
        break;
      case 'divide':
        url = 'http://localhost:8080/divide';
        break;
      default:
        return;
    }
    if (number1 === '' || number2 === '') {
      alert('Lütfen sayıları giriniz');
      return;
    }else{

    
    axios.post(url, {
      number1: parseFloat(number1),
      number2: parseFloat(number2)
    })
      .then(response => {
        console.log(response.data.sum);
        setMessage(response.data.sum);
      })
      .catch(error => {
        console.error('There was an error making the request:', error);
      });
  }}

  return (
    <MantineProvider theme={theme}>
    <>
    <h1>Hesap Makinesi</h1>
    <Group>
      <Input className='Input' placeholder="Bir Sayı Giriniz" size="xs" type='number' onChange={handleChange} value={number1}/>
      <Input placeholder="Bir Sayı Giriniz" size="xs" type='number' value={number2} onChange={handleChange1}/>
    </Group><br/>

    <Group >
    <Button value={toplama} onClick={()=>operation("add")} variant="outline" color="teal" size="lg" radius="xl">Topla</Button>
    <Button value={cikarma} onClick={()=>operation("sub")} variant="outline" color="teal" size="lg" radius="xl">Çıkar</Button>
    <Button value={carpma} onClick={()=>operation("multi")} variant="outline" color="teal" size="lg" radius="xl">Çarp</Button>
    <Button value={bolme} onClick={()=>operation("divide")} variant="outline" color="teal" size="lg" radius="xl">Böl</Button>
    </Group>
    <h1>Sonuç: {message}</h1>
    </>
    </MantineProvider>
  );
}

export default App;
