import React from 'react';

const Help: React.FC = () => {
    return (
      <>
            <div>
              <p><span className={'shadowText'}>about</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Who is Elena Coleman?</p>
              <p><span className={'shadowText'}>education</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View education background</p>
              <p><span className={'shadowText'}>resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View latest terminal resume and download pdf of updated resume</p>
              <p><span className={'shadowText'}>projects</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View coding projects</p>
              <p><span className={'shadowText'}>social</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View LinkedIn and Github</p>
              <p><span className={'shadowText'}>echo [arg]</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Display lines of text or strings that are passed as arguments</p>
              <p><span className={'shadowText'}>banner</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Display welcome banner</p>
              <p><span className={'shadowText'}>clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Clear terminal page</p>
            </div>
      </>
    );
  };

export default Help;