"use client"

import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { useTypingEffect } from '../hooks/typing-effect'; // Custom hook for typing effect
import Banner from './commands/banner'; // Terminal banner (welcome message)
import About from './commands/about'; // About command
import Education from './commands/education'; // Education command
import Resume from './commands/resume'; // Resume command
import Help from './commands/help'; // Help command
import Social from './commands/social'; // Social links command
import Projects from './commands/projects'; // Projects command

export const Terminal = () => {
  const visitor = useTypingEffect("visitor@ciphercrunch:~$", 20); //Terminal's prompt line, simulating a typing effect
  const [inputValue, setInputValue] = useState<string>(''); //State for the current input value typed by the user
  const [commandHistory, setCommandHistory] = useState<string[]>([]); //Command history state that stores previously entered commands
  const [clear, setClear] = useState(true); //Boolean state for clearing the terminal
  const [commandIndex, setCommandIndex] = useState(-1); //State to keep track of the user's navigation in the command history
  const inputRef = useRef<HTMLInputElement>(null); //Reference to the input field for focus control
  const availableCommands = ['help', 'about', 'education', 'resume', 'projects', 'social', 'banner', 'clear']; //Array of available commands for auto-complete
  const [command, setCommand] = useState<string>(''); // Track the current command

  // Focuses the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Function to process input and split it into command and arguments
  const processInput = (command: string): string[] => {
    let input = command.split(" ");
    
    // If the input has more than two elements, join everything after the command into arguments
    if (input.length > 2) {
      const cmd = input.splice(0, 1); // Extract the command
      const args = input.join(" "); // Join the rest as arguments
      return [...cmd, args]; // Return both command and arguments
    }
    
    // Return the command and arguments separately
    return [...input];
  };

  // Function that handles terminal commands and returns their output
  const terminalOutput = (command: string) => {
    const [cmd, ...args] = processInput(command); // Process the input to extract command and arguments

    // Switch block to handle different commands
    switch (cmd.toLowerCase()) {
      case "help":
        return <Help />; // Display help message
      case "about":
        return <About />; // Display about section
      case "education":
        return <Education />; // Display education section
      case "resume":
        return <Resume />; // Display resume
      case "projects":
        return <Projects />; // Display projects
      case "social":
        return <Social />; // Display social links
      case "banner":
        return <Banner />; // Display banner (welcome message)
      case "echo":
        return <p>{args.join(" ")}</p>; // Echo the arguments back to the user
      case "clear":
        clearHistory(); // Clear the command history
        if (clear === true) {
          setClear(clear => !clear); // Toggle clear state
        }
        break;
      default:
        // Default case for unrecognized commands
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

  // Clears the command history
  const clearHistory = () => {
    setCommandHistory([]);
  };

  // Function to handle the form submission (when the user presses Enter)
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload on form submission

    // If there's input, process the command
    if (inputValue.trim()) {
      processInput(inputValue); // Process the command
      setCommandHistory([inputValue, ...commandHistory]); // Add the command to history
      setInputValue(''); // Clear the input
      setCommandIndex(-1); // Reset the command history index
    }
  }, [inputValue, commandHistory]);

  // Handles changes to the input field
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
    setInputValue(event.target.value); // Update the input value
  }, []);

  // Handles key events like up/down arrow for history and Tab for auto-complete
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
      handleTabAutoComplete(); // Trigger auto-complete
    }

    // Handle Ctrl + L (Clear terminal output)
    if (event.ctrlKey && event.key === 'l') {
      event.preventDefault();
      clearHistory(); // Clear terminal
      if (clear === true) {
        setClear(clear => !clear); // Toggle clear state
      }
    }
  };

  // Handles auto-complete functionality
  const handleTabAutoComplete = () => {
    if (inputValue.length === 0) return; // No input, do nothing

    // Find commands that start with the current input
    const matches = availableCommands.filter((cmd) =>
      cmd.startsWith(inputValue)
    );

    // If there's only one match, auto-complete the input
    if (matches.length === 1) {
      setInputValue(matches[0]);
    } else if (matches.length > 1) {
      // If multiple matches, show available options
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

  // Handles clicking on the terminal to refocus the input
  const clickHandler = () => {
    inputRef.current?.focus(); // Refocus the input field
  };

  // Function to display the welcome message/banner when the terminal is cleared
  const welcome = (clear: boolean) => {
    if (clear === true) {
      return <Banner />;
    }
    return;
  };

  return (
    <div onClick={clickHandler}> {/* When terminal is clicked, refocus on input */}
      <div>
        {welcome(clear)} {/* Display banner if terminal is cleared */}
        {commandHistory.map((item, index) => (
          <div key={index}>
            <Suspense fallback={<></>}>
              {/* Display the command and the output */}
              <p>visitor@ciphercrunch:~$ {item}</p>
              <p>{terminalOutput(item)}</p>
            </Suspense>
          </div>
        )).reverse()}
        
        <div className='flex snap-end terminal-prompted'>
          <div className='flex'>{visitor}</div> {/* Terminal prompt */}
          <div className='terminal-input'>
            <form onSubmit={handleSubmit} data-testid="terminalForm">
              <input
                data-testid="terminalInput"
                spellCheck="false"
                ref={inputRef} // Attach input reference for focus control
                type="text"
                autoFocus
                value={inputValue} // Bind input value to state
                onChange={handleInputChange} // Update state when input changes
                onKeyDown={handleKeyDown} // Capture key events (for history, autocomplete, etc.)
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;