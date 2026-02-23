import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, CheckCircle, Clock, Users, BookOpen, CreditCard, Shield, Award, Target, Calendar, FileText } from 'lucide-react';
import scholarshipHeroBanner from '../assets/images/scholarship-hero-banner.png';
import API from '../api.js';
import { useNavigate } from "react-router-dom";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
   
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


const Scholarship: React.FC = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    class: '',
    course: '',
    parentName: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed to load");
        setLoading(false);
        return;
      }

      //  Create Razorpay order and register student
      const { data: order } = await API.post("/scholarship/create-order", {
        ...formData,
        amount: 1
      });

      if (!order?.order?.id) {
        alert("Failed to create payment order");
        setLoading(false);
        return;
      }

      //  Razorpay options
      const options = {
        key: "rzp_test_S80hQQ3oEIokjk", 
        amount: order.order.amount,
        currency: "INR",
        order_id: order.order.id,
        name: "Forte Scholarship Test",
        description: "Scholarship Registration Fee",

        handler: async (response: any) => {
          try {
            const { data } = await API.post("/scholarship/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (data.message === "Payment successful") {
              alert("🎉 Scholarship registration successful!");
              setShowPayment(false);
              setFormData({
                studentName: "",
                email: "",
                phone: "",
                class: "",
                course: "",
                parentName: "",
                address: "",
                city: "",
                state: "",
                pincode: ""
              });
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Payment verification error");
          }
        },

        prefill: {
          name: formData.studentName,
          email: formData.email,
          contact: formData.phone
        },

        theme: {
          color: "#2563EB"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
  console.error("Full Error:", err.response?.data);

  if (err.response?.data?.message) {
    alert(err.response.data.message);
  } else {
    alert("Something went wrong. Please try again.");
  }

}finally {

      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="w-full h-[60vh] md:h-[70vh]">
          <img 
            src={scholarshipHeroBanner} 
            alt="Scholarship Program" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Scholarship Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Scholarship Test Details
            </h2>
            <p className="text-lg text-gray-600">
              Complete information about our scholarship examination process
            </p>
           <button
  onClick={() => navigate("/receipt")}
  className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
>
  Download Scholarship Fee Receipt
</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Test Pattern */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Test Pattern</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Multiple Choice Questions</li>
                <li>• Subject-wise sections</li>
                <li>• 2 hours duration</li>
                <li>• Online proctored exam</li>
              </ul>
            </div>

            {/* Eligibility */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Eligibility</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Classes 8-12 students</li>
                <li>• Minimum 75% in previous class</li>
                <li>• Age limit as per class</li>
                <li>• Valid documents required</li>
              </ul>
            </div>

            {/* Scholarship Slabs */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Scholarship Slabs</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 90% - 1st Rank</li>
                <li>• 75% - 2nd Rank</li>
                <li>• 50% - 3rd Rank</li>
                <li>• 25% - 4th Rank</li>
              </ul>
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Calendar className="text-primary-600" size={28} />
              Important Dates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-1">10 Jan</div>
                  <div className="text-sm text-gray-600">Registration Opens</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-1">5 Mar</div>
                  <div className="text-sm text-gray-600">Registration Closes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-1">11 Mar</div>
                  <div className="text-sm text-gray-600">Scholarship Test</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-xl p-4 shadow-md">
                  <div className="text-2xl font-bold text-primary-600 mb-1">15 Mar</div>
                  <div className="text-sm text-gray-600">Results Declared</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Enroll for Scholarship Test
            </h2>
            <p className="text-lg text-gray-600">
              Fill the form below to register for the scholarship examination
            </p>
          </div>

          {!showPayment ? (
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name *
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      required
                      value={formData.studentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter student's full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                         pattern="[6-9]{1}[0-9]{9}"
                      maxLength={10}
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Class *
                    </label>
                    <select
                      name="class"
                      required
                      value={formData.class}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Class</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Interest *
                    </label>
                    <select
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Course</option>
                     <option value="IIT-JEE Preparation">IIT-JEE Preparation</option>
                      <option value="NEET Preparation">NEET Preparation</option>
                      <option value="Foundation Course">Foundation Course</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter parent's name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter state"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter PIN code"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="text-yellow-600 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-1">Registration Fee</h4>
                      <p className="text-yellow-700 text-sm">
                        A nominal registration fee of ₹499/- is required to confirm your seat for the scholarship test.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                   onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <CreditCard size={24} />
                  {loading ? "Processing..." : "Proceed to Payment (₹499/-)"}
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl text-center">
              <div className="mb-6">
                <CreditCard className="mx-auto text-primary-600 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Complete Payment</h3>
                <p className="text-gray-600">Secure payment gateway integration</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Registration Fee:</span>
                  <span className="font-bold text-xl">₹499/-</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700">Processing Fee:</span>
                  <span className="font-bold">₹0</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary-600">₹499/-</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Pay with UPI
                </button>
                <button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Debit/Credit Card
                </button>
                <button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Net Banking
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Shield size={16} />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Scholarship Program?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Merit-Based</h3>
              <p className="text-gray-600">Fair and transparent selection process based on academic performance</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">Focused preparation for IIT-JEE, NEET, and competitive exams</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Expert Guidance</h3>
              <p className="text-gray-600">Learn from experienced faculty with proven track records</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2">Comprehensive</h3>
              <p className="text-gray-600">Complete study material and regular assessments included</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scholarship;