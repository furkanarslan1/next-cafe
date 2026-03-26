import QrCodeGenerator from "./_components/QrCodeGenerator";

export default function AdminQrCodePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 space-y-6">
      <h1 className="text-2xl font-bold">QR Code Generator</h1>
      <QrCodeGenerator />
    </div>
  );
}