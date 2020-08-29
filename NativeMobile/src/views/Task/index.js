import React, { useState, useEffect } from 'react';
//useEffect funcao disparada sempre que a tela é carregada
import {
  View, Text, Image,
  ScrollView, TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as Network from 'expo-network';

import styles from './styles';

import api from '../../services/api';

//Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import typeIcons from '../../utils/typeIcons';

import DateTimeInput from '../../components/DateTimeInput/';

export default function Task({ navigation }) {
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState();
  const [load, setLoad] = useState(true);

  async function SaveTask() {
    if (!title)
      return Alert.alert('Defina o nome da tarefa!');

    if (!description)
      return Alert.alert('Defina a descrição da tarefa!');

    if (!type)
      return Alert.alert('Escolha um tipo para a tarefa!');

    if (!date)
      return Alert.alert('Escolha uma data para a tarefa!');

    if (!hour)
      return Alert.alert('Escolha uma hora para a tarefa!');

    if (id) {//se tiver id ele atualiza
      await api.put(`/task/${id}`, {
        macaddress,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}.000`,
      }).then(() => {
        navigation.navigate('Home'); //se deu certo ele volta para home
      });
    } else { //se não tem ID ele cadastra
      await api.post('/task', {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}.000`,
      }).then(() => {
        navigation.navigate('Home'); //se deu certo ele volta para home
      });
    }
  }

  async function LoadTask() {
    await api.get(`/task/${id}`,)
      .then((response) => {
        setLoad(true);
        setDone(response.data.done);
        setType(response.data.type);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDate(response.data.when);
        setHour(response.data.when);
      })
  }

  async function getMacAddress() {
    await Network.getMacAddressAsync().then(mac => {
      setMacaddress(mac);
      setLoad(false);
    })
  }

  async function DeleteTask() {
    await api.delete(`/task/${id}`)
      .then(response => {
        navigation.navigate('Home');
      });
  }

  async function Remove() {
    Alert.alert(
      'Remover Tarefa',
      'Deseja realmente remover essa tarefa?',
      [
        { text: 'Cancelar' },
        { text: 'Confirmar', onPress: () => DeleteTask()},
      ],
      { cancelable: true }
    )
  }

  useEffect(() => { //didMounth();
    getMacAddress();

    if (navigation.state.params) {
      setId(navigation.state.params.idTask) //passando parametro para editar
      LoadTask().then(() => {
        setLoad(false);
      })
    }

  }, [macaddress]);

  return (
    <View behavior='padding' style={styles.container}>
      <Header showBack={true} navigation={navigation} />
      {
        load ? <ActivityIndicator color={'#EE6B26'} size={50} style={{ marginTop: 150 }} /> :
          <ScrollView style={{ width: '100%' }}>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
              style={{ marginVertical: 10 }}>
              {
                typeIcons.map((icon, index) => (
                  icon != null &&
                  <TouchableOpacity key={index} onPress={() => setType(index)}>
                    <Image source={icon}
                      style={[styles.imageIcon, type && type != index && styles.typeIconInative]} />
                  </TouchableOpacity>
                ))
              }
            </ScrollView>

            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} maxLength={20}
              placeholder='Lembre-me de fazer'
              onChangeText={(text) => setTitle(text)}
              value={title} />

            <Text style={styles.label}>Detalhes</Text>
            <TextInput style={styles.inputArea} maxLength={200}
              placeholder='Detalhes da atividade' multiline={true}
              onChangeText={(text) => setDescription(text)}
              value={description} />

            <DateTimeInput type={'date'} save={setDate} date={date} />
            <DateTimeInput type={'hour'} save={setHour} hour={hour} />

            {
              id && //se id existir
              <View style={styles.inLine}>
                <View style={styles.inputInline}>
                  <Switch onValueChange={() => setDone(!done)}
                    value={done} thumbColor={done ? '#00761B' : '#EE6B26'} />
                  <Text style={styles.switchLabel}>Concluído</Text>
                </View>
                <TouchableOpacity onPress={Remove}>
                  <Text style={styles.removeLabel}>EXCLUIR</Text>
                </TouchableOpacity>
              </View>
            }
          </ScrollView>

      }
      <Footer icon={'save'} onPress={SaveTask} />
    </View>
  )
}