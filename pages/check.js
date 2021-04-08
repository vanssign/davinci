import React, { useRef, useEffect } from 'react';

function Example() {

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <form>
      <textarea type="text" placeholder="Enter e-mail" ref={inputRef} />
      <input type="password" placeholder="Enter password" />
      <input type="submit" />
    </form>
  );
}

export default Example;