import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  contentHome: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: '2.5%',
    flex: 1,
    marginTop: 20
  },
  tittle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28303B',
  },
  textButton: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#FFF',
  },
  link: {
    color: '#FFF',
    marginTop: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  buttittle: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 20,
  },
  
  everypaydivlogo: {
    backgroundColor: '#FFF',
    padding: 6,
    borderRadius: 10
    // marginHorizontal: '10%'
  },   
  containerMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  containerCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerCard: {
    padding: 5,
    height: 40,
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
  },
  headerCardTittle: {
    textAlign: 'left',
  },
  icon: {
    fontSize: 32,
    color: '#FFF',
    marginLeft: 5,
  },
  footerMain: {
    backgroundColor: '#FFF',
  },
  footerContainer: {
    backgroundColor: '#13293D',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  }
});

export default globalStyles;
