import { Form } from "react-bootstrap";
import { generateRandom } from "./utility";

export const DatePickerComponent = ({ date, setDate, name, additionalData }) => {

  
  return (
    <Form.Control
      type="text"
      className="form-control"
      id={`dateInput${name}`}
      value={date}
      onChange={setDate}
      maxLength={10}
      placeholder="yyyy-mm-dd"
      name={name}
      ref={additionalData}
    />
  );
};
