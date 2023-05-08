import QRCode from "qrcode";
import { useState } from "react";

function QrCode() {
  const [url, setUrl] = useState("");
  const [qr, setQr] = useState("");

  const GenerateQRCode = () => {
    QRCode.toDataURL(
      url,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  };

  return (
    <div className="app">
      <div style={{ alignItems: "center" }}>
        <h1 style={{ marginRight: "10px" }}>QR Generator</h1>
        <input
          type="text"
          placeholder="e.g. https://google.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={GenerateQRCode}>Generate</button>
      </div>
      <br />
      {qr && (
        <>
          <img
            id="qrCode"
            src={qr}
            width="250"
            height="250"
            style={{ marginLeft: "10px", alignSelf: "center" }}
          />
          {/* <a href={qr} download="qrcode.png" style={{ marginLeft: '10px' }}>
              Download
            </a> */}
        </>
      )}
    </div>
  );
}

export default QrCode;
