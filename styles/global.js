import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'UniformExtraCondensed-Light'
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '3.5%',
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
    marginBottom: 10,
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
    flex: 0,
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
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  textCondensedRegular: {
    fontFamily: 'UniformExtraCondensed-Light'
  },
  textRegular: {
    fontFamily: 'Uniform-Regular4'
  },
  textBold: {
    fontFamily: 'Uniform-ExtraCondensed2'
  },
  combobox: {
    height: 50,
    fontSize: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginVertical: 20,
    width: '100%',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 10,
  },
  datepicker: {
    height: 50,
    fontSize: 30,
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '100%',
    color: '#A00'
  },
  
});

export default globalStyles;
