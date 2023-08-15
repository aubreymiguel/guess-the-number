import React from 'react';
import { useState } from 'react';
import { Button, Form, } from 'react-bootstrap';

const GuessForm = ({ remainders, onUserInput, onSubmit }) => {

    const [inputFields, setInputFields] = useState([
        { label: "", value: remainders[0] || null },
        { label: "", value: remainders[1] || null },
        { label: "", value: remainders[2] || null }
      ]);
      
    const handleChange = (event, index) => {

        const newInputFields = [...inputFields];
        newInputFields[index].value = Number(event.target.value);
        setInputFields(newInputFields);
        onUserInput(event, index);

    };

    const isSubmitDisabled = inputFields.some((inputField) => inputField.value === null || inputField.value === '');
    const isSubmitVisible = !isSubmitDisabled;
  
    const handleSubmit = (event) => {
      onSubmit(event);
    };
  
    return (
    
        <Form onSubmit={handleSubmit}>

            <div class="mt-5">
                {
                    <>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <Form.Label>
                                    Divide <b>G</b> by 3 and input the remainder
                                </Form.Label>
                            </div>
                            <div class="col-md-6">
                                <Form.Control
                                    name='numbers'
                                    type="number"
                                    value={inputFields.value}
                                    onChange={(event) => handleChange(event, 0)}
                                    required />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <Form.Label>
                                    Next is, divide <b>G</b> by 5 and input the remainder
                                </Form.Label>
                            </div>
                            <div class="col-md-6">
                                <Form.Control
                                    name='numbers'
                                    type="number"
                                    value={inputFields.value}
                                    onChange={(event) => handleChange(event, 1)}
                                    required />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <Form.Label>
                                    Finally, divide <b>G</b> by 7 and input the remainder
                                </Form.Label>
                            </div>
                            <div class="col-md-6">
                                <Form.Control
                                    name='numbers'
                                    type="number"
                                    value={inputFields.value}
                                    onChange={(event) => handleChange(event, 2)}
                                    required />
                            </div>
                        </div>
                    </>

                }

                <div class="row">
                    <div class="col-md-12">
                        
                    

                        {isSubmitVisible && (
                            <Button 
                                className='button-color-1'
                                type="submit"
                                size='sm'
                                style={{ float: 'right' }}
                            >
                                Submit
                            </Button>
                        )}
                     </div>
                </div>
            </div>
            
        </Form>

    );
  };
  
  export default GuessForm;