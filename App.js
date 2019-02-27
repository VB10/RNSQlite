import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from "react-native";
import { BaseManager } from "./src/database/index";
export class App extends Component {
  manager = new BaseManager();

  constructor(props) {
    super(props);

    this.state = {
      datas: []
    };
  }
  createTable() {
    this.manager
      .createTable()
      .then(val => {
        alert("okey");
      })
      .catch(err => {
        alert("false");
      });
  }
  addTable() {
    this.manager
      .addTable("veli")
      .then(val => {
        alert("okey");
      })
      .catch(err => {
        alert("false");
      });
  }
  getTable() {
    this.manager
      .getTable()
      .then(val => {
        console.log(val);
        this.setState({
          datas: val
        });
      })
      .catch(err => {
        alert("false");
      });
  }
  removeTable() {
    this.manager
      .dropTable()
      .then(val => {
        this.setState({
          datas: []
        });
      })
      .catch(err => {
        alert("err");
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.view}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.createTable()}
          >
            <Text style={styles.text}>Create Table</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.getTable()}
          >
            <Text style={styles.text}>Get Table</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.addTable()}
          >
            <Text style={styles.text}>Add Table</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.removeTable()}
          >
            <Text style={styles.text}>Drop Table</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.datas}
          renderItem={data => {
            return <Text> {data.item.title}</Text>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

export default App;
const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white"
  },
  buttonGroup: {
    height: 50,
    flexDirection: "row"
  },
  button: {
    flex: 1,
    margin: 5,
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue"
  },
  text: {
    color: "white"
  }
});
