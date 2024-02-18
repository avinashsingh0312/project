 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 
const DashboardHome = () => {
  const { email: businessEmail } = useParams();
  const [invoices, setInvoices] = useState([]);
  const [currentTrainingsCount, setCurrentTrainingsCount] = useState(0);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/businessinvoices/${businessEmail}`);
        setInvoices(response.data);
 
        // Calculate current trainings count
        const currentTrainings = response.data.filter(invoice => invoice.status === 'current' && invoice.email === businessEmail && invoice.paymentStatus === true);
        setCurrentTrainingsCount(currentTrainings.length);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
 
    fetchData();
  }, [businessEmail]);
 
  // Filter invoices with payment status true
  const filteredInvoices = invoices.filter(invoice => invoice.paymentStatus === true);
 
  return (
    <>
      <div className="container mx-auto my-5">
        <h2 className="text-3xl font-semibold mb-4 text-center">Dashboard of {businessEmail}</h2>
      </div>
     
      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-4">
          {/* Grid Layout */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">No of Invoice Request</h2>
              <p className="text-4xl font-bold text-center text-gray-700">{filteredInvoices.length}</p>
            </div>
            <div className="bg-white p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Trainings</h2>
              <p className="text-4xl font-bold text-center text-gray-700">{invoices.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
 
export default DashboardHome;
 