import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    name: '',
    link_img: '',
  });
  const dispatch = useDispatch();
  const  objects = useSelector((state) => state.count.objects)

  const getMovies = async () => {
     try {
      const response = await fetch('https://63477ff90484786c6e819ce3.mockapi.io/api/todo');
      const json = await response.json();
      setData(json);
      dispatch({
        type:'GET',
        item: json,
      })
      
    } catch (error) {
      crole.error(error);
    } finally {
      setLoading(false);
    }
  }
    const handleChange = (text,name) => {
      const   newData =  {...data}
        if (name ==="name") {
          newData.name = text
        }
        if (name ==="link") {
          newData.link_img = text
        }

        setData({...data,newData})
  }
  const handleSubmit = async () => {
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(data);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

await fetch("https://63477ff90484786c6e819ce3.mockapi.io/api/todo", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
  useEffect(() => {
    getMovies();
  },[objects]);
  const Item = ({name, link, uri}) => (
    <View style={styles.item}>
      {/* <Image  source={uri} style={styles.img} /> */}
      <View   style={styles.subitem} >
      <Text style={styles.title}>{name}</Text>
  
      </View>
      <Button title="Edit" color={'blue'}  width={15}/>
      <Button title="Delete" color={'red'}  width={15}/>
    </View>
  );

  const renderItem = ({item}) => (
    <Item name={item.name} link={item.link_img} />
  );
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <View  > 
        <View>
       
            <TextInput placeholder='Them ten'       onChangeText={(value) => handleChange("name", value)} /> 
            <TextInput placeholder='Them duong dan anh'   onChangeText={(value) => handleChange("link", value)}/> 
        </View>
        
          <Button title='add' onPress={handleSubmit}/>
      </View> 
      <View style={{marginTop: 20}}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={objects}
          keyExtractor={({ id }, index) => id}
          renderItem={renderItem}
        />
      )}  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    

    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  item: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  subitem: {
    flex: 2,
    flexDirection: 'column',
  },
  btn: {
    width: 10,
    backgroundColor: 'oldlace',
  },
  img: {
    width: 50,
    height: 50,
  },
});