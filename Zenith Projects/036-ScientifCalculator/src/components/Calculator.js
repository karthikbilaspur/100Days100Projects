import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import History from './History';
import Memory from './Memory';
import UnitConverter from './UnitConverter';
import GraphingCalculator from './GraphingCalculator';
import FinancialCalculator from './FinancialCalculator';
import ComplexNumbers from './ComplexNumbers';
import MatrixOperations from './MatrixOperations';
import VectorOperations from './VectorOperations';
import CalculusOperations from './CalculusOperations';
import StatisticsOperations from './StatisticsOperations';
import CustomizableLayout from './CustomizableLayout';
import Themes from './Themes';
import HistoryManagement from './HistoryManagement';
import ButtonShortcuts from './ButtonShortcuts';
import ScreenReaderSupport from './ScreenReaderSupport';
import HighContrastMode from './HighContrastMode';
import KeyboardOnlyNavigation from './KeyboardOnlyNavigation';
import CloudSyncing from './CloudSyncing';
import Collaboration from './Collaboration';
import OnlineHelpResources from './OnlineHelpResources';
import DataEncryption from './DataEncryption';
import PasswordProtection from './PasswordProtection';
import VoiceInput from './VoiceInput';
import BarcodeScanning from './BarcodeScanning';
import QRCodeGeneration from './QRCodeGeneration';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState('');
  const [unitConversion, setUnitConversion] = useState({});

  const handleInput = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      const calculation = eval(input);
      setResult(calculation);
      setHistory([...history, `${input} = ${calculation}`]);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleMemorySave = () => {
    setMemory(input);
  };

  const handleMemoryRecall = () => {
    setInput(memory);
  };

  const handleUnitConversion = (unitType, value) => {
    const conversionRate = unitConversion[unitType];
    const convertedValue = value * conversionRate;
    setResult(convertedValue);
  };

  return (
    <div className="calculator">
      <Display input={input} result={result} />
      <div className="button-grid">
        <Button value="7" onClick={() => handleInput('7')} />
        <Button value="8" onClick={() => handleInput('8')} />
        <Button value="9" onClick={() => handleInput('9')} />
        <Button value="/" onClick={() => handleInput('/')} />
        <Button value="4" onClick={() => handleInput('4')} />
        <Button value="5" onClick={() => handleInput('5')} />
        <Button value="6" onClick={() => handleInput('6')} />
        <Button value="*" onClick={() => handleInput('*')} />
        <Button value="1" onClick={() => handleInput('1')} />
        <Button value="2" onClick={() => handleInput('2')} />
        <Button value="3" onClick={() => handleInput('3')} />
        <Button value="-" onClick={() => handleInput('-')} />
        <Button value="0" onClick={() => handleInput('0')} />
        <Button value="." onClick={() => handleInput('.')} />
        <Button value="=" onClick={handleCalculate} />
        <Button value="C" onClick={handleClear} />
        <Button value="M+" onClick={handleMemorySave} />
        <Button value="MR" onClick={handleMemoryRecall} />
        <Button value="Unit Conversion" onClick={() => handleUnitConversion('length', input)} />
        <ComplexNumbers />
        <MatrixOperations />
        <VectorOperations />
        <CalculusOperations />
        <StatisticsOperations />
        <CustomizableLayout />
        <Themes />
        <HistoryManagement />
        <ButtonShortcuts />
        <ScreenReaderSupport />
        <HighContrastMode />
        <KeyboardOnlyNavigation />
        <CloudSyncing />
        <Collaboration />
        <OnlineHelpResources />
        <DataEncryption />
        <PasswordProtection />
        <VoiceInput />
        <BarcodeScanning />
        <QRCodeGeneration />
      </div>
      <History history={history} />
      <Memory memory={memory} />
      <UnitConverter unitConversion={unitConversion} />
      <GraphingCalculator />
      <FinancialCalculator />
    </div>
  );
};

export default Calculator;