import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import axios from "axios";

interface ReceiptData {
  studentName: string;
  studentId: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  class: string;
  course: string;
  academicSession: string;
  rollNumber: string;
  paymentAmount: number;
  paymentMethod: string;
  transactionId: string;
  paymentId: string;
  paymentDate: string;
  registrationDate: string;
  receiptNumber: string;
}

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// API function for fetching receipt
const getScholarshipReceipt = (transactionId: string) => {
  return api.get(`/scholarship/receipt/${transactionId}`);
};

const Receipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [transactionId, setTransactionId] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [apiError, setApiError] = useState("");

  const handleViewReceipt = async () => {
    // Validate Transaction ID
    if (!transactionId.trim()) {
      setInputError("Please enter a Transaction ID");
      return;
    }
    
    if (transactionId.length < 5) {
      setInputError("Transaction ID must be at least 5 characters long");
      return;
    }
    
    setInputError("");
    setIsLoading(true);
    setApiError("");

    try {
      // Call API endpoint directly
      const response = await getScholarshipReceipt(transactionId);
      
      console.log("API Response:", response.data); // For debugging
      
      if (response.data.success) {
        setReceiptData(response.data.receipt);
        setShowReceipt(true);
      } else {
        setApiError(response.data.message || "Failed to fetch receipt");
      }
    } catch (error: any) {
      console.error("Error fetching receipt:", error);
      
      // Handle different error scenarios
      if (error.code === 'ERR_NETWORK') {
        setApiError("Cannot connect to server. Please make sure the backend is running at http://localhost:8080");
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
          case 404:
            setApiError("No receipt found for this Transaction ID");
            break;
          case 400:
            setApiError(error.response.data.message || "Invalid Transaction ID");
            break;
          case 500:
            setApiError("Server error. Please try again later.");
            break;
          default:
            setApiError(error.response.data.message || "Failed to fetch receipt");
        }
      } else if (error.request) {
        // The request was made but no response was received
        setApiError("No response from server. Please check if the backend is running.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!receiptRef.current) return;

    const element = receiptRef.current;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `Advance-Forte-Receipt-${transactionId}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  const handleBack = () => {
    setShowReceipt(false);
    setTransactionId("");
    setInputError("");
    setApiError("");
    setReceiptData(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 mt-20">
      {!showReceipt ? (
        // Transaction ID Input Screen
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="h-2 w-20 bg-yellow-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-serif font-bold text-[#111827]">
              Advance Forte
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Enter Transaction ID to View Receipt
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label 
                htmlFor="transactionId" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Transaction ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setInputError("");
                  setApiError("");
                }}
                placeholder="Enter Razorpay Order ID or Payment ID"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  inputError || apiError
                    ? "border-red-500 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-yellow-200 focus:border-yellow-600"
                } ${isLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
              {inputError && (
                <p className="mt-1 text-sm text-red-500">{inputError}</p>
              )}
              {apiError && (
                <p className="mt-1 text-sm text-red-500">{apiError}</p>
              )}
            </div>

            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <p className="font-semibold text-gray-700 mb-1">📝 You can enter:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Razorpay Order ID</li>
                <li>Razorpay Payment ID</li>
                <li>Transaction Reference</li>
              </ul>
            </div>

            <button
              onClick={handleViewReceipt}
              disabled={isLoading}
              className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Fetching Receipt...
                </span>
              ) : (
                "View Receipt"
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            <p>API: http://localhost:8080/api/scholarship/receipt/[transaction-id]</p>
            <p className="mt-1">For assistance, contact support@advanceforte.in</p>
          </div>
        </div>
      ) : (
        // Receipt View Screen with Dynamic Data
        receiptData && (
          <>
            {/* Action Buttons */}
            <div className="max-w-6xl mx-auto mb-4 flex justify-between items-center">
              <button
                onClick={handleBack}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md flex items-center"
              >
                ← Back
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
              >
                Download Scholarship Fee Receipt
              </button>
            </div>

            {/* Receipt Container */}
            <div
              ref={receiptRef}
              className="max-w-6xl mx-auto bg-white shadow-lg border"
            >
              {/* Gold Top Line */}
              <div className="h-2 bg-yellow-600"></div>

              {/* Header */}
              <div className="bg-[#111827] text-white p-6 flex justify-between items-center border-b-4 border-yellow-600">
                <div>
                  <p className="text-yellow-500 font-semibold tracking-widest text-sm">
                    ★ SCHOLARSHIP REGISTRATION
                  </p>
                  <h1 className="text-4xl font-serif font-bold">
                    Advance Forte
                  </h1>
                  <p className="tracking-[0.4em] text-sm mt-1">
                    IIT-JEE | NEET | Foundation
                  </p>
                </div>

                <div className="text-right">
                  <p className="tracking-[0.4em] text-xs text-gray-300">
                    RECEIPT NO.
                  </p>
                  <p className="text-xl font-bold text-yellow-500">
                    {receiptData.receiptNumber}
                  </p>
                  <p className="text-green-400 font-semibold mt-2">
                    ✔ REGISTERED
                  </p>
                </div>
              </div>

              {/* Title Section */}
              <div className="grid md:grid-cols-3 border-b">
                <div className="md:col-span-2 p-6 bg-gray-100 border-r">
                  <h2 className="text-3xl font-serif text-yellow-700 font-bold">
                    Advance Forte Scholarship Test
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Scholarship Examination | IIT-JEE | NEET | Foundation
                  </p>
                </div>
                <div className="p-6 text-center bg-gray-50">
                  <p className="tracking-[0.4em] text-xs text-gray-500">
                    ROLL NUMBER
                  </p>
                  <p className="text-2xl font-bold">{receiptData.rollNumber}</p>
                </div>
              </div>

              {/* Candidate Info */}
              <SectionTitle title="CANDIDATE INFORMATION" />

              <div className="grid md:grid-cols-4 border text-sm">
                <Info label="Candidate Name" value={receiptData.studentName} />
                <Info label="Student ID" value={receiptData.studentId} />
                <Info label="Parent / Guardian" value={receiptData.parentName} />
                <Info label="Contact" value={receiptData.phone} />
                <Info label="Course Applied For" value={receiptData.course} />
                <Info label="Class / Target" value={`Class ${receiptData.class}`} />
                <Info label="Academic Session" value={receiptData.academicSession} />
                <Info label="Registration Date" value={receiptData.registrationDate} />
              </div>

              {/* Fee + Transaction */}
              <div className="grid md:grid-cols-2 border-t">
                <div className="border-r">
                  <SectionTitle title="REGISTRATION FEE" />
                  <div className="p-6 text-sm">
                    <div className="flex justify-between border-b pb-2 mb-2">
                      <span>AFST Registration Fee</span>
                      <span>₹ {receiptData.paymentAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-yellow-700">
                      <span>Total Paid</span>
                      <span>₹ {receiptData.paymentAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <SectionTitle title="TRANSACTION INFORMATION" />
                  <div className="grid grid-cols-2 text-sm">
                    <Info label="Payment Method" value={receiptData.paymentMethod} />
                    <Info label="Transaction ID" value={receiptData.transactionId} />
                    <Info label="Payment ID" value={receiptData.paymentId} />
                    <Info label="Date & Time" value={receiptData.paymentDate} />
                    <Info
                      label="Fee Status"
                      value="Adj. towards Course Fee"
                      highlight
                    />
                  </div>
                </div>
              </div>

              {/* Admit Card Box */}
              <div className="mx-6 mt-6 border-l-4 border-blue-600 bg-blue-50 p-4 text-sm">
                <span className="font-semibold text-blue-700">ⓘ Admit Card:</span>{" "}
                Your Hall Ticket will be sent 3 days before the exam.
              </div>

              {/* Note Box */}
              <div className="mx-6 mt-4 border-l-4 border-yellow-600 bg-yellow-50 p-4 text-sm">
                <span className="font-semibold text-yellow-700">📌 Note:</span>{" "}
                Registration fee is non-refundable. Scholarship amount will be
                adjusted against course fee.
              </div>

              {/* Authorization */}
              <div className="mt-10 px-6">
                <h3 className="tracking-[0.6em] text-yellow-700 font-bold mb-4">
                  AUTHORIZATION
                </h3>
              </div>

              <div className="grid grid-cols-3 border-t border-b text-sm text-center">
                <div className="border-r p-6">
                  <div className="h-20"></div>
                  <div className="border-t pt-3 tracking-[0.3em]">
                    CANDIDATE / PARENT SIGNATURE
                  </div>
                </div>

                <div className="border-r p-6 flex items-center justify-center text-gray-400 tracking-widest">
                  [ OFFICIAL STAMP ]
                </div>

                <div className="p-6">
                  <div className="h-20"></div>
                  <div className="border-t pt-3 tracking-[0.3em]">
                    AUTHORIZED SIGNATORY
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#111827] text-gray-300 text-xs mt-6">
                <div className="grid md:grid-cols-3 text-center">
                  <div className="py-3 border-r border-gray-700">
                    Advance Forte | advanceforte.in
                  </div>
                  <div className="py-3 border-r border-gray-700">
                    Generated electronically — {receiptData.paymentDate}
                  </div>
                  <div className="py-3">
                    GST IN: 07AABCA1234C1Z5
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <div className="bg-gray-100 px-6 py-3 border-b">
    <h4 className="tracking-[0.4em] text-yellow-700 font-bold">
      {title}
    </h4>
  </div>
);

const Info = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="border p-4">
    <p className="tracking-[0.3em] text-xs text-gray-500 uppercase">
      {label}
    </p>
    <p className={`mt-1 font-semibold ${highlight ? "text-green-700" : ""}`}>
      {value}
    </p>
  </div>
);

export default Receipt;