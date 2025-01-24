import Page from "@/app/dashboard/page";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import BASE_URL from "@/config/BaseUrl";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download } from "lucide-react";
import axios from "axios";
import { ButtonConfig } from "@/config/ButtonConfig";

const contractFormSchema = z.object({
  from_date: z.string().min(1, "From date is required"),
  to_date: z.string().min(1, "To Date is required"),
  branch_short: z.string().optional(),
  buyer: z.string().optional(),
  consignee: z.string().optional(),
  container_size: z.string().optional(),
  product: z.string().optional(),
  status: z.string().optional(),
});

const createContract = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No authentication token found");

  const response = await fetch(`${BASE_URL}/api/panel-fetch-contract-report`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to create enquiry");
  return response.json();
};

const ContractForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from_date: moment().startOf("month").format("YYYY-MM-DD"), // First day of the current month
    to_date: moment().format("YYYY-MM-DD"),
    branch_short: "",
    buyer: "",
    consignee: "",
    container_size: "",
    product: "",
    status: "",
  });

  const createContractMutation = useMutation({
    mutationFn: createContract,
    onSuccess: () => {
      // toast({
      //   title: "Success",
      //   description: "Contract created successfully",
      // });
      navigate("/contract-report");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = contractFormSchema.parse({
        ...formData,
      });
      localStorage.setItem("from_date", formData.from_date);
      localStorage.setItem("to_date", formData.to_date);
      localStorage.setItem("branch_short", formData.branch_short);
      localStorage.setItem("buyer", formData.buyer);
      localStorage.setItem("consignee", formData.consignee);
      localStorage.setItem("container_size", formData.container_size);
      localStorage.setItem("product", formData.product);
      localStorage.setItem("status", formData.status);

      createContractMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        );

        toast({
          title: "Validation Error",
          description: (
            <div>
              <ul className="list-disc pl-5">
                {errorMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          ),
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchCompanys = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BASE_URL}/api/panel-fetch-branch`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch company data");
    return response.json();
  };

  const fetchBuyers = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BASE_URL}/api/panel-fetch-buyer`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch buyer data");
    return response.json();
  };

  const fetchContainerSizes = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BASE_URL}/api/panel-fetch-container-size`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch Container Size no data");
    return response.json();
  };
  const fetchProduct = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BASE_URL}/api/panel-fetch-product`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch Product no data");
    return response.json();
  };
  const { data: branchData } = useQuery({
    queryKey: ["branch"],
    queryFn: fetchCompanys,
  });

  const { data: buyerData } = useQuery({
    queryKey: ["buyer"],
    queryFn: fetchBuyers,
  });
  const { data: containerSizeData } = useQuery({
    queryKey: ["containersizes"],
    queryFn: fetchContainerSizes,
  });

  const { data: productData } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProduct,
  });

  const BranchHeader = ({ progress }) => {
    return (
      <div className="flex sticky top-0 z-10 border border-gray-200 rounded-lg justify-between items-start gap-8 mb-2 bg-white p-4 shadow-sm">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">Contract List</h1>
          <p className="text-gray-600 mt-2">Add a Contract to Vist Repost</p>
        </div>
      </div>
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();

    axios({
      url: BASE_URL + "/api/panel-download-contract-report",
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "contract.csv");
        document.body.appendChild(link);
        link.click();
        toast({
          title: "Success",
          description: "Contract download successfully",
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  };
  return (
    <Page>
      <BranchHeader />

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="w-full p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Enter From Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.from_date}
                    onChange={(e) =>
                      handleInputChange("from_date", e.target.value)
                    }
                    placeholder="Enter From Date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Enter To Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.to_date}
                    onChange={(e) =>
                      handleInputChange("to_date", e.target.value)
                    }
                    placeholder="Enter To Date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Branch <span className="text-red-500"></span>
                  </label>
                  <Select
                    value={formData.branch_short}
                    onValueChange={(value) =>
                      handleInputChange({ target: { value } }, "branch_short")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectContent>
                        {branchData?.branch?.map((branch) => (
                          <SelectItem
                            key={branch.branch_short}
                            value={branch.branch_short.toString()}
                          >
                            {branch.branch_short}
                          </SelectItem>
                        ))}
                      </SelectContent>
                      {/* <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
                {/* //buyer */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Buyer <span className="text-red-500"></span>
                  </label>
                  <Select
                    value={formData.buyer}
                    onValueChange={(value) =>
                      handleInputChange({ target: { value } }, "buyer")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select buyer" />
                    </SelectTrigger>
                    <SelectContent>
                      {buyerData?.buyer?.map((buyer) => (
                        <SelectItem
                          key={buyer.buyer_name}
                          value={buyer.buyer_name.toString()}
                        >
                          {buyer.buyer_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Consignee */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Consignee <span className="text-red-500"></span>
                  </label>
                  <Select
                    value={formData.consignee}
                    onValueChange={(value) =>
                      handleInputChange({ target: { value } }, "consignee")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Consignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {buyerData?.buyer?.map((buyer) => (
                        <SelectItem
                          key={buyer.buyer_name}
                          value={buyer.buyer_name.toString()}
                        >
                          {buyer.buyer_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Containers/Size  */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Containers/Size <span className="text-red-500"></span>
                  </label>
                  <Select
                    value={formData.container_size}
                    onValueChange={(value) =>
                      handleInputChange({ target: { value } }, "container_size")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Containers" />
                    </SelectTrigger>
                    <SelectContent>
                      {containerSizeData?.containerSize?.map(
                        (containerSize) => (
                          <SelectItem
                            key={containerSize.containerSize}
                            value={containerSize.containerSize.toString()}
                          >
                            {containerSize.containerSize}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {/* Product */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product <span className="text-red-500"></span>
                  </label>
                  <Select
                    value={formData.product}
                    onValueChange={(value) =>
                      handleInputChange({ target: { value } }, "product")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productData?.product?.map((product) => (
                        <SelectItem
                          key={product.product_name}
                          value={product.product_name.toString()}
                        >
                          {product.product_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status <span className="text-red-500"></span>
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange({ target: { value } }, "status")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-row items-end mt-3 justify-end w-full">
                {createContractMutation.isPending}

                <Button
                  variant="default"
                  className={`ml-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}                  onClick={onSubmit}
                >
                  <Download className="h-4 w-4" /> Download
                </Button>
                <Button
                  type="submit"
                  className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} ml-2 flex items-center mt-2`}
                  disabled={createContractMutation.isPending}
                >
                  {createContractMutation.isPending
                    ? "Submitting..."
                    : "Submit Invoice"}
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
};

export default ContractForm;
