import React from 'react';

const Projects: React.FC = () => {
    return (
      <>
            <div>
              <p><a href="https://github.com/ciphercrunch1919/Personal-Heardle" target="_blank">Personal Heardle</a> - JavaScript</p>
              <p>&emsp;&emsp;A daily music game built with JavaScript, hosted on glitch.com.</p>
              <p><a href="https://github.com/ciphercrunch1919/RPSGame" target="_blank">RPS Game</a> - Java</p>
              <p>&emsp;&emsp;A variation of the Rock Paper Scissors game implemented in Java.</p>
              <p><a href="https://github.com/ciphercrunch1919/SuguruSolverAI" target="_blank">SuguruSolverAI</a> - Python</p>
              <p>&emsp;&emsp;A Python project utilizing AI heuristics to solve Suguru puzzles.</p>
              <p className={'shadowText'}>** click on name of project to view github **</p>
            </div>
      </>
    );
  };

export default Projects;