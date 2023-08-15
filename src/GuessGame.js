import React, { useState } from 'react';
import { Button, Form, } from 'react-bootstrap';
import GuessForm from './GuessForm';
import { FaArrowLeft } from 'react-icons/fa';

const GuessGame = () => {
    const [genieGuess, setGenieGuess] = useState(null);
    const [remainders, setRemainders] = useState([null, null, null]);
    const [resultMsg, setResultMsg] = useState('');

    const handleUserInput = (event, index) => {
        const newRemainders = [...remainders];
        newRemainders[index] = Number(event.target.value);
        setRemainders(newRemainders);
        adjustGenieGuess(newRemainders);
    };
  
    const adjustGenieGuess = (newRemainders) => {

      let adjustedGuess = 0;

      for (let guess = 1; guess <= 100; guess++) {
        const isDivisibleByThree = guess % 3 === newRemainders[0];
        const isDivisibleByFive = guess % 5 === newRemainders[1];
        const isDivisibleBySeven = guess % 7 === newRemainders[2];
  
        if (isDivisibleByThree && isDivisibleByFive && isDivisibleBySeven) {
          adjustedGuess = guess;
          break;
        }
      }

      setGenieGuess(adjustedGuess);
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const resetFunction = (event) => {
        event.preventDefault();

        setGenieGuess(null);
        setRemainders([null,null,null]);
        setShowFirstInput(false);
        setResultMsg('');
        setShowButton(false);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();

        setResultMsg(`The Genie guessed your number, it's ${genieGuess} !`);
        setIsSubmitted(true);
        setShowButton(true);
    };

    const [showFirstInput, setShowFirstInput] = useState(false);

    const handleShowFirstInput = () => {
        setShowFirstInput(true);
    };


    return (
        <div class="container">
            <div class="row m-5">
                <div class="col-md-12">
                    <h1 class='genie-title'>
                        <b>G</b>enie <b>G</b>uess <b>I</b>t !
                    </h1>
                    <hr />
                    <p class='mt-4'>
                        Think of a <b style={{ color: '#ff6600' }}>number</b> from 1 to 100 and let's call it <b style={{ color: '#6a5acd' }}>G</b>.
                    </p>

                    {!showFirstInput && 
                        <p>
                            Done thinking? Click 
                            <Button 
                                className='button-color-1'
                                size='sm' 
                                style={{ marginLeft: '6px' }} 
                                onClick={handleShowFirstInput}
                            >
                                Let's start
                            </Button>
                        </p>
                    }
                    

                    {showFirstInput && 
                        <>

                        <div class="row">
                            <div class="col-md-12">
                                <Button
                                    className='button-color-return'
                                    size='sm'
                                    style={{ float: 'left' }}
                                    onClick={resetFunction}
                                >
                                    <FaArrowLeft style={{ marginRight: '3px' }}/>
                                    Return
                                </Button>
                            </div>
                        </div>
                            
                            <GuessForm remainders={remainders} onUserInput={handleUserInput} onSubmit={handleSubmit} />
                        </>
                    }

                    {isSubmitted && showButton &&
                        <>
                            <hr />
                            <div class="row mt-3">
                                <div class="col-md-8">
                                    <p>
                                        {resultMsg}
                                    </p>
                                </div>
                                <div class="col-md-4">
                                    <Button
                                        className='button-color-again'
                                        size='sm'
                                        onClick={resetFunction}
                                    >
                                        Try Again!
                                    </Button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            
        </div>
    );
};

export default GuessGame;