import {useState} from 'react';
import { ChromePicker } from 'react-color';

export default function ColorPicker() {
  const [Color, setColor] = useState("#fff")

 const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
    return (
    <div className="container">
      <ChromePicker
        color={ Color }
        onChangeComplete={ handleChangeComplete }
        width={300}/>
        </div>
    );
}