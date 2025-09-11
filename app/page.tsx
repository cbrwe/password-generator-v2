'use client';
import { useState, useCallback } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.';
    
    let characters = '';
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    
    if (characters === '') {
      alert('Please select at least one character type!');
      return;
    }
    
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }
    
    setPassword(generatedPassword);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = async () => {
    if (!password) {
      alert('Please generate a password first!');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        alert('Failed to copy password to clipboard');
      }
      
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-white p-2 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[600px] bg-white border border-gray-200 rounded-lg shadow-sm p-3">
        {/* Password display and controls row */}
        <div className="flex items-center gap-2 mb-2">
          {/* Password display section */}
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click Generate"
              className="w-full h-8 px-2 text-sm font-mono border border-gray-200 rounded bg-gray-50 focus:outline-none"
            />
          </div>
          
          {/* Generate button */}
          <button
            onClick={generatePassword}
            className="h-8 px-3 text-xs font-medium text-white rounded transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
            style={{
              background: 'linear-gradient(45deg, #AEC6CF 0%, #FFD1DC 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            Generate
          </button>
          
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            disabled={!password}
            className="h-8 px-3 text-xs font-medium border border-gray-300 rounded transition-colors duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {copied ? '✓' : 'Copy'}
          </button>
          
          {/* Length control */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-xs text-gray-600 whitespace-nowrap">Length:</span>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-12 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-xs text-gray-600 w-6 text-center">{length}</span>
          </div>
        </div>
        
        {/* Checkboxes row */}
        <div className="flex flex-wrap gap-3 justify-center">
          <label className="flex items-center cursor-pointer" title="Include uppercase letters">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500 mr-1"
            />
            <span className="text-xs text-gray-600">Uppercase</span>
          </label>
          
          <label className="flex items-center cursor-pointer" title="Include lowercase letters">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500 mr-1"
            />
            <span className="text-xs text-gray-600">Lowercase</span>
          </label>
          
          <label className="flex items-center cursor-pointer" title="Include numbers">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500 mr-1"
            />
            <span className="text-xs text-gray-600">Numbers</span>
          </label>
          
          <label className="flex items-center cursor-pointer" title="Include symbols">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500 mr-1"
            />
            <span className="text-xs text-gray-600">Symbols</span>
          </label>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #AEC6CF 0%, #FFD1DC 100%);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #AEC6CF 0%, #FFD1DC 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
