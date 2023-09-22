import { useState } from "react";
import { Br, Cut, Line, Printer, Row, Text, render } from "react-thermal-printer";

function App() {
  const receipt = (
    <Printer type="epson" width={42} characterSet="korea" debug={true}>
      <Text size={{ width: 2, height: 2 }}>9,500원</Text>
      <Text bold={true}>결제 완료</Text>
      <Br />
      <Row
        gap={1}
        left={<Text size={{ width: 2, height: 2 }}>포</Text>}
        center={<Text size={{ width: 2, height: 2 }}>알로하 포케 맛있는 거</Text>}
        right="X 15"
      />
      <Line />
      <Cut />
    </Printer>
  );

  const [port, setPort] = useState();

  const print = async () => {
    let _port = port;
    console.log(_port);
    if (!_port) {
      console.log('_port');
      _port = await navigator.serial.requestPort();
      await _port.open({ baudRate: 115200 });
      setPort(_port);
    }

    const writer = _port.writable?.getWriter();
    if (!writer) {
      const data = await render(receipt);
      await writer.write(data);
      writer.releaseLock();
    }
  };

  return (
    <div className="App">
      <div>{receipt}</div>
      <hr style={{ margin: "20px 0" }} />
      <button onClick={print}>
        Print
      </button>
    </div>
  );
}

export default App;
