import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";
import { Loader2, Edit, AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ButtonConfig } from '@/config/ButtonConfig';
const EditPaymentTermC = ({paymentId}) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        paymentTermsC: "",
        paymentTermsC_status: "Active",
    });
    const [originalData, setOriginalData] = useState(null);
  
    // Fetch state data
    const fetchStateData = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-paymentTermsC-by-id/${paymentId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const paymentTermsCData = response?.data?.paymentTermsC;
        setFormData({
            paymentTermsC: paymentTermsCData.paymentTermsC || "",
            paymentTermsC_status: paymentTermsCData.paymentTermsC_status || "Active",
        });
        setOriginalData({
            paymentTermsC: paymentTermsCData.paymentTermsC || "",
            paymentTermsC_status: paymentTermsCData.paymentTermsC_status || "Active",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch payment term c  data",
          variant: "destructive",
        });
        setOpen(false);
      } finally {
        setIsFetching(false);
      }
    };
  
    useEffect(() => {
      if (open) {
        fetchStateData();
      }
    }, [open]);
  
    // Handle form submission
    const handleSubmit = async () => {
      if (!formData.paymentTermsC.trim()) {
        toast({
          title: "Error",
          description: "Payment term c  is required",
          variant: "destructive",
        });
        return;
      }
  
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `${BASE_URL}/api/panel-update-paymentTermsC/${paymentId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        toast({
          title: "Success",
          description: "Payment term c updated successfully",
        });
  
        await queryClient.invalidateQueries(["paymenttermC"]);
        setOpen(false);
      } catch (error) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Failed to update payment term c",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    // Check if there are changes
    const hasChanges = originalData && (
      formData.paymentTermsC !== originalData.paymentTermsC ||
      formData.paymentTermsC_status !== originalData.paymentTermsC_status
    );
  return (
    <Popover open={open} onOpenChange={setOpen}>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`transition-all duration-200 ${isHovered ? 'bg-blue-50' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Edit className={`h-4 w-4 transition-all duration-200 ${isHovered ? 'text-blue-500' : ''}`} />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit payment term c</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <PopoverContent className="w-80">
      {isFetching ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Payment Term C</h4>
            <p className="text-sm text-muted-foreground">
              Update payment term c details
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label htmlFor="paymentTermsC" className="text-sm font-medium">
                Payment Term C
              </label>
              <div className="relative">
                <textarea
                  id="paymentTermsC"
                  placeholder="Enter payment term c "
                  value={formData.paymentTermsC}
                  
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, paymentTermsC: e.target.value }))
                  }
                  className={hasChanges ? 'w-full p-1 border-blue-200' : 'w-full p-1 border border-gray-300 rounded-sm'}
                />
                {hasChanges && formData.paymentTermsC !== originalData.paymentTermsC && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <RefreshCcw
                      className="h-4 w-4 text-blue-500 cursor-pointer hover:rotate-180 transition-all duration-300"
                      onClick={() => setFormData(prev => ({ ...prev, paymentTermsC: originalData.paymentTermsC }))}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-1">
              <label htmlFor="paymentTermsC_status" className="text-sm font-medium">
                Status
              </label>
              <Select
                value={formData.paymentTermsC_status}
                onValueChange={(value) =>
                  setFormData(prev => ({ ...prev, paymentTermsC_status: value }))
                }
              >
                <SelectTrigger className={hasChanges ? 'border-blue-200' : ''}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="Inactive">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400 mr-2" />
                      Inactive
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasChanges && (
              <Alert className="bg-blue-50 border-blue-200 mt-2">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription className="text-blue-600 text-sm">
                  You have unsaved changes
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleSubmit}
              disabled={isLoading || !hasChanges}
              className={`mt-2 relative overflow-hidden ${hasChanges ? `${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} ` : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Payment Term C"
              )}
              {hasChanges && !isLoading && (
                <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
              )}
            </Button>
          </div>
        </div>
      )}
    </PopoverContent>
  </Popover>
  )
}

export default EditPaymentTermC