import React, { useState, useEffect } from 'react';

const Tomasulo = () => {

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
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const opcodes = [
    'DADDI', 'DSUBI', 'ADD.D', 'ADD.S', 'SUB.D', 'SUB.S',
    'MUL.D', 'MUL.S', 'DIV.D', 'DIV.S', 'LW', 'LD', 'L.S',
    'L.D', 'SW', 'SD', 'S.S', 'S.D', 'BNE', 'BEQ',
  ];

  const [wb, setwb] = useState([{
    regName: '',
    value: '',
    registerationState: '',
    index: 0
  }]);


  const [insertedOpCodes, setInsertedOpCodes] = useState([]);

  useEffect(() => {
    initializeTables();
  }, [addSubFloatRows, mulDivFloatRows, intAddSubRows, loadRows, storeRows,cacheSize,blockSize]);


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
      instruction: 0,
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
      latency: -1,
      instruction: 0,
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

  const writebackResults = (wb) => {
    for(let i=0; i<registerFile.length; i++){
      if(registerFile[i].regname === wb.regName){
        registerFile[i].value = wb.value;
        if(wb.registerationState === "Load"){
          load[wb.index].busy = false;
          load[wb.index].qi = '';
        }
        else if(wb.registerationState === "Store"){
          store[wb.index].busy = false;
          store[wb.index].address = '';
        }
        else if(wb.registerationState === "AddSubFloat"){
          addSubFloat[wb.index].busy = false;
          addSubFloat[wb.index].opcode = '';
          addSubFloat[wb.index].vj = '';
          addSubFloat[wb.index].vk = '';
          addSubFloat[wb.index].qj = '';
          addSubFloat[wb.index].qk = '';
          addSubFloat[wb.index].A = '';
          addSubFloat[wb.index].instruction = 0;
          addSubFloat[wb.index].latency = -1;
        }
        else if(wb.registerationState === "MulDivFloat"){
          mulDivFloat[wb.index].busy = false;
          mulDivFloat[wb.index].opcode = '';
          mulDivFloat[wb.index].vj = '';
          mulDivFloat[wb.index].vk = '';
          mulDivFloat[wb.index].qj = '';
          mulDivFloat[wb.index].qk = '';
          mulDivFloat[wb.index].A = '';
          mulDivFloat[wb.index].instruction = 0;
          mulDivFloat[wb.index].latency = -1;
        }
        else {
          intAddSub[wb.index].busy = false;
          intAddSub[wb.index].opcode = '';
          intAddSub[wb.index].vj = '';
          intAddSub[wb.index].vk = '';
          intAddSub[wb.index].qj = '';
          intAddSub[wb.index].qk = '';
          intAddSub[wb.index].A = '';
          intAddSub[wb.index].instruction = 0;
          intAddSub[wb.index].latency = -1;
        }
      }
    }
  };

  const checkWriteBack = () => {
    let arrayCounter = new Array(wb.length);
    if(wb.length > 1){
      for(let j = 0; j < wb.length; j++){
        const regName = wb[j].regName;
        let counter = 0;
        for(let i = 0; i < addSubFloat.length; i++){
          if((addSubFloat[i].qj === regName) || (addSubFloat[i].qk === regName)){
            counter++;
          }
        }
        for(let i = 0; i < mulDivFloat.length; i++){
          if((mulDivFloat[i].qj === regName) || (mulDivFloat[i].qk === regName)){
            counter++;
          }
        }
        for(let i = 0; i < intAddSub.length; i++){
          if((intAddSub[i].qj === regName) || (intAddSub[i].qk === regName)){
            counter++;
          }
        }
        for(let i = 0; i < load.length; i++){
          if(load[i].qi === regName){
            counter++;
          }
        }
        for(let i = 0; i < store.length; i++){
          if(store[i].qi === regName){
            counter++;
          }
        }
        arrayCounter[j] = counter;
      }

      let max = arrayCounter[0];
      let index = 0;
      for(let i = 0; i < arrayCounter.length; i++){
        if(arrayCounter[i] > max){
          max = arrayCounter[i];
          index = i;
        }
      }
      arrayCounter.slice(index, 1);
      writebackResults(wb[index]);
    }
    else{
      writebackResults(wb[0]);
    }
  };
  
  function ALU(registerationState, index, instructionIndex) {
    let parts = instructions[instructionIndex].trim().split(/\s+/);    
    let opcode = parts[0];

    // hena alu & temla el wb state el foo2 w loop 3ala kol el reservations states 
    // w nshoof law feh haga me7taga el wb variable n7otaha f nafs el cycle
    // w ba3d keda t-writeback fel cycle el ba3deha fel register file

    // tet3emel ka object "key": RegName, "value": RegValue
    const regName = parts[1];
    let value = 0;
    
    if (opcode === 'DADDI') {
      // Insert logic for DADDI
      // return "DADDI instruction translated";
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

    const wbValue = {
      regName,
      value,
      registerationState,
      index
    }
    setwb([...wb, wbValue]);

}

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
            console.log("Fadyaa");
            ALU("addSubFloat", i , addSubFloat[i].instruction);
          }
        }
      }
      if(mulDivFloat[i].busy){
        console.log(mulDivFloat[i].qj);
        if(mulDivFloat[i].qj === '' && mulDivFloat[i].qk === ''){
          console.log("da5al");

          mulDivFloat[i].latency = mulDivFloat[i].latency - 1;
          console.log("mulDivFloat[i].latency",mulDivFloat[i].latency);
          if(mulDivFloat[i].latency == 0){
            console.log("Fadyaa");
            ALU(mulDivFloat[i].instruction);
          }
        }
      }
    }

  };

  function issue() {
    console.log("Issued in Cycle: ", cycle);
    console.log("Counter: ", counter);
    if(counter >= instructions.length){
      return;
    }
    if(instructions[counter].issued){
      return;
    }
    let inst = instructions[counter].instruction;
    console.log("Processing instruction:", inst);

    let parts = inst.trim().split(/\s+/);    
    let opcode = parts[0];

    if (['DADDI', 'ADD.S', 'ADD.D', 'SUB.S', 'SUB.D', 'DSUBI'].includes(opcode)) {
      console.log("Opcode identified:", opcode);

      for (let i = 0; i < addSubFloat.length; i++) {
        console.log("Checking functional unit:", addSubFloat[i]);

        if (!addSubFloat[i].busy) {
          instructions[counter].issued = true;
          addSubFloat[i].instruction = counter;
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
          addSubFloat[i].latency = instructions[counter].value;

          // Update destination register's Qi
          for (let j = 0; j < registerFile.length; j++) {  

            if (registerFile[j].regname === parts[1]) {
              registerFile[j].qi = addSubFloat[i].name;
            }
          }

          console.log("Updated addSubFloat:", addSubFloat);
          setCounter(counter + 1);
          break; // Exit after assigning to a functional unit
        }
      }
    } else if (['MUL.S',  'MUL.D', 'DIV.S', 'DIV.D'].includes(opcode)) {
      console.log("Opcode identified:", opcode);
      for (let i = 0; i < mulDivFloat.length; i++) {
        console.log("Checking functional unit:", mulDivFloat[i]);

        if (!mulDivFloat[i].busy){
          instructions[counter].issued = true;
          mulDivFloat[i].instruction = counter;
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
          mulDivFloat[i].latency = instructions[counter].value;

          // Update destination register's Qi
          for (let j = 0; j < registerFile.length; j++) {  

            if (registerFile[j].regname === parts[1]) {
              registerFile[j].qi = mulDivFloat[i].name;
            }
          }

          console.log("Updated mulDivFloat:", mulDivFloat);
          setCounter(counter + 1);
          break;
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
        checkWriteBack();
        executeInstructions();
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