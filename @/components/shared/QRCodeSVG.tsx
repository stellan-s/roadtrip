// app/components/QRCodeDisplay.jsx
import React from "react";
import { QRCodeCanvas } from "qrcode.react"; // eller QRCodeSVG för SVG-output

/**
 * QRCodeDisplay
 * @param {{ url: string, size?: number }} props
 *   - url: text eller webbadress som QR-koden ska representera
 *   - size: valfri kantlängd (px), default 128
 */
export function QRCodeDisplay({
  url,
  size = 128,
}: {
  url: string;
  size?: number;
}) {
  return (
    <div style={{ width: size, height: size }}>
      <QRCodeCanvas value={url} size={size} level="M" includeMargin={true} />
    </div>
  );
}
