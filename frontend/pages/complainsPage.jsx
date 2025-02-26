import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "../constants/api";

export default function ComplainsPage()
{
  const [complaintData, setcomplaintData] = useState()
  const [loading,setLoaing]=useState(true)
  function getData()
  {
    setcomplaintData(JSON.parse(localStorage.getItem('complain')))
    setLoaing(false)
  }

  async function fileComplain()
  {
    const results = api.post('/file', Object.assign({}, complaintData, { userid: sessionStorage.getItem("usedid") }))
    console.log(results)
  }
  async function handleDownload()
  {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/download_pdf?filename=${complaintData.pdf_path}`, {
        responseType: "blob", 
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = complaintData.pdf_path; 
      document.body.appendChild(link);
      link.click(); 
      document.body.removeChild(link); 
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }
  useEffect(() => {
      getData()
    },[])
    return (
      loading ? <div>
        getting your compaint read
</div>:(      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Complaint Letter</h2>

      <p className="text-gray-600 mb-2">{complaintData.date}</p>

      <div className="mb-4">
        <p className="font-semibold">{complaintData.from}</p>
        <p className="font-semibold mt-2">{complaintData.to}</p>
      </div>

      <h3 className="text-lg font-bold mb-2">{complaintData.subject}</h3>

      <p className="text-gray-700 whitespace-pre-line mb-4">{complaintData.body}</p>
      <span className="half">
      <button
        onClick={handleDownload}
        
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-auto"
        >
        Download PDF
          </button>
          <button className="button" onClick={()=>{fileComplain()}}> File Complain</button>
        </span>
    </div>)
    )
}