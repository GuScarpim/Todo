import React, { useState, useEffect } from 'react';
// useEffect funcao disparada toda vez que a tela é carregada
import * as S from './styles.js';
import { format } from 'date-fns';
import { Redirect } from 'react-router-dom';

import api from '../../services/api';
import IsConnect from '../../utils/isConnected';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TypeIcons from '../../utils/typeicons';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';
import isConnected from '../../utils/isConnected';

function Task({ match }) { //pegando o id
  //Var estados
  const [redirect, setRedirect] = useState(false);
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState();

  async function LoadTaskDetails() {
    await api.get(`/task/${match.params.id}`)
      .then(response => {
        setType(response.data.type);
        setTitle(response.data.title);
        setDone(response.data.done);
        setDescription(response.data.description);
        setDate(format(new Date(response.data.when), 'yyyy-MM-dd'));
        setHour(format(new Date(response.data.when), 'HH:mm'));
      })
  }

  async function Save() {
    //Validação dos dados
    if (!title) {
      return alert('Põem o titulo ae')
    } else if (!description) {
      return alert('Põem a descricao ae')
    } else if (!type) {
      return alert('Põem a tipo ae')
    } else if (!date) {
      return alert('Põem a data ae')
    } else if (!hour) {
      return alert('Põem a hora ae')
    }

    if (match.params.id) { //se tem ID é pq quer atualizar
      await api.put(`/task/${match.params.id}`, {
        macaddress: isConnected,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000` //deixar o padrao do mongo date and time group
      }).then(() =>
        setRedirect(true)
      )
    } else {
      await api.post('/task', {
        macaddress: isConnected,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000` //deixar o padrao do mongo date and time group
      }).then(() =>
        setRedirect(true)
      );
    }
  }

  async function Remove() {
    const res = window.confirm('Deseja remover a tarefa?');
    if (res == true) {
      await api.delete(`/task/${match.params.id}`)
        .then(response => {
          console.log(response.data)
          setRedirect(true);
        })
    } else {
      alert('ok, vamos manter')
    }
  }

  useEffect(() => { //toda a vez que a tela é carregada ele chama o loadTasks
    if (!isConnected) {
      setRedirect(true);
    }
    LoadTaskDetails();
  }, []);

  return (
    <S.Container>
      {redirect && <Redirect to='/' />}
      <Header />

      <S.Form>
        <S.TypeIcons>
          {TypeIcons.map((icon, index) => (
            index > 0 && <button type='button' onClick={() => setType(index)}>
              <img src={icon} alt='Tipo da tarefa'
                className={type && type != index && 'inative'} />
            </button>
          ))}
        </S.TypeIcons>

        <S.Input>
          <span>Título</span>
          <input type='text' placeholder='Título da tarefa'
            onChange={e => setTitle(e.target.value)} value={title} />
        </S.Input>

        <S.TextArea>
          <span>Descrição</span>
          <textarea rows={5} placeholder='Descrição da tarefa'
            onChange={e => setDescription(e.target.value)} value={description} />
        </S.TextArea>

        <S.Input>
          <span>Data</span>
          <input type='date' placeholder='Título da tarefa'
            onChange={e => setDate(e.target.value)} value={date} />
          {/* <img src={iconCalendar} alt='Calendário' /> */}
        </S.Input>

        <S.Input>
          <span>Hora</span>
          <input type='time' placeholder='Título da tarefa'
            onChange={e => setHour(e.target.value)} value={hour} />
          {/* <img src={iconClock} alt='Relógio' /> */}
        </S.Input>

        <S.Options>
          <div>
            <input type='checkbox' checked={done} onChange={() => setDone(!done)} />
            <span>CONCLUÍDO</span>
          </div>
          {match.params.id
            ? <button type='button' onClick={Remove}>EXCLUIR</button>
            : ''
          }
        </S.Options>

        <S.Save>
          <button type='button' onClick={Save}>SALVAR</button>
        </S.Save>
      </S.Form>

      <Footer />
    </S.Container>
  )
}

export default Task;
