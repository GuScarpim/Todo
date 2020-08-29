import React, { useState } from 'react';
import {
  TouchableOpacity,
  Image,
  DatePickerIOS,
} from 'react-native';

import styles from './styles';

import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';

import { format } from 'date-fns';

export default function ({ type, save, date, hour }) {
  const [datetime, setDateTime] = useState(new Date);

  useEffect(() => {
    //se tiver algum conteudo
    if (type == 'date' && date) {
      setDateTime(format(new Date(date), 'dd/MM/yyyy'));
      save(format(new Date(date), 'yyyy-MM-dd'));
    }

    if (type == 'hour' && hour) {
      setDateTime(format(new Date(hour), 'HH:mm'));
      save(format(new Date(hour), 'HH:mm:ss'));
    }
  }, [])

  async function selectDataOrHour() {
    //se for data que ele clicou, abre o calendario
    if (type == 'date') {
      const { action, year, month, day } = await DatePickerIOS.open({
        mode: 'calendar'
      });

      //Se a acao for de selecionar a data, ele guarda o estado
      if (action == DatePickerIOS.dateSetAction)
        setDateTime(`${day} - ${month} - ${year}`);
      save(format(new Date(year, month, day), 'yyyy-MM-dd'));
    } else {
      const { action, hour, minute } = await TimePickerIOS.open({
        is24Hour: true
      });

      if (action !== TimePickerIOS.dismissedAction)
        setDateTime(`${hour}:${minute}`);
      save(format(new Date(2020, 12, 1, hour, minute, 0, 0), 'HH:mm:ss'));
    }
  }

  return (
    <TouchableOpacity style={styles.input} onPress={selectDataOrHour}>
      <DatePickerIOS
        date={datetime}
        mode={type}
        minimumDate={new Date} //data e hora atual
        onDateChange={setDateTime}
      />
      <Image style={styles.iconTextInput}
        source={type == 'date' ? iconCalendar : iconClock} />

    </TouchableOpacity>
  )
}
