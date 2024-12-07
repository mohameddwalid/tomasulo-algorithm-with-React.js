import React, { useState, useEffect } from 'react';

const Tomasulo = () => {
  let clock=0;
  let flag = true;

  // Individual number of rows for each station
  const [addSubFloatRows, setAddSubFloatRows] = useState(3);
  const [mulDivFloatRows, setMulDivFloatRows] = useState(3);
  const [intAddSubRows, setIntAddSubRows] = useState(3);
  const [loadRows, setLoadRows] = useState(3);
  const [storeRows, setStoreRows] = useState(3);
  const [cacheSize, setCacheSize] = useState(3);
  const [blockSize, setBlockSize] = useState(3);

  // Reservation station states
  const [addSubFloat, setAddSubFloat] = useState([]);
  const [mulDivFloat, setMulDivFloat] = useState([]);
  const [intAddSub, setIntAddSub] = useState([]);
  const [load, setLoad] = useState([]);
  const [store, setStore] = useState([]);
  const [dataBus, setDataBus] = useState([
    {
      tag: '',
      value: ''
    }
  ]);
  // Instructions state
  const [instructions, setInstructions] = useState([]);
  const [inputInstructions, setInputInstructions] = useState('');
  const [parsedInstructions22, setParsedInstructions22] = useState([]);
  const [instructionFile, setInstructionFile] = useState(null);
  const [latencies, setLatencies] = useState({});
  const [registerFile, setRegisterFile] = useState([]);
  
  // Simulation state
  const [cycle, setCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const opcodes = [
    'DADDI', 'DSUBI', 'ADD.D', 'ADD.S', 'SUB.D', 'SUB.S',
    'MUL.D', 'MUL.S', 'DIV.D', 'DIV.S', 'LW', 'LD', 'L.S',
    'L.D', 'SW', 'SD', 'S.S', 'S.D', 'BNE', 'BEQ',
  ];

  useEffect(() => {
    initializeTables();
  }, [addSubFloatRows, mulDivFloatRows, intAddSubRows, loadRows, storeRows,cacheSize,blockSize]);

  function AssemblyTranslate(instruction) {
    let parts = instruction.trim().split(/\s+/);    
    let opcode = parts[0];
    let args = parts.slice(1); // For any arguments following the opcode

    if (opcode === 'DADDI') {

        // Insert logic for DADDI
        return "DADDI instruction translated";
    } else if (opcode === 'DSUBI') {
        // Insert logic for DSUBI
        return "DSUBI instruction translated";
    } else if (opcode === 'ADD.D') {
        // Insert logic for ADD.D
        return "ADD.D instruction translated";
    } else if (opcode === 'ADD.S') {
        // Insert logic for ADD.S
        return "ADD.S instruction translated";
    } else if (opcode === 'SUB.D') {
        // Insert logic for SUB.D
        return "SUB.D instruction translated";
    } else if (opcode === 'SUB.S') {
        // Insert logic for SUB.S
        return "SUB.S instruction translated";
    } else if (opcode === 'MUL.D') {
        // Insert logic for MUL.D
        return "MUL.D instruction translated";
    } else if (opcode === 'MUL.S') {
        // Insert logic for MUL.S
        return "MUL.S instruction translated";
    } else if (opcode === 'DIV.D') {
        // Insert logic for DIV.D
        return "DIV.D instruction translated";
    } else if (opcode === 'DIV.S') {
        // Insert logic for DIV.S
        return "DIV.S instruction translated";
    } else if (opcode === 'LW') {
        // Insert logic for LW
        return "LW instruction translated";
    } else if (opcode === 'LD') {
        // Insert logic for LD
        return "LD instruction translated";
    } else if (opcode === 'L.S') {
        // Insert logic for L.S
        return "L.S instruction translated";
    } else if (opcode === 'L.D') {
        // Insert logic for L.D
        return "L.D instruction translated";
    } else if (opcode === 'SW') {
        // Insert logic for SW
        return "SW instruction translated";
    } else if (opcode === 'SD') {
        // Insert logic for SD
        return "SD instruction translated";
    } else if (opcode === 'S.S') {
        // Insert logic for S.S
        return "S.S instruction translated";
    } else if (opcode === 'S.D') {
        // Insert logic for S.D
        return "S.D instruction translated";
    } else if (opcode === 'BNE') {
        // Insert logic for BNE
        return "BNE instruction translated";
    } else if (opcode === 'BEQ') {
        // Insert logic for BEQ
        return "BEQ instruction translated";
    } else {
        // If opcode is not recognized
        return null;
    }
}

  const initializeTables = () => {
    const block = Array.from({ length: parseInt(blockSize) }, () => ({
      address: '',
      value: '',
    }));

    const cache = Array.from({ length: parseInt(cacheSize) }, () => ({
      block,


    }));

    
    

    


    console.log(cache);
    console.log(block);




    const emptyAddSubFloat = Array.from({ length: parseInt(addSubFloatRows) }, (_, index) => ({
      name: `A${index}`,
      busy: false,
      opcode: '',
      vj: '',
      vk: '',
      qj: '',
      qk: '',
      A: '',
    }));
    console.log(emptyAddSubFloat);

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
      // console.log("line",line);      
      const parts = line.trim().split(' ');
      // console.log("parts",parts);
      
      if (parts.length >= 3 && parts.length <= 4) {
        return { instruction: line.trim(), value: '' };
      }

      
      
      return null;
    }).filter(Boolean);

// console.log(parsedInstructions);

  
    setInstructions((prevInstructions) => [parsedInstructions]);
  
    const allRegisters = lines.flatMap((line) => line.match(/R\d+/g) || []);
    const uniqueRegisters = [...new Set(allRegisters)];
  
    setRegisterFile((prevRegisterFile) => {
      const existingRegisterNames = new Set(prevRegisterFile.map((reg) => reg.regname));
      const newRegisterFile = uniqueRegisters
        .filter((reg) => !existingRegisterNames.has(reg))
        .map((reg) => ({
          regname: reg,
          qi: 0,
          value: 0,
        }));
      return [...prevRegisterFile, ...newRegisterFile];
    });
  };
// console.log("ins",instructions);

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
        if (parts.length >= 3 && parts.length <= 4) {
          return { instruction: cleanLine, value: '' };
        }
        
        return null;
      }).filter(Boolean);
  
      setInstructions((prevInstructions) => [...prevInstructions, ...parsedInstructions]);
  
      const allRegisters = lines.flatMap((line) => line.match(/R\d+/g) || []);
      const uniqueRegisters = [...new Set(allRegisters)];
  
      setRegisterFile((prevRegisterFile) => {
        const existingRegisterNames = new Set(prevRegisterFile.map((reg) => reg.regname));
        const newRegisterFile = uniqueRegisters
          .filter((reg) => !existingRegisterNames.has(reg))
          .map((reg) => ({
            regname: reg,
            qi: 0,
            value: 0,
          }));
        return [...prevRegisterFile, ...newRegisterFile];
      });
    };
  
    if (file) {
      reader.readAsText(file);
    }
  };
  function algorithim() {
    // console.log("Instructions",instructions);

    for(let i=0;i<instructions.length;i++){
      let inst = instructions[i][0].instruction;
      // console.log("inst:  ",inst);
      let parts = inst.trim().split(/\s+/);    
      let opcode = parts[0];
      // console.log("Opcode",opcode);

      if (opcode === 'DADDI'  || opcode === 'ADD.S' ||opcode === 'ADD.D' || opcode === 'SUB.S' || opcode === 'SUB.D'||opcode === 'DSUBI' ) {
        // Insert logic for DADDI
              for (let i = 0; i < addSubFloat.length; i++) {
                if (!addSubFloat[i].busy) {
                  for (let i = 0; i < registerFile.length; i++) {        
                    if (registerFile[i].regname === parts[1] ) {
                      if( registerFile[i].qi !== 0){
                        addSubFloat[i].busy = true;
                        addSubFloat[i].vj = registerFile[i].value;
                      }
                      else{
                        flag = false;
                      }
                    } 
                    if (registerFile[i].regname === parts[2]) {
                      if(registerFile[i].qi !== 0){
                        addSubFloat[i].busy = true;
                        addSubFloat[i].vk = registerFile[i].value;
                      }
                      else{
                        flag = false;
                      }
                    }
                  }  
                  break;
                }
              }
              // console.log("DADDI instruction translated");
              // setAddSubFloat((prevAddSubFloat) => [...prevAddSubFloat, { busy: true, opcode: '', vj: '', vk: '', qj: '', qk: '', A: '' }]);
   
    } else if (opcode === 'MUL.S' || opcode === 'MUL.D' || opcode === 'DIV.S' || opcode === 'DIV.D') {
        // Insert logic for MUL.S
        // console.log("MUL.S instruction translated");
      }else if (opcode === 'LW' || opcode === 'LD' || opcode === 'L.S' || opcode === 'L.D') {       
        // Insert logic for LW
        // console.log("LW instruction translated");
      }else if (opcode === 'SW' || opcode === 'SD' || opcode === 'S.S' || opcode === 'S.D') {      
        // Insert logic for SW
        // console.log("SW instruction translated");
      }else if (opcode === 'BNE' || opcode === 'BEQ') {
        // Insert logic for BNE
        // console.log("BNE instruction translated");
      }


  }
  };
  algorithim();


  const handleLatencyInput = () => {
    const updatedInstructions = instructions.map((inst) => {
      const opcode = inst.instruction.split(' ')[0];
      const latency = latencies[opcode] || '';
      return { ...inst, value: latency };
    });
    setInstructions(updatedInstructions);
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

  const startSimulation = () => {
    setIsRunning(true);
    setCycle(0);
  };

  const nextCycle = () => {
    if (isRunning) {
      setCycle((prevCycle) => prevCycle + 1);
    }
  };

  const simulateCycle = () => {
    issueInstructions();
    executeInstructions();
    writebackResults();
  };

  const issueInstructions = () => {
    for (let i = 0; i < instructions.length; i++) {
      const inst = instructions[i];
      if (inst.value === '') continue; // Skip if latency not set
      const availableStation = addSubFloat.findIndex(station => !station.busy);
      if (availableStation !== -1) {
        const { opcode, vj, vk } = parseInstruction(inst.instruction);
        addSubFloat[availableStation] = {
          busy: true,
          opcode,
          vj,
          vk,
          qj: '',
          qk: '',
          A: '',
        };
        setAddSubFloat([...addSubFloat]);
        instructions[i].issued = true;
      }
    }
  };

  const executeInstructions = (flag) => {
    
  };

  const writebackResults = () => {
    // Implement writeback logic here
  };

  useEffect(() => {
    if (isRunning) {
      simulateCycle();
    }
  }, [cycle, isRunning]);

  const parseInstruction = (instruction) => {
    const parts = instruction.split(' ');
    const opcode = parts[0];
    const vj = parts[1]; // Assuming the second part is vj
    const vk = parts[2]; // Assuming the third part is vk
    return { opcode, vj, vk };
  };






  return (
    <div>
      <h1>Tomasulo Algorithm - Reservation Stations</h1>
      <div>
          <label>Cache Size: </label>
          <input
            type="number"
            value={cacheSize}
            onChange={(e) => setCacheSize(e.target.value)}
          />
        </div>
        <div>
          <label>Block Size: </label>
          <input
            type="number"
            value={blockSize}
            onChange={(e) => setBlockSize(e.target.value)}
          />
        </div>
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

      <div >
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

      <div>
        <h2>Register File</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Register Name</th>
              <th style={tableHeaderStyle}>Qi</th>
              <th style={tableHeaderStyle}>Value</th>
            </tr>
          </thead>
          <tbody>
            {registerFile.map((reg, index) => (
              <tr key={index}>
                <td style={tableCellStyle}>{reg.regname}</td>
                <td style={tableCellStyle}>{reg.qi}</td>
                <td style={tableCellStyle}>{reg.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Current Cycle: {cycle}</h2>
        <button onClick={startSimulation}>Start Simulation</button>
        <button onClick={nextCycle}>Next Cycle</button>
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