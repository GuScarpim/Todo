import React, { useState, useEffect } from 'react';
// useEffect funcao disparada toda vez que a tela é carregada
import { Link, Redirect } from 'react-router-dom';
import * as S from './styles.js';

import api from '../../services/api';
import isConnected from '../../utils/isConnected';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterCard from '../../components/FilterCard';
import TaskCard from '../../components/TaskCard';

function Home() {
  //Var estados
  const [FilterActived, setFilterActived] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function loadTasks() { //carregar informacoes das tarefas
    await api.get(`/task/filter/${FilterActived}/${isConnected}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }

  function Notification() { //Mostra tarefas atrasadas
    setFilterActived('late');
  }

  useEffect(() => { //toda a vez que a tela é carregada ele chama o loadTasks
    loadTasks();
    if (!isConnected)  //se tiver conteudo no localstorage
      setRedirect(true);
  }, [FilterActived])

  return (
    <S.Container>
      {redirect && <Redirect to='qrcode' /> }
      <Header clickNotification={Notification} />
      <S.FilterArea>
        <button type='button' onClick={() => setFilterActived('all')} >
          <FilterCard title='Todos' actived={FilterActived == 'all'} />
        </button>
        <button type='button' onClick={() => setFilterActived('today')} >
          <FilterCard title='Hoje' actived={FilterActived == 'today'} />
        </button>
        <button type='button' onClick={() => setFilterActived('week')} >
          <FilterCard title='Semana' actived={FilterActived == 'week'} />
        </button>
        <button type='button' onClick={() => setFilterActived('month')} >
          <FilterCard title='Mês' actived={FilterActived == 'month'} />
        </button>
        <button type='button' onClick={() => setFilterActived('year')} >
          <FilterCard title='Ano' actived={FilterActived == 'year'} />
        </button>
      </S.FilterArea>
      <S.Title>
        <h3>{FilterActived == 'late' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
      </S.Title>
      <S.Content>
        {tasks.map(t => (
          <Link to={`/task/${t._id}`}>
            <TaskCard key={t._id} type={t.type}
              title={t.title} when={t.when} done={t.done} />
          </Link>
        ))
        }
      </S.Content>
      <Footer />
    </S.Container>
  )
}

export default Home;
