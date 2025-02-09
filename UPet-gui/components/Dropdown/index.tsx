import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Java", value: "java" },
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
  ]);

  return (
    <View style={{ padding: 20 }}>
      <DropDownPicker
        open={open}
        setOpen={setOpen}  
        value={value}
        setValue={setValue} 
        items={items}
        setItems={setItems} 
        placeholder="Selecione uma opção"
        style={{ borderColor: "#ccc", borderRadius: 8 }}
        dropDownContainerStyle={{ borderColor: "#ccc" }}
      />
    </View>
  );
};

export default Dropdown;
