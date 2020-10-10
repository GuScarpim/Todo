import React, { useState } from 'react';
// useEffect funcao disparada toda vez que a tela é carregada
import * as S from './styles.js';
import { Redirect } from 'react-router-dom';

import QRCode from 'qrcode.react';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function QrCode() {
  const [mac, setMac] = useState();
  const [redirect, setRedirect] = useState(false);

  async function SaveMac() {
    if (!mac)
      alert('Insira o número correto que apareceu no seu celular!');
    else {
      await localStorage.setItem('@todo/macaddress', mac);
      setRedirect(true);
      window.location.reload();
    }
  }

  return (
    <S.Container>
      {redirect && <Redirect to='/' />}
      <Header />
      <S.Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <p>Suas atividades serão sincornizadas com o seu celular</p>
        <S.QrCodeArea>
          <QRCode value='getmacadress' size={350} />
        </S.QrCodeArea>
        <S.ValidationCode>
          <span>Digite a numeração que apareceu no seu celular</span>
          <input type='text' onChange={e => setMac(e.target.value)}
            value={mac} />
          <button type='button' onClick={SaveMac}>Sincronizar</button>
        </S.ValidationCode>
      </S.Content>
      <Footer />
    </S.Container>
  )
}

export default QrCode;
