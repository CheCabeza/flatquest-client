import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Image,
  View,
  Text,
  Pressable,
} from 'react-native';
import {
  login,
  logout,
  registerUser,
} from './../../redux/actions/actionCreators';
import {connect} from 'react-redux';

function Login({navigation, user, dispatch}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  return (
    <View style={styles.page}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://i.ibb.co/pnC0kmd/Flat-Quest-Logo.png',
        }}
      />

      <TextInput
        testID="emailInput"
        style={styles.input}
        placeholder="email"
        autoCapitalize="none"
        onChangeText={emailText => setEmail(emailText)}
        value={email}
      />
      <TextInput
        testID="passwordInput"
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={passwordText => setPassword(passwordText)}
        value={password}
      />
      {user?.token === undefined ? (
        <>
          <Pressable
            testID="login"
            style={styles.button}
            onPress={() => {
              dispatch(login(email, password));
            }}>
            <Text style={styles.text}>Login</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Pressable
            testID="logout"
            style={styles.button}
            onPress={() => {
              setEmail('');
              setPassword('');
              dispatch(logout());
            }}>
            <Text style={styles.text}>Logout</Text>
          </Pressable>
          {navigation.navigate('List')}
        </>
      )}
      <>
        <Pressable
          testID="register"
          style={styles.button}
          onPress={() => dispatch(registerUser(email, password))}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: 300,
    height: 50,
    textAlign: 'center',
    fontSize: 25,
    margin: 15,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#397ED0',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#FFB800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 15,
    borderRadius: 25,
  },
  text: {
    fontSize: 20,
  },
  logo: {
    width: 350,
    height: 220,
  },
});

function mapStateToProps({user}) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Login);
