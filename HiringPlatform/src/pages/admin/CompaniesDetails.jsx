import React, { useEffect, useState } from "react";
import EditCompanyModal from "./EditCompanyModal";

function CompaniesDetails() {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/admincompanies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleEdit = (companyId) => {
    setIsModalOpen(true);
    setSelectedCompanyId(companyId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyId(null);
  };

  const handleDelete = async (companyId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admincompanies/${companyId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchCompanies();
      console.log("Company deleted successfully");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-2 py-4">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Companies Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-400 text-black">
              <tr>
                <th className="py-2 px-3 text-left">Unique ID</th>
                <th className="py-2 px-3 text-left">Company Name</th>
                <th className="py-2 px-3 text-left">Location</th>
                <th className="py-2 px-3 text-left">Email</th>
                <th className="py-2 px-3 text-left">Phone</th>
                <th className="py-2 px-3 text-left">Domain</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company._id} className="bg-white">
                  <td className="py-2 px-3">{company.uniqueId}</td>
                  <td className="py-2 px-3">{company.companyName}</td>
                  <td className="py-2 px-3">{company.location}</td>
                  <td className="py-2 px-3">{company.email}</td>
                  <td className="py-2 px-3">{company.phone}</td>
                  <td className="py-2 px-3">{company.domain}</td>
                  <td className="py-2 px-3">
                    <button
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-4 rounded mr-1"
                      onClick={() => handleEdit(company._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-1 px-2 rounded"
                      onClick={() => handleDelete(company._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Render the EditCompanyModal component */}
        <EditCompanyModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          companyId={selectedCompanyId}
          fetchCompanies={fetchCompanies}
        />
      </div>
    </>
  );
}

export default CompaniesDetails;
