import { decryptId } from "@/utils/encyrption/Encyrption";
import { Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint, { useReactToPrint } from "react-to-print";
const TaxInvoice = () => {
  const containerRef = useRef();
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const [spiceBoard, setSpiceBoard] = useState(null);
  const [spiceBoardBranch, setSpiceBoardBranch] = useState(null);
  const [productHsn, setProductHsn] = useState(null);
  const [lut, setLut] = useState(null);
  const [invoiceSubData, setInvoiceSubData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContractData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/panel-fetch-invoice-view-by-id/${decryptedId}`,
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
      setSpiceBoardBranch(data?.branch);
      setInvoiceSubData(data?.invoiceSub);
      setProductHsn(data?.producthsn);
      setLut(data?.lut);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContractData();
  }, [decryptedId]);

  const handlPrintPdf = useReactToPrint({
    content: () => containerRef.current,
    documentTitle: "invoice_gst",
    pageStyle: `
                @page {
                size: A4 portrait;
                margin: 5mm;
                
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
  return (
    <>
      <div className="relative">
        <button
          onClick={handlPrintPdf}
          className="fixed top-5 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          <Printer className="h-4 w-4" />
        </button>

        <div ref={containerRef} className="font-normal text-sm mt-10">
          <>
            <div className="p-4 m-[1rem] font-normal text-[11px]">
              <div className="max-w-4xl mx-auto border-2 border-black">
                <h3 className=" border-b border-black text-xl font-bold flex justify-center p-1">
                  TAX INVOICE
                </h3>
                <div className="grid grid-cols-2 border-b border-black">
                  <div className=" text-[11px] leading-relaxed mb-1 px-2">
                    <p>
                      <strong>ADITYA TRADERS</strong> <br />
                      D.No-287, Gaurav Villa, 5th Main Road, 15th Cross, <br />
                      SY NO.189/8,9,11,12,13, ADITYA COLD STORAGE, O V ROAD,
                      VELLATUR VILLAGE Prakasam -523109
                      <br />
                      <span className="mr-1">
                        GSTIN/UIN :
                      </span> 37AARFA3290K1ZZ <br />
                      <span className="mr-1">State Name :</span> Andhra Pradesh{" "}
                      <span className="mr-1">CFSSAI :</span> 10119008000329{" "}
                      <br />
                    </p>
                  </div>

                  <div className="grid  text-[11px]">
                    <div className="grid grid-cols-2 border-b border-l border-black w-full px-1">
                      <div className="w-full border-r border-black grid grid-cols-2 gap-2">
                        <div>
                          <h3>Invoice No.</h3>
                          <p className="text-[10px] font-semibold text-black">
                            AT2526003
                          </p>
                        </div>
                        <div>
                          <h3>e-Way Bill No</h3>
                          <p className="text-[10px] font-semibold text-black">
                            152080616236
                          </p>
                        </div>
                      </div>
                      <div className="w-full px-1">
                        <h3>Dated</h3>
                        <p className="font-semibold text-black">5-Aug-24</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-b border-l border-black w-full px-1">
                      <div className="w-full border-r border-black">
                        <h3>Delivery Note</h3>
                        <p>Dummy</p>
                      </div>
                      <div className="w-full px-1">
                        <h3>Mode/Terms of Payment</h3>
                        <p>Dummy</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-full px-1 border-l border-black">
                      <div className="w-full border-r border-black">
                        <h3>Reference No. & Date.</h3>
                        <p>Dummy</p>
                      </div>
                      <div className="w-full px-1">
                        <h3>Other References</h3>
                        <p>Dummy</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //second */}
                <div className="grid grid-cols-2">
                  <div className="border-b border-black">
                    <div className=" text-[11px] ">
                      <p className="leading-relaxed px-1 mb-1">
                        <p>Consignee (Ship to)</p>
                        <strong>D & M Engineering Contractors</strong> <br />
                        4TH Floor,Umiya Business Bay Tower 1 Embassy Tech
                        Square,Main Road, <br />
                        Kaverappa Layout,Kadubesanahalli Bangalore <br />
                        <p>GSTIN/UIN: 29BVHPK7881A1ZB </p>
                        <p>State Name:Karnataka,Code: 29 </p>
                      </p>
                    </div>
                  </div>

                  <div className="grid  text-[11px]">
                    <div className="grid grid-cols-2 border-b border-l border-black w-full px-1">
                      <div className="w-full border-r border-black">
                        <h3>Buyer’s Order No. .</h3>
                        <p className="font-semibold text-black">
                          V3C/G155/24-25
                        </p>
                      </div>
                      <div className="w-full px-1">
                        <h3>Dated</h3>
                        <p className="font-semibold text-black">5-Aug-24</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-b border-l border-black w-full px-1">
                      <div className="w-full border-r border-black">
                        <h3>Dispatch Doc No.</h3>
                        <p>Dummy</p>
                      </div>
                      <div className="w-full px-1">
                        <h3>Delivery Note Date</h3>
                        <p>Dummy</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 w-full px-1 border-l border-b  border-black">
                      <div className="w-full border-r border-black">
                        <h3>Dispatched through .</h3>
                        <p>dummy</p>
                      </div>
                      <div className="w-full px-1">
                        <h3>Destination</h3>
                        <p>Dummy</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full px-1 border-l border-b  border-black">
                      <div className="w-full border-r border-black">
                        <h3>Bill of Lading/LR-RR No. .</h3>
                        <p>dummy</p>
                      </div>
                      <div className="w-full px-1">
                        <h3>Motor Vehicle No.</h3>
                        <p>Dummy</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //third */}

                <div className="grid grid-cols-2">
                  <div>
                    <div className=" text-[11px]">
                      <p className="leading-relaxed px-1 mb-1">
                        <p>Buyer (Bill to)</p>
                        <strong>D & M Engineering Contractors</strong> <br />
                        Ground Floor,644,19th Layout Arkavathy Layout, Chelkere
                        <br />
                        Kalyan Nagar,Bangalore
                        <br />
                        <p>GSTIN/UIN: 29BVHPK7881A1ZB </p>
                        <p>State Name:Karnataka,Code: 29 </p>
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] border-l border-black">
                    <div className="w-full px-1">
                      <div className="w-full">
                        <h3>Terms of Delivery</h3>

                        <h3>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aliquid dolorem esse possimus quas minus.
                          Laboriosam voluptates totam placeat esse, aperiam illo
                          illum quasi animi commodi officia. Vitae, libero!
                          Ducimus tempora, ipsum libero ratione itaque provident
                          perferendis labore mollitia fuga? Corrupti debitis
                          quidem obcaecati dolorum dolor nihil! Minima soluta
                          pariatur ipsam.
                        </h3>
                      </div>
                    </div>{" "}
                  </div>
                </div>
                {/* //fourth */}
                <div>
                  <table className="w-full border-t border-black text-[11px]">
                    <thead>
                      <tr className="border-b border-black">
                        <th className="w-[5%] border-r border-black p-1 text-center">
                          S. No
                        </th>
                        <th className="w-[33%] border-r border-black p-1 text-center">
                          Description of Service
                        </th>
                        <th className="w-[10%] border-r border-black p-1 text-center">
                          HSN/SAC
                        </th>
                        <th className="w-[15%] border-r border-black p-1 text-center">
                          Quantity
                        </th>
                        <th className="w-[10%] border-r border-black p-1 text-center">
                          Rate
                        </th>
                        <th className="w-[5%] border-r border-black p-1 text-center">
                          Per
                        </th>
                        <th className="w-[15%] p-1 text-center">Amount</th>
                      </tr>
                    </thead>

                    <tbody className="text-[12px]">
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1 text-center">
                          1
                        </td>
                        <td className="border-r border-black p-1">
                          Deep Cleaning Services(SFT)
                        </td>
                        <td className="border-r border-black p-1 text-center">
                          9958
                        </td>
                        <td className="border-r border-black p-1 text-end font-semibold">
                          7,200.00 SFT
                        </td>
                        <td className="p-1 text-end border-r border-black">
                          2.25
                        </td>
                        <td className="p-1 text-center border-r border-black">
                          SFT
                        </td>
                        <td className="p-1 text-end">16,200.00</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1 text-center">
                          2
                        </td>
                        <td className="border-r border-black p-1">
                          Deep Cleaning Services New(SFT)
                        </td>
                        <td className="border-r border-black p-1 text-center">
                          9158
                        </td>
                        <td className="border-r border-black p-1 text-end font-semibold">
                          5,200.00 SFT
                        </td>
                        <td className="p-1 text-end border-r border-black">
                          2.15
                        </td>
                        <td className="p-1 text-center border-r border-black">
                          SFT
                        </td>
                        <td className="p-1 text-end">10,240.00</td>
                      </tr>

                      <tr className="border-b border-black">
                        <td className="border-r border-black p-1 text-left"></td>
                        <td className="border-r text-end border-black p-1 font-bold">
                          <p>CGST @ 9%</p>
                          <p>SGST @ 9%</p>
                        </td>
                        <td className="border-r border-black p-1 text-center"></td>
                        <td className="border-r border-black p-1 text-end font-semibold"></td>
                        <td className="border-r text-end border-black p-1 font-bold">
                          <p>9</p>
                          <p> 9</p>
                        </td>
                        <td className="border-r text-left border-black p-1 font-bold">
                          <p>%</p>
                          <p>%</p>
                        </td>{" "}
                        <td className=" text-end  p-1 font-bold">
                          <p>1,458.00</p>
                          <p>1,258.00</p>
                        </td>{" "}
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-b border-black">
                        <td className="border-r border-black p-2 text-left"></td>
                        <td className="border-r text-end border-black p-2 font-bold">
                          Total
                        </td>
                        <td className="border-r border-black p-2 text-center"></td>
                        <td className="border-r border-black p-2 text-end font-semibold">
                          7,200.00 SFT
                        </td>
                        <td className="border-r text-end border-black p-2 font-bold"></td>
                        <td className="border-r text-left border-black p-2 font-bold"></td>{" "}
                        <td className=" text-end  p-2 font-bold ">
                          ₹ 19,116.00
                        </td>{" "}
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* //fifth */}
                <div className="text-[11px] mb-1">
                  <div className="flex justify-between">
                    <h2 className="items-start px-1">
                      Amount Chargeable (in words)
                    </h2>
                    <h2 className="items-end px-1">E. & O.E</h2>
                  </div>
                  <h2 className="font-bold px-1 text-sm">
                    {" "}
                    INR Nineteen Thousand One Hundred Sixteen Only
                  </h2>
                </div>
                {/* sixth */}

                <table className="w-full border-y border-black text-[11px]">
                  <thead className="leading-tight">
                    {" "}
                    <tr>
                      <th className="border-r border-black px-2 py-0.5 text-center">
                        HSN/SAC
                      </th>
                      <th className="border-r border-black px-2  py-0.5 text-center">
                        Taxable Value
                      </th>
                      <th
                        colSpan="2"
                        className="border-r border-b border-black px-2  py-1 text-center"
                      >
                        Central Tax
                      </th>
                      <th
                        colSpan="2"
                        className="border-r border-b border-black px-2 py-1 text-center"
                      >
                        State Tax
                      </th>
                      <th className="px-2 py-0.5 text-center">
                        Total Tax Amount
                      </th>
                    </tr>
                    <tr className="border-b border-black">
                      <th className="border-r border-black px-2 py-0.5 text-center"></th>
                      <th className="border-r border-black px-2 py-0.5 text-center"></th>
                      <th className="border-r border-black px-2 py-1 text-center">
                        Rate
                      </th>
                      <th className="border-r border-black px-2 py-1 text-center">
                        Amount
                      </th>
                      <th className="border-r border-black px-2 py-1 text-center">
                        Rate
                      </th>
                      <th className="border-r border-black px-2 py-1 text-center">
                        Amount
                      </th>
                      <th className="px-2 py-0.5 text-center"></th>
                    </tr>
                  </thead>

                  <tbody className="leading-tight text-[11px]">
                    <tr className="border-b border-black">
                      <td className="border-r border-black px-2 py-1 text-center">
                        9958
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        16,200.00
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        9%
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        1,458.00
                      </td>

                      <td className="border-r border-black px-2 py-1 text-center">
                        9%
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        1,458.00
                      </td>
                      <td className="px-2 py-1 text-center">2,916.00</td>
                    </tr>

                    <tr className="border-t border-black font-semibold leading-tight text-[11px]">
                      <td className="border-r border-black px-2 py-1 text-center">
                        Total
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        16,200.00
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center"></td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        1,458.00
                      </td>
                      <td className="border-r border-black px-2 py-1 text-center"></td>
                      <td className="border-r border-black px-2 py-1 text-center">
                        1,458.00
                      </td>
                      <td className="px-2 py-1 text-center">2,916.00</td>
                    </tr>
                  </tbody>
                </table>

                {/* //seven */}
                <div className="text-[11px] px-1 ">
                  <p>
                    {" "}
                    Tax Amount (in words) :{" "}
                    <span className="font-bold">
                      INR Two Thousand Nine Hundred Sixteen Only
                    </span>
                  </p>
                  {/* exight */}
                  <div className="grid grid-cols-2">
                    <div className="flex item items-end">
                      <div>
                        {" "}
                        <p>
                          {" "}
                          Company's PAN :{" "}
                          <span className="font-bold ml-10">BVHPK7881A</span>
                        </p>
                        <p className="underline">Declaration</p>
                      </div>
                    </div>
                    <div className="mb-1">
                      Company's Bank Details
                      <p>
                        {" "}
                        Bank Name:{" "}
                        <span className="font-bold">HDFC BANK-4428</span>
                      </p>
                      <p>
                        {" "}
                        A/c No: <span className="font-bold"> HDFC0003758</span>
                      </p>
                      <p>
                        {" "}
                        Branch & IFS Code:{" "}
                        <span className="font-bold"> 50200012354428 </span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* //nine */}
                <div className="grid grid-cols-2">
                  <div>
                    <div className="px-1 mb-1">
                      <p>
                        1) Payment to be released within the due date else
                        interest @18% will be charged
                      </p>
                      <p>
                        2) Kindly acknowledge duplicate copy of invoice for our
                        accounting purpose.
                      </p>
                    </div>
                  </div>
                  <div className="relative border-t border-l border-black h-20">
                    <p className="absolute top-0 right-0 p-1">
                      for ADITYA TRADERS
                    </p>
                    <div className="flex justify-center">
                      {/* <img
                        src={stamplogo}
                        alt="Seal"
                        className="w-full max-w-[80px] h-auto"
                      /> */}
                    </div>

                    <p className="absolute bottom-0 right-0 p-1">
                      {" "}
                      Authorised Signatory
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center ">
                {" "}
                <div>
                  {" "}
                  <p>SUBJECT TO BANGALORE JURISDICTION</p>
                  <p>This is a Computer Generated Invoice</p>
                </div>
              </div>
              <div className="page-break"></div>
              <div className="empty-page"></div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default TaxInvoice;
