import React, { useEffect, useState } from "react";
import Page from "../dashboard/page";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import BASE_URL from "@/config/BaseUrl";
import EmailDialog from "./EmailDialog";
import logo from "../../../public/assets/logo_ace.png";
import logoMaker from "../../../public/assets/logo_ace.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const ViewContract = () => {
  const { id } = useParams();
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${BASE_URL}/api/panel-fetch-contract-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contract data");
        }

        const data = await response.json();
        setContractData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContractData();
  }, [id]);

  const handlePDF = async () => {
    try {
      // Convert the image to a data URL
      const toDataURL = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
  
      // Convert the logo to a data URL
      const logoDataURL = await toDataURL(logoMaker);
  
      // Define the content for the PDF
      const content = [
        { text: "Contract Details", style: "header" },
        { text: "\n" }, // Add some spacing
  
        // Add contract information
        { text: "Contract Information", style: "subheader" },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `ID: ${contractData.contract.id}`, width: "50%" },
            { text: `Company ID: ${contractData.contract.company_id}`, width: "50%" },
          ],
        },
        {
          columns: [
            { text: `Branch Short: ${contractData.contract.branch_short}`, width: "50%" },
            { text: `Branch Name: ${contractData.contract.branch_name}`, width: "50%" },
          ],
        },
       
        { text: "\nContract Sub Details", style: "subheader" },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                "ID",
                "Item Name",
                "Marking",
                "Description of Goods",
                "Item Bag",
                "Packing",
                "Bag Size",
                "Quantity in MT",
                "Rate MT",
                "SBAGA",
              ],
              ...contractData.contractSub.map((sub) => [
                sub.id,
                sub.contractSub_item_name,
                sub.contractSub_marking,
                sub.contractSub_descriptionofGoods,
                sub.contractSub_item_bag,
                sub.contractSub_packing,
                sub.contractSub_bagsize,
                sub.contractSub_qntyInMt,
                sub.contractSub_rateMT,
                sub.contractSub_sbaga,
              ]),
            ],
          },
        },
      ];
  
     
      const docDefinition = {
        header: {
          image: "logo",
          width: 200, 
          alignment: "center",
          margin: [0, 10, 0, 10],
        },
        content: content,
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, 10], // Add margin below the header
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5], // Add margin below the subheader
          },
        },
        images: {
          logo: logoDataURL, // Use the data URL of the logo
        },
      };
  
      // Generate and download the PDF
      pdfMake.createPdf(docDefinition).download(`contract_${id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };
  
  const handleSendEmail = async (email) => {
    const input = document.getElementById("contract-details");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageCount = Math.ceil(imgHeight / pageHeight);

      for (let i = 0; i < pageCount; i++) {
        if (i > 0) {
          pdf.addPage();
        }

        const srcY = i * (canvas.height / pageCount);
        const destY = 0;

        pdf.addImage(
          imgData,
          "PNG",
          0,
          destY - i * pageHeight,
          imgWidth,
          imgHeight
        );
      }

      const pdfBlob = pdf.output("blob");
      const formData = new FormData();
      formData.append("file", pdfBlob, `contract_${id}.pdf`);

      fetch(`${BASE_URL}/api/send-email`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Email sent successfully!");
          } else {
            alert("Failed to send email.");
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Error sending email.");
        });
    });
  };

  if (loading) {
    return (
      <Page>
        <div className="flex justify-center items-center h-full">
          <Button disabled>
            <Loader2 className=" h-4 w-4 animate-spin" />
            Loading contract Data
          </Button>
        </div>
      </Page>
    );
  }

  // Render error state
  if (error) {
    return (
      <Page>
        <Card className="w-full max-w-md mx-auto mt-10">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Fetching contract Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Try Again</Button>
          </CardContent>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <div id="contract-details">
        <div className="flex justify-between">
          <h1>Contract Details</h1>
          <div>
            <button
              className="border border-gray-200 p-1 bg-blue-100 rounded-lg hover:bg-blue-500 mr-2"
              onClick={handlePDF}
            >
              Generate PDF
            </button>
            <button
              className="border border-gray-200 p-1 bg-green-100 rounded-lg hover:bg-green-500"
              onClick={() => setEmailDialogOpen(true)}
            >
              Send to Mail
            </button>
          </div>
        </div>
        {contractData && (
          <>
            <h2>Contract Information</h2>
            <img
              src={logo}
              alt="img"
              width={500}
              height={100}
              className="bg-cover"
            />
            <div className="grid grid-cols-2">
              <p>
                <strong>ID:</strong> {contractData.contract.id}
              </p>
              <p>
                <strong>Company ID:</strong> {contractData.contract.company_id}
              </p>
              <p>
                <strong>Branch Short:</strong>{" "}
                {contractData.contract.branch_short}
              </p>
              <p>
                <strong>Branch Name:</strong>{" "}
                {contractData.contract.branch_name}
              </p>

              <p>
                <strong>Branch Address:</strong>{" "}
                {contractData.contract.branch_address}
              </p>
              <p>
                <strong>Contract Year:</strong>{" "}
                {contractData.contract.contract_year}
              </p>
              <p>
                <strong>Contract Date:</strong>{" "}
                {contractData.contract.contract_date}
              </p>
              <p>
                <strong>Contract No:</strong>{" "}
                {contractData.contract.contract_no}
              </p>

              <p>
                <strong>Contract Ref:</strong>{" "}
                {contractData.contract.contract_ref}
              </p>
              <p>
                <strong>Contract PONO:</strong>{" "}
                {contractData.contract.contract_pono}
              </p>
              <p>
                <strong>Contract Buyer:</strong>{" "}
                {contractData.contract.contract_buyer}
              </p>
              <p>
                <strong>Contract Buyer Address:</strong>{" "}
                {contractData.contract.contract_buyer_add}
              </p>

              <p>
                <strong>Contract Consignee:</strong>{" "}
                {contractData.contract.contract_consignee}
              </p>
              <p>
                <strong>Contract Consignee Address:</strong>{" "}
                {contractData.contract.contract_consignee_add}
              </p>
             
            </div>

            <h2>Contract Sub Details</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Marking</th>
                  <th>Description of Goods</th>

                  <th>Item Bag</th>
                  <th>Packing</th>
                  <th>Bag Size</th>
                  <th>Quantity in MT</th>
                  <th>Rate MT</th>
                  <th>SBAGA</th>
                </tr>
              </thead>
              <tbody>
                {contractData.contractSub.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.id}</td>
                    <td>{sub.contractSub_item_name}</td>
                    <td>{sub.contractSub_marking}</td>
                    <td>{sub.contractSub_descriptionofGoods}</td>

                    <td>{sub.contractSub_item_bag}</td>
                    <td>{sub.contractSub_packing}</td>
                    <td>{sub.contractSub_bagsize}</td>
                    <td>{sub.contractSub_qntyInMt}</td>
                    <td>{sub.contractSub_rateMT}</td>
                    <td>{sub.contractSub_sbaga}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <EmailDialog
        open={emailDialogOpen}
        onClose={() => setEmailDialogOpen(false)}
        onSend={handleSendEmail}
      />
    </Page>
  );
};

export default ViewContract;
