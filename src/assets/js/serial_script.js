
function start(fn , obj){
  connectSerial()
  let port, textEncoder, writableStreamClosed, writer;

  async function connectSerial() {
      try {
          // Prompt user to select any serial port.
          port = await navigator.serial.requestPort();
          await port.open({ baudRate: "9600" });
          listenToPort();

          textEncoder = new TextEncoderStream();
          writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

          writer = textEncoder.writable.getWriter();
      } catch (e){
          alert(e + "Serial Connection Failed");
      }
  }
  let v = "";
  async function listenToPort() {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      // Listen to data coming from the serial device.
      while (true) {
          let { value, done } = await reader.read();
          if (done) {
              // Allow the serial port to be closed later.
              //reader.releaseLock();
              break;
          }
          // value is a string.
          let newLine = /\r\n|\r|\n/.exec(value);

          if (newLine){
              v += value;
              v.replace(/\r\n|\n|\r|\s/g, "")
              if (!v.replace(/\r\n|\n|\r|\s/g, "").length) {
                console.log("string only contains whitespace (ie. spaces, tabs or line breaks)");
              }else {
                  if (v.length > 3){
                      fn(v, obj)
                  }
              }
              v = "";
          }else{
              v += value;
          }
      }
  }
  async function sendSerialLine(data) {
      await writer.write(data);
      //await writer.releaseLock();
  }

}
