import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Network from 'expo-network';

import styles from './styles';
import Header from '../../components/Header';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { id } from 'date-fns/locale';

export default function QrCode({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null); //Permissao para abrir a camera
  const [scanned, setScanned] = useState(null); //para saber se capturou ou nao o qrcode

  async function getMacAddress() {
    await Network.getMacAddressAsync().then(mac => {
      Alert.alert(`Seu número é: ${mac}`);
    }).catch(error => (
      alert(error)
    ))
  }

  useEffect(() => {
    (async () => {
      //captura se o celular tem permissao para abrir a camera
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted') //se ele habilitou para abrir a camera
    })();
  }, []);

  const handleBarCodeSanned = ({ data }) => {
    setScanned(true); //foi escaneado
    if (data == 'getmacaddress') //se o que estiver no conteudo for igual ao macaddress que capturamos
      getMacAddress();
    else
      getMacAddress()
      // Alert.alert('QrCode Inválido');
  };
  return (
    <View style={styles.container}>
      {/* style={StyleSheet.absoluteFill} a camera ocupa a tela toda */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeSanned}
        style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Conectar com minha conta na web</Text>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textButton}>VOLTAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={scanned ? styles.buttonScanActive : styles.buttonScanInative} onPress={() => setScanned(false)}>
          <Text style={styles.textButton}>SCAN NOVAMENTE</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}