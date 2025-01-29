import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar, ActivityIndicator, Title } from 'react-native-paper';
import { useAuthViewModel } from '../viewmodels/AuthViewModel';

const AuthScreen = ({ navigation }: any) => {
  const viewModel = useAuthViewModel();

  // Redirecionar se autenticado
  useEffect(() => {
    if (viewModel.isAuthenticated) {
      navigation.replace('Home');
    }
  }, [viewModel.isAuthenticated]);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Login</Title>

      <TextInput
        label="E-mail"
        value={viewModel.email}
        onChangeText={viewModel.setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        label="Senha"
        value={viewModel.password}
        onChangeText={viewModel.setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />

      {viewModel.isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : (
        <Button
          mode="contained"
          onPress={viewModel.handleLogin}
          style={styles.button}
          labelStyle={styles.buttonLabel}>
          Entrar
        </Button>
      )}

      <Snackbar
        visible={!!viewModel.error}
        onDismiss={() => viewModel.setError(null)}
        duration={3000}
        action={{ label: 'OK', onPress: () => viewModel.setError(null) }}>
        {viewModel.error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export default AuthScreen;