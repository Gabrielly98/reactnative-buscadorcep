import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";

import Api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [estado, setEstado] = useState("");

  async function buscarCep() {
    if (cep == "") {
      Alert.alert("Cep invalido ");
      setCep("");
    }

    try {
      const response = await Api.get(`/${cep}/json/`)
      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade)
      setEstado(response.data.uf)
    } catch (error) {
      console.log("erro ao consultar cep", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Buscador de CEP</Text>
      </View>

      <View style={styles.containerCep}>
        <TextInput
          style={styles.inputCep}
          value={cep}
          onChangeText={(texto) => setCep(texto)}
          placeholder="Cep"
        />

        <TouchableOpacity style={styles.botaoBuscar} onPress={buscarCep}>
          <Text style={styles.textoBotao}>Buscar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.caixaTexto}
        value={logradouro}
        onChangeText={(texto) => setLogradouro(texto)}
        placeholder="Logradouro"
      />
      <TextInput
        style={styles.caixaTexto}
        value={bairro}
        onChangeText={(texto) => setBairro(texto)}
        placeholder="Bairro"
      />
      <TextInput
        style={styles.caixaTexto}
        value={cidade}
        onChangeText={(texto) => setCidade(texto)}
        placeholder="Cidade"
      />
      <TextInput
        style={styles.caixaTextoEstado}
        value={estado}
        onChangeText={(texto) => setEstado(texto)}
        placeholder="Estado"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    height: 140,
    backgroundColor: "#018786",
  },
  title: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "flex-end",
    margin: 20,
  },
  containerCep: {
    flexDirection: "row",
    height: 100,
    marginHorizontal: 20,
  },
  inputCep: {
    borderColor: "#000000",
    borderWidth: 2,
    width: 200,
    fontSize: 18,
    marginTop: 20,
    marginEnd: 20,
    borderRadius: 10,
    padding: 15,
  },
  botaoBuscar: {
    backgroundColor: "#018786",
    width: 120,
    height: 70,
    marginTop: 30,
    marginEnd: 20,
    borderRadius: 10,
    padding: 20,
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  caixaTexto: {
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    margin: 20,
    height: 66,
  },
  caixaTextoEstado: {
    borderWidth: 2,
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    margin: 20,
    height: 66,
    width: 120,
  },
});
