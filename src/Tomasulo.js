import React, { useState, useEffect } from 'react';

const Tomasulo = () => {
  let clock=0;
  let counter =0;

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
  const [wb, setwb] = useState([]);


  const [insertedOpCodes, setInsertedOpCodes] = useState([]);

  useEffect(() => {
    initializeTables();
  }, [addSubFloatRows, mulDivFloatRows, intAddSubRows, loadRows, storeRows,cacheSize,blockSize]);

  function AssemblyTranslate(instruction) {
    let parts = instruction.trim().split(/\s+/);    
    let opcode = parts[0];
    let args = parts.slice(1); // For any arguments following the opcode

    // hena alu & temla el wb state el foo2 w loop 3ala kol el reservations states w nshoof law feh haga me7taga el wb variable n7otaha f nafs el cycle
    // w ba3d keda t-writeback fel cycle el ba3deha fel register file


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
      latency: -1,
    }));
    console.log("emptyAddSubFloat",emptyAddSubFloat);

    const emptyMulDivFloat = Array.from({ length: parseInt(mulDivFloatRows) }, (_, index) => ({
      name: `M${index}`,
      busy: false,
      opcode: '',
      vj: '',
      vk: '',
      qj: '',
      qk: '',
      A: '',
    }));

    const emptyIntAddSub = Array.from({ length: parseInt(intAddSubRows) }, (_, index) => ({
      name: `IA${index}`,
      busy: false,
      opcode: '',
      vj: '',
      vk: '',
      qj: '',
      qk: '',
      A: '',
    }));

    const emptyLoad = Array.from({ length: parseInt(loadRows) }, (_, index) => ({
      name: `L${index}`,
      busy: false,
      qi: '',
    }));

    const emptyStore = Array.from({ length: parseInt(storeRows) }, (_, index) => ({
      name: `S${index}`,
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
    console.log("lines",lines);
  // Parse the input instructions
  const parsedInstructions = lines
    .map((line) => {
      const parts = line.trim().split(' ');
      console.log("parts",parts);
      const opcode = parts[0];
      setInsertedOpCodes((prevOpCodes) => [...prevOpCodes, opcode]);
      

      // Ensure the line has valid instruction format
      if (parts.length >= 3 && parts.length <= 4) {
        return { instruction: line.trim(), value: '', issued: false }; // Initialize value as an empty string
      }

      return null; // Ignore invalid lines
    })
    .filter(Boolean);

  // Set parsed instructions to state
  setInstructions(parsedInstructions);
  
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

const handleLatencyInput = () => {
  // Dynamically populate latency values based on opcode
  console.log(instructions);
  const updatedInstructions = instructions.map((inst) => {
    console.log("inst",inst);
    const opcode = inst.instruction.split(' ')[0]; // Extract opcode
    const latency = latencies[opcode] || ''; // Get latency for the opcode, or default to ''
    return { ...inst, value: latency }; // Assign latency to value field
  });
  
  // Update state with instructions containing latency values
  setInstructions(updatedInstructions);
  console.log("updatedInstructions",updatedInstructions);
};

const handleLatencyChange = (opcode, latency) => {
  // Update the latencies mapping
  setLatencies((prevLatencies) => ({
    ...prevLatencies,
    [opcode]: latency,
  }));

  // Recalculate latencies for instructions
  setInstructions((prevInstructions) =>
    prevInstructions.map((inst) => {
      const instOpcode = inst.instruction.split(' ')[0];
      if (instOpcode === opcode) {
        return { ...inst, value: latency };
      }
      return inst;
    })
  );
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

  const executeInstructions = () => {
    console.log("We are in cycle: ",cycle);
    for(let i=0; i<addSubFloat.length;i++){
      if(addSubFloat[i].busy){
        console.log(addSubFloat[i].qj);
        if(addSubFloat[i].qj === '' && addSubFloat[i].qk === ''){
          console.log("da5al");


          addSubFloat[i].latency = addSubFloat[i].latency - 1;
          console.log("addSubFloat[i].latency",addSubFloat[i].latency);
          if(addSubFloat[i].latency == 0){

            // AssemblyTranslate();

            console.log("Fadyaa");
            addSubFloat[i].busy = false;
            addSubFloat[i].opcode = '';
            addSubFloat[i].vj = '';
            addSubFloat[i].vk = '';
            addSubFloat[i].qj = '';
            addSubFloat[i].qk = '';
            addSubFloat[i].A = '';
          }
        }
      }
    }

  };

  function issue() {
    console.log("Issued in Cycle: ", cycle);
    
  for (let k = 0; k < instructions.length; k++) {
    if(instructions[k].issued) continue;
    let inst = instructions[k].instruction;
    console.log("Processing instruction:", inst);
    instructions[k].issued = true;

    let parts = inst.trim().split(/\s+/);    
    let opcode = parts[0];

    if (['DADDI', 'ADD.S', 'ADD.D', 'SUB.S', 'SUB.D', 'DSUBI'].includes(opcode)) {
      console.log("Opcode identified:", opcode);

      for (let i = 0; i < addSubFloat.length; i++) {
        console.log("Checking functional unit:", addSubFloat[i]);

        if (!addSubFloat[i].busy) {
          console.log("Available functional unit found at index:", i);

          for (let j = 0; j < registerFile.length; j++) {        
            if (registerFile[j].regname === parts[2]) {
              if (registerFile[j].qi === 0) {
                addSubFloat[i].vj = registerFile[j].value;
                addSubFloat[i].qj = '';
              } else {
                addSubFloat[i].vj = '';
                addSubFloat[i].qj = registerFile[j].qi;
              }
            }
            if (registerFile[j].regname === parts[3]) {
              if (registerFile[j].qi === 0) {
                addSubFloat[i].vk = registerFile[j].value;
                addSubFloat[i].qk = '';
              } else {
                addSubFloat[i].vk = '';
                addSubFloat[i].qk = registerFile[j].qi;
              }
            }
          }
          // Mark the functional unit as busy and set opcode/latency
          addSubFloat[i].busy = true;
          addSubFloat[i].opcode = opcode;
          addSubFloat[i].latency = instructions[k].value;

          // Update destination register's Qi
          for (let j = 0; j < registerFile.length; j++) {        
            if (registerFile[j].regname === parts[1]) {
              registerFile[j].qi = addSubFloat[i].name;
            }
          }

          console.log("Updated addSubFloat:", addSubFloat);
          break; // Exit after assigning to a functional unit
        }
      }
    } else if (['MUL.S',  'MUL.D', 'DIV.S', 'DIV.D'].includes(opcode)) {
      console.log("Opcode identified:", opcode);
      for (let i = 0; i < mulDivFloat.length; i++) {
        if (!mulDivFloat[i].busy){
          for (let j = 0; j < registerFile.length; j++) {        
            if (registerFile[j].regname === parts[2]) {
              if (registerFile[j].qi === 0) {
                mulDivFloat[i].vj = registerFile[j].value;
                mulDivFloat[i].qj = '';
              } else {
                mulDivFloat[i].vj = '';
                mulDivFloat[i].qj = registerFile[j].qi;
              }
            }
            if (registerFile[j].regname === parts[3]) {
              if (registerFile[j].qi === 0) {
                mulDivFloat[i].vk = registerFile[j].value;
                mulDivFloat[i].qk = '';
              } else {
                mulDivFloat[i].vk = '';
                mulDivFloat[i].qk = registerFile[j].qi;
              }
            }

          }
          mulDivFloat[i].busy = true;
          mulDivFloat[i].opcode = opcode;
          mulDivFloat[i].latency = instructions[k].value;
        }
      }
      } else if (['LW', 'L.D',  'L.S', 'LD', 'LW'].includes(opcode)) {      
        for (let i = 0; i < load.length; i++) {
          if (!load[i].busy){

          }
        } 
      } else if ( [ 'SW', 'SD', 'S.D', 'S.S'].includes(opcode)) {    
        for (let i = 0; i < store.length; i++) {
          if (!store[i].busy){

          }
        }  
      } else if (['BNE', 'BEQ'].includes(opcode)) {
   
      }
    }
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
    setCycle((cycle) => cycle + 1);

  };

  const nextCycle = async () => {
    if (isRunning) {
      setCycle((cycle) => cycle + 1);
      console.log("cycle");
      if(cycle === 1){
        issue();
      }
      else{
        issue();
        // writebackResults();
        executeInstructions();
      }

    }
  };

  const simulateCycle = () => {
    // issueInstructions();
    // executeInstructions();
    // writebackResults();
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

  const writebackResults = () => {

   
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
        {insertedOpCodes.map((opcode) => (
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
        <h2>Current Cycle: {cycle - 1}</h2>
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