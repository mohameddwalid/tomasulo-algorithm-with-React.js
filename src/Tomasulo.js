import React, { useState, useEffect } from 'react';

const Tomasulo = () => {
  // Individual number of rows for each station
  const [addSubFloatRows, setAddSubFloatRows] = useState(3); // Default: 3 rows
  const [mulDivFloatRows, setMulDivFloatRows] = useState(3);
  const [intAddSubRows, setIntAddSubRows] = useState(3);
  const [loadRows, setLoadRows] = useState(3);
  const [storeRows, setStoreRows] = useState(3);

  // Reservation station states
  const [addSubFloat, setAddSubFloat] = useState([]);
  const [mulDivFloat, setMulDivFloat] = useState([]);
  const [intAddSub, setIntAddSub] = useState([]);
  const [load, setLoad] = useState([]);
  const [store, setStore] = useState([]);

  // Instructions state
  const [instructions, setInstructions] = useState([]);
  const [inputInstructions, setInputInstructions] = useState('');
  const [instructionFile, setInstructionFile] = useState(null);
  const [latencies, setLatencies] = useState({}); // Latency state

  const opcodes = [
    'DADDI', 'DSUBI', 'ADD.D', 'ADD.S', 'SUB.D', 'SUB.S',
    'MUL.D', 'MUL.S', 'DIV.D', 'DIV.S', 'LW', 'LD', 'L.S',
    'L.D', 'SW', 'SD', 'S.S', 'S.D', 'BNE', 'BEQ',
  ];

  useEffect(() => {
    initializeTables();
  }, [addSubFloatRows, mulDivFloatRows, intAddSubRows, loadRows, storeRows]);

  const initializeTables = () => {
    const emptyAddSubFloat = Array.from({ length: parseInt(addSubFloatRows) }, () => ({
      busy: false,
      opcode: '',
      vj: '',
      vk: '',
      qj: '',
      qk: '',
      A: '',
    }));

    const emptyMulDivFloat = Array.from({ length: parseInt(mulDivFloatRows) }, () => ({
      busy: false,
      opcode: '',
      vj: '',
      vk: '',
      qj: '',
      qk: '',
      A: '',
    }));

    const emptyIntAddSub = Array.from({ length: parseInt(intAddSubRows) }, () => ({
      busy: false,
      opcode: '',
      vj: '',
      vk: '',
      qj: '',
      qk: '',
      A: '',
    }));

    const emptyLoad = Array.from({ length: parseInt(loadRows) }, () => ({
      busy: false,
      qi: '',
    }));

    const emptyStore = Array.from({ length: parseInt(storeRows) }, () => ({
      busy: false,
      qi: '',
      address: '',
    }));

    setAddSubFloat(emptyAddSubFloat);
    setMulDivFloat(emptyMulDivFloat);
    setIntAddSub(emptyIntAddSub);
    setLoad(emptyLoad);
    setStore(emptyStore);
  };

  const handleTextInput = () => {
    const lines = inputInstructions.split('\n');
    const parsedInstructions = lines.map((line) => {
      const parts = line.trim().split(' ');
      if (parts.length === 4) {
        return { instruction: line, value: '' };
      }
      return null;
    }).filter(Boolean);

    setInstructions([...instructions, ...parsedInstructions]);
    console.log(parsedInstructions);
  };

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    setInstructionFile(file);
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
  
      const parsedInstructions = lines.map((line) => {
        const cleanLine = line.replace(/\r/g, '');
        const parts = cleanLine.trim().split(' ');
        if (parts.length === 4) {
          return { instruction: cleanLine, value: '' };
        }
        return null;
      }).filter(Boolean);
  
      setInstructions([...instructions, ...parsedInstructions]);
      console.log(parsedInstructions);
    };
  
    if (file) {
      reader.readAsText(file);
    }
  };

  const handleLatencyInput = () => {
    const updatedInstructions = instructions.map((inst) => {
      const opcode = inst.instruction.split(' ')[0];
      const latency = latencies[opcode] || '';
      return { ...inst, value: latency };
    });
    setInstructions(updatedInstructions);
    console.log(updatedInstructions);
  };

  const handleLatencyChange = (opcode, latency) => {
    setLatencies({ ...latencies, [opcode]: latency });
  };

  const renderRows = (station, type) => {
    return station.map((row, index) => (
      <tr key={index} style={tableRowStyle}>
        <td style={tableCellStyle}>{row.busy.toString()}</td>
        <td style={tableCellStyle}>{row.opcode}</td>
        {type !== 'load' && type !== 'store' && (
          <>
            <td style={tableCellStyle}>{row.vj}</td>
            <td style={tableCellStyle}>{row.vk}</td>
            <td style={tableCellStyle}>{row.qj}</td>
            <td style={tableCellStyle}>{row.qk}</td>
          </>
        )}
        {type === 'store' && <td style={tableCellStyle}>{row.address}</td>}
        <td style={tableCellStyle}>{row.A || row.qi || ''}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h1>Tomasulo Algorithm - Reservation Stations</h1>

      {/* Add/Sub Float Table */}
      <div>
        <h2>Add/Sub Float Reservation Station</h2>
        <label>Number of Rows: </label>
        <input
          type="number"
          value={addSubFloatRows}
          onChange={(e) => setAddSubFloatRows(e.target.value)}
        />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Busy</th>
              <th style={tableHeaderStyle}>Opcode</th>
              <th style={tableHeaderStyle}>vj</th>
              <th style={tableHeaderStyle}>vk</th>
              <th style={tableHeaderStyle}>qj</th>
              <th style={tableHeaderStyle}>qk</th>
              <th style={tableHeaderStyle}>A</th>
            </tr>
          </thead>
          <tbody>{renderRows(addSubFloat, 'addSubFloat')}</tbody>
        </table>
      </div>

      {/* Mul/Div Float Table */}
      <div>
        <h2>Mul/Div Float Reservation Station</h2>
        <label>Number of Rows: </label>
        <input
          type="number"
          value={mulDivFloatRows}
          onChange={(e) => setMulDivFloatRows(e.target.value)}
        />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Busy</th>
              <th style={tableHeaderStyle}>Opcode</th>
              <th style={tableHeaderStyle}>vj</th>
              <th style={tableHeaderStyle}>vk</th>
              <th style={tableHeaderStyle}>qj</th>
              <th style={tableHeaderStyle}>qk</th>
              <th style={tableHeaderStyle}>A</th>
            </tr>
          </thead>
          <tbody>{renderRows(mulDivFloat, 'mulDivFloat')}</tbody>
        </table>
      </div>

      {/* Integer Add/Sub Table */}
      <div>
        <h2>Integer Add/Sub Reservation Station</h2>
        <label>Number of Rows: </label>
        <input
          type="number"
          value={intAddSubRows}
          onChange={(e) => setIntAddSubRows(e.target.value)}
        />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Busy</th>
              <th style={tableHeaderStyle}>Opcode</th>
              <th style={tableHeaderStyle}>vj</th>
              <th style={tableHeaderStyle}>vk</th>
              <th style={tableHeaderStyle}>qj</th>
              <th style={tableHeaderStyle}>qk</th>
              <th style={tableHeaderStyle}>A</th>
            </tr>
          </thead>
          <tbody>{renderRows(intAddSub, 'intAddSub')}</tbody>
        </table>
      </div>

      {/* Load Table */}
      <div>
        <h2>Load Reservation Station</h2>
        <label>Number of Rows: </label>
        <input
          type="number"
          value={loadRows}
          onChange={(e) => setLoadRows(e.target.value)}
        />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Busy</th>
              <th style={tableHeaderStyle}>Qi</th>
            </tr>
          </thead>
          <tbody>{renderRows(load, 'load')}</tbody>
        </table>
      </div>

      {/* Store Table */}
      <div>
        <h2>Store Reservation Station</h2>
        <label>Number of Rows: </label>
        <input
          type="number"
          value={storeRows}
          onChange={(e) => setStoreRows(e.target.value)}
        />
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Busy</th>
              <th style={tableHeaderStyle}>Qi</th>
              <th style={tableHeaderStyle}>Address</th>
            </tr>
          </thead>
          <tbody>{renderRows(store, 'store')}</tbody>
        </table>
      </div>

      {/* Input Instructions */}
      <div>
        <h2>Input Instructions</h2>
        <textarea
          rows="5"
          cols="50"
          value={inputInstructions}
          onChange={(e) => setInputInstructions(e.target.value)}
          placeholder="Enter instructions in format: Opcode R1 R2 R3"
        />
        <button onClick={handleTextInput}>Submit Instructions</button>

        <h3>OR</h3>
        <input type="file" accept=".txt" onChange={handleFileInput} />
      </div>

      {/* Latency Input */}
      <div>
        <h2>Set Latencies</h2>
        {opcodes.map((opcode) => (
          <div key={opcode}>
            <label>{opcode}: </label>
            <input
              type="number"
              value={latencies[opcode] || ''}
              onChange={(e) => handleLatencyChange(opcode, e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleLatencyInput}>Apply Latencies</button>
      </div>

      {/* Render Instruction Table */}
      <div>
        <h2>Instructions with Latencies</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Instruction</th>
              <th style={tableHeaderStyle}>Latency</th>
            </tr>
          </thead>
          <tbody>
            {instructions.map((inst, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{inst.instruction}</td>
                <td style={tableCellStyle}>{inst.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles for tables
const tableStyle = {
  border: '1px solid black',
  width: '100%',
  borderCollapse: 'collapse',
};

const tableHeaderStyle = {
  border: '1px solid black',
  padding: '5px',
  backgroundColor: '#f2f2f2',
};

const tableCellStyle = {
  border: '1px solid black',
  padding: '5px',
};

const tableRowStyle = {
  border: '1px solid black',
};

export default Tomasulo;
