import { useState, useCallback, useEffect, useRef } from 'react';

const PasswordGeneratorApp = () => {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passwordInputRef = useRef(null);

  const generatePassword = useCallback(() => {
    let password = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSpecialChars) characters += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(charIndex);
    }

    setGeneratedPassword(password);
  }, [passwordLength, includeNumbers, includeSpecialChars]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordInputRef.current?.select();
    passwordInputRef.current?.setSelectionRange(0, 999);
    document.execCommand('copy');
  }, []);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeNumbers, includeSpecialChars, generatePassword]);

  return (
    <div className="bg-black p-8 rounded-lg max-w-md mx-auto mt-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
      <div className="mb-4">
        <input
          type="text"
          value={generatedPassword}
          className="w-full p-2 bg-gray-800 text-white rounded-md"
          placeholder="Generated Password"
          readOnly
          ref={passwordInputRef}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="text-white">Length: {passwordLength}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={passwordLength}
            className="w-full"
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={includeNumbers}
            id="numberInput"
            onChange={() => setIncludeNumbers((prev) => !prev)}
          />
          <label className="text-white" htmlFor="numberInput">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={includeSpecialChars}
            id="characterInput"
            onChange={() => setIncludeSpecialChars((prev) => !prev)}
          />
          <label className="text-white" htmlFor="characterInput">
            Include Special Characters
          </label>
        </div>
      </div>
      <button
        onClick={copyPasswordToClipboard}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md"
      >
        Copy Password
      </button>
    </div>
  );
};

export default PasswordGeneratorApp;
