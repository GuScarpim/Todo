import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  filter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: 70,
    alignItems: 'center',
  },
  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#EE6B26',
  },
  filterTextInatived: {
    color: '#20295F',
    fontWeight: 'bold',
    fontSize: 18,
    opacity: 0.5,
  },
  content: {
    width: '100%',
    marginTop: 10,
    marginBottom: 70,
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#20295F',
    alignItems: 'center',
  },
  titleText: {
    color: '#20295F',
    fontSize: 18,
    position: 'relative',
    top: 11,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
});

export default styles;