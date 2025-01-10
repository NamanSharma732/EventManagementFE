import React from "react";
import { Form } from "react-bootstrap";
import { DatePickerComponent } from "./DatePickerC";

const StepForm = ({
  heading,
  label,
  id,
  label1,
  id1,
  name,
  name1,
  value1,
  value,
  incChange,
  incChange1,
  key1,
  key2,
  key3,
  key4,
  additional, handleDateChange
}) => {


  const generateRandom = Math.floor(1000 + Math.random() * 9000);


  return (
    <div>
      {heading && <h5 className="mb-3">{heading}</h5>}
      <div className="row">
        {id && (
          <Form.Group className={`${id===undefined?"col-md-12":"col-md-6"} form-group`}>
            <Form.Label htmlFor={id}>{label}:</Form.Label>
            <Form.Control
              type={additional?"text":"number"}
              id={`${id}+${generateRandom}`}
              placeholder=""
              name={name}
              value={value}
              onChange={incChange}
              autoCapitalize={false}
              autoComplete={false}
              autoCorrect={false}
            />
          </Form.Group>
        )}
        {additional?
        <Form.Group className="col-md-6 form-group">
        <Form.Label htmlFor="bornplace">
          {label1}:
        </Form.Label>
        <DatePickerComponent
          date={value1}
          setDate={(date) =>handleDateChange(date, name1)}
          name={name1}
        />
      </Form.Group>:(id1 && (
          <Form.Group className={`${id1===undefined?"col-md-12":"col-md-6"} form-group`}>
            <Form.Label htmlFor={id1}>{label1}:</Form.Label>
            <Form.Control
              type={additional?"text":"number"}
              id={id1}
              placeholder=""
              name={name1}
              value={value1}
              onChange={incChange1}
              autoCapitalize={false}
              autoComplete={false}
              autoCorrect={false}
            />
          </Form.Group>
        ))
        }

      </div>
    </div>
  );
};

export default StepForm;

