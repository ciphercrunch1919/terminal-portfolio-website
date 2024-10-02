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

export const Terminal = () => {
  const visitor = useTypingEffect("visitor@ciphercrunch:~$", 20);
  
  const [inputValue, setInputValue] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [clear, setClear] = useState(true);
  const [commandIndex, setCommandIndex] = useState(-1); // Used for navigating history
  const inputRef = useRef<HTMLInputElement>(null);
  
  // List of available commands for auto-complete
  const availableCommands = ['help', 'about', 'education', 'resume', 'projects', 'social', 'banner', 'clear'];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const welcome = (clear: boolean) => {
    if (clear === true) {
      return <Banner />;
    }
    return;
  };

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      processInput(inputValue);
      setCommandHistory([inputValue, ...commandHistory]);
      setInputValue('');
      setCommandIndex(-1); // Reset index after submitting
    }
  }, [inputValue, commandHistory]);

  const clearHistory = () => {
    setCommandHistory([]);
  };

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

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
    const [cmd, ...args] = processInput(command);
    
    switch (cmd.toLowerCase()) {
      case "help":
        return <Help />;
      case "about":
        return <About />;
      case "education":
        return <Education />;
      case "resume":
        return <Resume />;
      case "projects":
        return <Projects />;
      case "social":
        return <Social />;
      case "banner":
        return <Banner />;
      case 'echo':
        return <p>{args.join(" ")}</p>;
      case "clear":
        clearHistory();
        if (clear === true) {
          setClear(clear => !clear);
        }
        break;
      default:
        return (
          <>
            <p>
              <span className='text-red-600 font-bold'>Command not found!: </span>
              <span>Try the <b className='shadowText'>help</b> command to see a list of available commands</span>
            </p>
          </>
        );
    }
  };

  // Handle key events for navigation and autocomplete
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Arrow Up (Navigate up in history)
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.min(commandIndex + 1, commandHistory.length - 1);
        setCommandIndex(newIndex);
        setInputValue(commandHistory[newIndex] || '');
      }
    }

    // Handle Arrow Down (Navigate down in history)
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = Math.max(commandIndex - 1, -1);
        setCommandIndex(newIndex);
        setInputValue(commandHistory[newIndex] || '');
      }
    }

    // Handle Tab (Auto-complete logic)
    if (event.key === 'Tab') {
      event.preventDefault();
      handleTabAutoComplete(); // Trigger auto-complete logic
    }

    // Handle Ctrl + L (Clear terminal output)
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      clearHistory(); // Clear the terminal
      if (clear === true) {
        setClear(clear => !clear);
      }
    }
  };

  const handleTabAutoComplete = () => {
    if (inputValue.length === 0) return; // No input, do nothing

    // Filter available commands based on current input
    const matches = availableCommands.filter((cmd) =>
      cmd.startsWith(inputValue)
    );

    // If there's only one match, auto-complete it
    if (matches.length === 1) {
      setInputValue(matches[0]);
    } else if (matches.length > 1) {
      // If multiple matches, output the list of possibilities
      setCommandHistory((prevHistory) => [
        `$ ${inputValue}`,
        ...prevHistory,
      ]);
      setCommandHistory((prevHistory) => [
        matches.join('  '), // Display available options
        ...prevHistory,
      ]);
    }
  };

  const clickHandler = () => {
    inputRef.current?.focus();
  };

  return (
    <div onClick={clickHandler}>
      <div>
        {welcome(clear)}
        {commandHistory.map((item, index) => (
          <div key={index}>
            <Suspense fallback={<></>}>
              <p>visitor@ciphercrunch:~$ {item}</p>
              <p>{terminalOutput(item)}</p>
            </Suspense>
          </div>
        )).reverse()}
        
        <div className='flex snap-end terminal-prompted'>
          <div className='flex'><label>{visitor}</label></div>
          <div className='terminal-input'>
            <form onSubmit={handleSubmit} data-testid="terminalForm">
              <input
                data-testid="terminalInput"
                spellCheck="false"
                ref={inputRef}
                type="text"
                autoFocus
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Capture key actions here
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;