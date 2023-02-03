import { TextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef } from 'react';

interface UserInputProps {
  isGameActive: boolean;
  input: string;
  setInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserInput: React.FC<UserInputProps> = ({ isGameActive, input, setInput }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isGameActive) {
      inputRef.current?.focus();
    }
  }, [isGameActive]);

  return (
    <TextField
      variant="outlined"
      disabled={!isGameActive}
      ref={inputRef}
      value={input}
      onChange={setInput}
      placeholder="Type here..."
    />
  );
};

export default UserInput;
