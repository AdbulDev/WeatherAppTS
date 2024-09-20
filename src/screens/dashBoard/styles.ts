import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    paddingTop: wp('5%'),
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  settingsIcon: {
    marginRight: 10,
  },
  weatherInfo: {
    marginTop: 20,
  },
  weatherText: {
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  width: {
    width: wp('3%'),
  },
  top: {
    marginTop: hp('2%'),
  },
  top1: {
    marginTop: hp('1%'),
  },
  temp: {
    marginTop: hp('2%'),
    fontSize: 35,
    fontWeight: '600',
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems:"center",
    // justifyContent:"center"
  },
  city: {
    fontSize: 20,
    fontWeight: '600',
  },
  forecastText: {
    fontSize: 15,
  },
  error: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',
  },
  searchInput: {
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    padding: 10,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  separator: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  weatherIcon: {
    width: 45,
    height: 45,
    marginLeft: wp('2%'),
  },
});

export default styles;
