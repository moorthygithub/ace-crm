import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Printer } from "lucide-react";
import html2pdf from "html2pdf.js";
import BASE_URL from "@/config/BaseUrl";
import { useParams } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { getTodayDate } from "@/utils/currentDate";
import moment from "moment";

const InvoiceSpiceBoard = () => {
  const containerRef = useRef();
  const { id } = useParams();
  const [spiceBoard, setSpiceBoard] = useState(null);
  const [invoiceSubData, setInvoiceSubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${BASE_URL}/api/panel-fetch-invoice-view-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch invoice data");
        }

        const data = await response.json();
        setSpiceBoard(data?.invoice);
        setInvoiceSubData(data?.invoiceSub);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContractData();
  }, [id]);

  const handleSaveAsPdf = () => {
    const element = containerRef.current;

    const images = element.getElementsByTagName("img");
    let loadedImages = 0;

    if (images.length === 0) {
      generatePdf(element);
      return;
    }

    Array.from(images).forEach((img) => {
      if (img.complete) {
        loadedImages++;
        if (loadedImages === images.length) {
          generatePdf(element);
        }
      } else {
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            generatePdf(element);
          }
        };
      }
    });
  };

  const generatePdf = (element) => {
    const options = {
      margin: [0, 0, 0, 0],
      filename: "spice_board.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        windowHeight: element.scrollHeight,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: "avoid" },
    };

    html2pdf()
      .from(element)
      .set(options)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        console.log(`Element Height: ${element.scrollHeight}`);
        console.log(`Page Width: ${pageWidth}, Page Height: ${pageHeight}`);

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(10);
          pdf.setTextColor(0, 0, 0);
          const text = `Page ${i} of ${totalPages}`;
          const textWidth =
            (pdf.getStringUnitWidth(text) * 10) / pdf.internal.scaleFactor;
          const x = pageWidth - textWidth - 10;
          const y = pageHeight - 10;
          pdf.text(text, x, y);
        }
      })
      .save();
  };

  const handlPrintPdf = useReactToPrint({
    content: () => containerRef.current,
    documentTitle: "Spice-board-view",
    pageStyle: `
        @page {
        size: auto;
        margin: 0mm;
        
      }
      @media print {
        body {
          border: 0px solid #000;
              font-size: 10px; 
          margin: 0mm;
          padding: 0mm;
          min-height: 100vh;
        }
           table {
           font-size: 11px;
         }
        .print-hide {
          display: none;
        }
       
      }
      `,
  });
  if (loading) {
    return (
      <Card className="w-full h-[80vh] flex items-center justify-center">
        <CardContent>
          <Button disabled className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading Spice Data
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <Button variant="outline">Try Again</Button>
        </CardContent>
      </Card>
    );
  }
  return (
    <div>
      <div>
        <button
          onClick={handleSaveAsPdf}
          className="fixed top-5 right-24 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          <FileText className="w-4 h-4" />
        </button>
        <button
          onClick={handlPrintPdf}
          className="fixed top-5 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          <Printer className="h-4 w-4" />
        </button>
      </div>
      <div ref={containerRef} className="max-w-4xl mx-auto p-6 bg-white  ">
        <div className="mb-4">
          <p className="font-bold text-left text-[13px] underline">TO</p>
          <p className="font-bold text-left text-[13px] underline">
            THE SPICE BOARD, REGIONAL OFFICE
          </p>
          <p className="font-bold text-left text-[13px] underline">CHENNAI</p>
          <p className="font-bold text-left text-[13px] underline">
            FAX : 044249974274
          </p>
        </div>

        <div>
          <h2 className="text-sm underline text-start mb-4 uppercase">
            <p>
              DETAILS OF PROPOSED EXPORT OF {spiceBoard?.invoice_product}{" "}
              PRODUCTS CONTAINING CHILLIES
            </p>
            <p>(VIDE CIRCULAR NO.MD/CHI/01/03/DATED 09.10.2003)</p>
          </h2>
        </div>

        <table className="w-full border  text-[13px] border-black">
          <tbody>
            <tr>
              <td className="p-1 border-r border-b border-black text-center w-[4%]">
                1
              </td>
              <td className="p-1 border-b border-r border-black text-left w-[23%]">
                Name & Address of the Exporter
              </td>
              <td className="border-b font-bold border-black px-2 py-1 w-[73%]">
                {spiceBoard?.branch_name} <br />
                {spiceBoard?.branch_address}
              </td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black  text-center">
                2
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Certificate of Registration
              </td>
              <td className="p-1 border-b border-black"></td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                3
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Name & Address of the processor, if different from the Exporter
              </td>
              <td className="p-1 border-b font-bold border-black">
                {spiceBoard?.branch_name}
                <br />
                {spiceBoard?.branch_address}
              </td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                4
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Details of items to be Exported
              </td>
              <td className="border-b border-black ">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white">
                      <th className="border-b border-r border-black">Name</th>
                      <th className="border-b border-r border-black">
                        QTY. (MT)
                      </th>
                      <th className="border-b border-black">
                        FOB Price (Rs/Kg)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceSubData?.map((item, index) => (
                      <tr key={index}>
                        <td className="border-r border-black px-2 py-1">
                          {item?.invoiceSub_descriptionofGoods}
                        </td>
                        <td className="border-r border-black px-2 py-1">
                          {item?.invoiceSub_qntyInMt} MT
                        </td>
                        {index === Math.floor(invoiceSubData.length / 2) ? (
                          <td className="px-2 py-1 text-center font-bold">
                            60.00 PER KG
                          </td>
                        ) : (
                          <td className="px-2 py-1"></td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                5
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Quantity & FOB Price of Export
              </td>
              <td className="p-1  font-bold border-b border-black">
                QTY{" "}
                {invoiceSubData
                  ?.reduce(
                    (total, item) =>
                      total + (parseFloat(item?.invoiceSub_qntyInMt) || 0),
                    0
                  )
                  .toFixed(3)}{" "}
                MT
                <br />₹
                {invoiceSubData
                  ?.reduce(
                    (total, item) =>
                      total +
                      (parseFloat(item?.invoiceSub_qntyInMt) || 0) * 60 * 1000,
                    0
                  )
                  .toLocaleString("en-IN")}
              </td>
            </tr>

            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                6
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Address of the place where container is to be stuffed and
                Customs clearance if different from Port of Shipment
              </td>
              <td className="p-1 border-b border-black"></td>
            </tr>

            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                7
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Lot No. & Shipping Marks
              </td>

              <td className="p-1 border-b border-black align-top">
                <div className="flex flex-col">
                  {invoiceSubData?.map((item, index) => (
                    <span key={index} className="py-1">
                      {item?.invoiceSub_marking}
                    </span>
                  ))}
                </div>
              </td>
            </tr>

            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                8
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Probable date of Shipment
              </td>
              <td className="p-1 border-b border-black"></td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                9
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Port of Shipment
              </td>
              <td className="p-1 border-b font-bold border-black">
                {spiceBoard?.invoice_loading}, INDIA
              </td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                10
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Port & Country of Discharge
              </td>
              <td className="p-1 font-bold border-b border-black">
                {spiceBoard?.invoice_destination_port},{" "}
                {spiceBoard?.invoice_destination_country}
              </td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                11
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Name of the Vessel
              </td>
              <td className="p-1 border-b border-black">
                {spiceBoard?.invoice_vessel}
              </td>
            </tr>
            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                12
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Container No.
              </td>
              <td className="p-1 border-b border-black">
                {spiceBoard?.invoice_container}
              </td>
            </tr>

            <tr>
              <td className="p-1 border-r border-b border-black text-center">
                13
              </td>
              <td className="p-1 border-b border-r border-black text-left">
                Contact CHA Agent at Chennai
              </td>
              <td className="p-1 border-b font-bold border-black">
                NIFCO SEAFREIGHT PVT. LTD., CHENNAI <br />
                PH: 044-25353405 / 25353392 <br />
                CTP: MR. VIJAY, Mob: 9841582641 <br />
                CTP: MR. PRASAD, Mob: 9841582640
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-2 flex flex-row items-center justify-around">
          <div>
            <p className="text-sm">
              PLACE : <strong>{spiceBoard?.invoice_loading}</strong>
            </p>
            <p className="text-sm">
              DATE :{" "}
              <strong>{moment(getTodayDate()).format("DD-MMM-YYYY")}</strong>
            </p>
          </div>
          <div>
            <p className=" mt-10 text-center text-sm">Signature</p>
            <p className="text-sm">Name & Designation (With Seal)</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-evenly">
          <p className="text-sm">
            CC TO : SPICE BOARD, COCHIN - ATTN MR.S.KANNAN (0484 - 2331429)
          </p>
          <p></p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSpiceBoard;
