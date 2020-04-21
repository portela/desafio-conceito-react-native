import React, { useEffect, useState } from "react";

// Não possuem valor semântico (significado).
// Não possuem estilização própria.
// Todos componentes possuem por padrão "display: flex".
// Estilos devem ser em camelCase.
// onClick da web, vira onPress no react native.

// View: div, footer, header, main, aside, section
// Text: p, span, strong, h1, h2, h3

import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    async function loadData() {
      const response = await api.get(`/repositories`);
      setRepositories(response.data);
    }
    loadData();
  }, []);


  async function handleLikeRepository(id) {
    const response = await api.post(`/repositories/${id}/like`);
    const updatedRepo = response.data;
    const repoIndex = repositories.findIndex( r => r.id === id);
    const newRepositories = repositories.slice()
    newRepositories.splice(repoIndex, 1, updatedRepo);
    setRepositories([...newRepositories]);
  }


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={r => r.id}
          renderItem={({item: repository}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>
    
              <View style={styles.techsContainer}>
                {repository.techs.map( item => (
                  <Text key={item} style={styles.tech}>
                    {item}
                  </Text>
                ))}
              </View>
    
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>
    
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`repository-likes-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />



      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
