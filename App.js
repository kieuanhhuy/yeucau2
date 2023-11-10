import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const FoodList = () => {
  const [foodData, setFoodData] = useState([
    { id: '1', name: 'Bún riêu cua', description: 'Món ngon từ cua' },
    { id: '2', name: 'Phở bò', description: 'Món ngon từ thịt bò' },
    { id: '3', name: 'Gỏi cuốn', description: 'Món ngon từ rau sống và tôm' },
    { id: '4', name: 'Bánh mì nướng', description: 'Món ngon từ bánh mì và phô mai' },
    // Thêm các món ăn khác vào đây
  ]);

  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodDescription, setNewFoodDescription] = useState('');
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Thêm trạng thái để kiểm tra xem người dùng đang sửa món hay không

  const addFood = () => {
    if (newFoodName.trim() !== '') {
      const newFood = {
        id: `${foodData.length + 1}`,
        name: newFoodName,
        description: newFoodDescription,
      };

      setFoodData([...foodData, newFood]);
      setNewFoodName('');
      setNewFoodDescription('');
    }
  };

  const editFood = () => {
    if (editingFoodId) {
      const updatedFoodData = foodData.map((food) => {
        if (food.id === editingFoodId) {
          return {
            ...food,
            name: newFoodName,
            description: newFoodDescription,
          };
        }
        return food;
      });

      setFoodData(updatedFoodData);
      setEditingFoodId(null);
      setNewFoodName('');
      setNewFoodDescription('');
      setIsEditing(false); // Chuyển về trạng thái thêm món sau khi sửa xong
    }
  };

  const deleteFood = (foodId) => {
    const updatedFoodData = foodData.filter((food) => food.id !== foodId);
    setFoodData(updatedFoodData);
  };
  
  const backAdd = () => {
    setIsEditing(false); // Chuyển về trạng thái thêm món khi người dùng nhấn nút "Trở lại thêm món"
    setNewFoodName('');
    setNewFoodDescription('');
    setEditingFoodId(null);
    
  };

  const startEditing = (foodId, foodName, foodDescription) => {
    setEditingFoodId(foodId);
    setNewFoodName(foodName);
    setNewFoodDescription(foodDescription);
    setIsEditing(true); // Chuyển sang trạng thái sửa món khi người dùng nhấn nút "Sửa món"
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemid}>
        <Text style={styles.itemidText}>{item.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      {isEditing ? (
        <View>
        <><TouchableOpacity onPress={() => deleteFood(item.id)}>
          <View style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Xoá</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={backAdd}>
          <Text style={styles.deleteButtonText}>Thêm</Text>
        </TouchableOpacity>
        </>
        </View>
      ) : (
        <>
        <View>
        <TouchableOpacity onPress={() => deleteFood(item.id)}>
          <View style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Xoá</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => startEditing(item.id, item.name, item.description)}>
          <View style={styles.editButton}>
            <Text style={styles.deleteButtonText}>Sửa</Text>
          </View>
        </TouchableOpacity>
      </View>
      </>)}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foodData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Tên món ăn"
          value={newFoodName}
          onChangeText={(text) => setNewFoodName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mô tả"
          value={newFoodDescription}
          onChangeText={(text) => setNewFoodDescription(text)}
          style={styles.input}
        />
        {editingFoodId ? (
          <Button title="Lưu sửa" onPress={editFood} />
        ) : (
          <Button title="Thêm món" onPress={addFood} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  itemid: {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 18,
    padding: 5,
    borderRadius: 100,
    width: 30,
    height: 30,
    alignItems: 'center',
  },
  itemidText: {
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    width: 50,
    margin: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    width: 50,
    margin: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  row: {
  }
});

export default FoodList;