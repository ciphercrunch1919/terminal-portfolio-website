"use client"

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useTypingEffect } from '../hooks/typing-effect';
import Banner from './commands/banner';
import About from './commands/about';
import Education from './commands/education';
import Resume from './commands/resume';
import Help from './commands/help';
import Social from './commands/social';
import Projects from './commands/projects';
//import CommandLine from './commands/commandLine'

export const Terminal = () => {
  
  const visitor = useTypingEffect("visitor@ciphercrunch:~$", 20);
  
  //visitor@ciphercrunch:~$
  
  /* <p><span style={{color:'#0077aa'}}>visitor</span>@ciphercrunch:~$</p> */
  
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [clear, setClear] = useState(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  /* One Time toggle that makes the banner appear originally 
  but will clear out once the 'clear' command is executed */
  const welcome = (clear: boolean) =>{
    if(clear === true){
      return <Banner />
    };
    return;
  }
  
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      processInput(inputValue);
      setCommandHistory([inputValue, ...commandHistory]);
      setInputValue('');
    }, 
    [inputValue, commandHistory]
  );
  
  const clearHistory = () =>{
    setCommandHistory([]);
  }
  
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    },
    [inputValue]
  );
  
  const clickHandler = () => {
    inputRef.current && inputRef.current.focus();
  };
  
  const processInput = (command: string): string[] => {
    let input = command.split(" ");

    if (input.length > 2) {
      const cmd = input.splice(0, 1);
      const args = input.join(" ");
      return (input = [...cmd, args]);
    }

    return [...input];
  };
  
  const terminalOutput = (command: string) => {
    const [cmd, arguement] = processInput(command);
    
    switch (cmd.toLowerCase()) {
      /* These are split into seperate functions to make code 
      clearer and easier to understand */
      case "help":
        return <Help />
        break;
        
      case "about":
        return <About />
        break;
        
      case "education":
        return <Education />
        break;
        
      case "resume":
        return <Resume />
        break;
        
      case "projects":
        return <Projects />
        break;
        
      case "social":
        return <Social />
        break;
      
      case "banner":
        return <Banner />
        break;
        
      case "clear":
        clearHistory();
        /* Used to toggle the welcome function only once */
        if(clear === true){
          setClear(clear => !clear);
        }
        break;
        
      default:
        return (
          <>
            <p>
              <span className='text-red-600'>Command not found!: </span>
              <span>
                Try the <b>help</b> command to see a list of available
                commands
              </span>
            </p>
          </>
        );
    }
  };
  
  return (
    <div onClick={() => clickHandler()}>
      <div>
        {welcome(clear)}
        {commandHistory.map((item, index) => (
          <div key={index}>
            <Suspense fallback={<></>}>
              <p>visitor@ciphercrunch:~$ {item}</p><p>{terminalOutput(item)}</p>
            </Suspense>
          </div>
        )).reverse()}
        
        <div className='flex snap-end terminal-prompted'>
          <div className='flex'><label>{visitor}</label></div>
          <div className='terminal-input'>
            <form onSubmit={(event) => handleSubmit(event)} data-testid="terminalForm">
                <input
                  data-testid="terminalInput"
                  spellCheck="false"
                  ref={inputRef}
                  type="text"
                  autoFocus={true}
                  value={inputValue}
                  onChange={(event) => handleInputChange(event)}
                />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};