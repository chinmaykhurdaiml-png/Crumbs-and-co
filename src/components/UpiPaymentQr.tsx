import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Copy,
  Check,
  ExternalLink,
  Edit2,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Info,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface UpiPaymentQrProps {
  amount: number;
  onPaymentSuccess?: (reference?: string) => void;
  className?: string;
  compact?: boolean;
}

const DEFAULT_UPI_ID = 'thelatur0072@ybl';
const DEFAULT_PAYEE_NAME = 'The Latur - 0072 (Crumb & Co.)';
const PHONEPE_PURPLE = '#5f259f';

// PhonePe inline SVG logo data URL
const PHONEPE_ICON_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="%235F259F"/><text x="50" y="65" text-anchor="middle" fill="%23FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="44">पे</text></svg>`;

export const UpiPaymentQr: React.FC<UpiPaymentQrProps> = ({
  amount,
  onPaymentSuccess,
  className = '',
  compact = false,
}) => {
  const [upiId, setUpiId] = useState(() => {
    return localStorage.getItem('crumb_co_upi_id') || DEFAULT_UPI_ID;
  });

  const [payeeName, setPayeeName] = useState(() => {
    return localStorage.getItem('crumb_co_payee_name') || DEFAULT_PAYEE_NAME;
  });

  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [tempUpiId, setTempUpiId] = useState(upiId);
  const [tempPayee, setTempPayee] = useState(payeeName);
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    localStorage.setItem('crumb_co_upi_id', upiId);
    localStorage.setItem('crumb_co_payee_name', payeeName);
  }, [upiId, payeeName]);

  // Construct standard UPI URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent('Crumb and Co Bakery Order')}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUpiConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUpiId.trim()) {
      setUpiId(tempUpiId.trim());
      setPayeeName(tempPayee.trim() || DEFAULT_PAYEE_NAME);
      setIsEditingUpi(false);
    }
  };

  const handleConfirmPayment = () => {
    setIsPaid(true);
    if (onPaymentSuccess) {
      onPaymentSuccess(utrNumber.trim() || `UPI-TXN-${Date.now().toString().slice(-6)}`);
    }
  };

  return (
    <div
      className={`bg-[#1E2024] text-white border border-white/10 rounded-lg p-5 sm:p-6 shadow-xl relative overflow-hidden ${className}`}
    >
      {/* PhonePe Inspired Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#5f259f] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            पे
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs uppercase tracking-widest text-[#D9A6A0] font-bold">
                PhonePe & UPI QR
              </span>
              <span className="text-[10px] bg-[#89977A]/30 text-[#89977A] px-1.5 py-0.2 rounded-xs font-semibold">
                Dynamic
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-white leading-tight">
              Scan to Pay ₹{amount}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setTempUpiId(upiId);
            setTempPayee(payeeName);
            setIsEditingUpi(!isEditingUpi);
          }}
          className="text-xs text-white/60 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-sm hover:bg-white/5"
          title="Customize Payee UPI ID"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">UPI Settings</span>
        </button>
      </div>

      {/* Edit UPI ID Form Modal/Drawer */}
      {isEditingUpi && (
        <form
          onSubmit={handleSaveUpiConfig}
          className="mb-4 p-3 bg-white/5 border border-white/15 rounded-md text-xs space-y-2.5 animate-fade-in"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#D9A6A0]">Configure Merchant UPI ID</span>
            <button
              type="button"
              onClick={() => setIsEditingUpi(false)}
              className="text-white/40 hover:text-white"
            >
              Cancel
            </button>
          </div>
          <div>
            <label className="block text-white/70 text-[11px] mb-1">
              UPI VPA / ID:
            </label>
            <input
              type="text"
              required
              value={tempUpiId}
              onChange={(e) => setTempUpiId(e.target.value)}
              placeholder="e.g. thelatur0072@ybl or your-upi@okhdfcbank"
              className="w-full bg-[#121316] border border-white/20 text-white px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-[#C58B52]"
            />
          </div>
          <div>
            <label className="block text-white/70 text-[11px] mb-1">
              Account / Business Display Name:
            </label>
            <input
              type="text"
              value={tempPayee}
              onChange={(e) => setTempPayee(e.target.value)}
              placeholder="e.g. The Latur - 0072"
              className="w-full bg-[#121316] border border-white/20 text-white px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-[#C58B52]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C58B52] hover:bg-[#B27941] text-white font-semibold py-1.5 rounded-sm transition-colors text-xs"
          >
            Update QR Code
          </button>
        </form>
      )}

      {/* QR Code Presentation Box */}
      <div className="flex flex-col items-center justify-center">
        {/* Dynamic Amount Pill */}
        <div className="mb-3 bg-white/10 px-4 py-1 rounded-full border border-white/10 flex items-center gap-2">
          <span className="text-[11px] text-white/70 uppercase tracking-wider">Amount:</span>
          <span className="font-serif font-bold text-base text-[#D9A6A0]">
            ₹{amount.toFixed(2)}
          </span>
        </div>

        {/* QR Code Container styled like the PhonePe screenshot */}
        <div className="p-4 bg-white rounded-xl shadow-2xl border-4 border-[#2A2E35] flex items-center justify-center relative group">
          <QRCodeSVG
            value={upiUri}
            size={compact ? 170 : 210}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#121316"
            includeMargin={true}
            imageSettings={{
              src: PHONEPE_ICON_DATA_URL,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>

        {/* Payee Info from screenshot */}
        <div className="mt-3 text-center">
          <p className="text-xs font-semibold text-white/90 tracking-wide flex items-center justify-center gap-1">
            <span>{payeeName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/50" />
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="font-mono text-xs text-[#D9A6A0]">{upiId}</span>
            <button
              type="button"
              onClick={handleCopyUpi}
              className="text-white/60 hover:text-white p-1 transition-colors"
              title="Copy UPI ID"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Accepted UPI Apps strip */}
        <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center gap-4 text-[11px] text-white/60">
          <span className="font-semibold text-white/80">Accepted via:</span>
          <span className="text-purple-300 font-bold">PhonePe</span>
          <span>·</span>
          <span className="text-blue-300 font-bold">Google Pay</span>
          <span>·</span>
          <span className="text-sky-300 font-bold">Paytm</span>
          <span>·</span>
          <span className="text-orange-300 font-bold">BHIM</span>
        </div>

        {/* Mobile Deep Link */}
        <div className="mt-4 w-full flex flex-col sm:flex-row gap-2.5">
          <a
            href={upiUri}
            className="flex-1 bg-[#5f259f] hover:bg-[#4d1d82] text-white text-xs font-bold py-2.5 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 text-center shadow-md cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pay on PhonePe App</span>
          </a>

          <button
            type="button"
            onClick={handleCopyUpi}
            className="border border-white/20 hover:border-white/40 text-white text-xs font-semibold py-2.5 px-3 rounded-sm transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy UPI</span>
              </>
            )}
          </button>
        </div>

        {/* Payment Confirmation input & trigger */}
        <div className="mt-4 pt-4 border-t border-white/10 w-full space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Completed the scan & transfer?</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              placeholder="Enter 12-digit UPI Ref / UTR (optional)"
              className="flex-1 bg-[#121316] border border-white/15 text-xs text-white px-3 py-2 rounded-sm focus:outline-none focus:border-[#C58B52] placeholder:text-white/40"
            />
            <button
              type="button"
              onClick={handleConfirmPayment}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I Have Paid</span>
            </button>
          </div>
          <p className="text-[10px] text-white/50 text-center">
            The QR updates automatically if you adjust quantities or apply discount codes.
          </p>
        </div>
      </div>
    </div>
  );
};
