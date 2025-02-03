import React from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import BASE_URL from "@/config/BaseUrl";
import { Loader2, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLocation } from "react-router-dom";
import { ButtonConfig } from "@/config/ButtonConfig";
import { ContainerSizeCreate } from "@/components/buttonIndex/ButtonComponents";
const CreateContainerSize = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    containerSize: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const handleSubmit = async () => {
    if (!formData.containerSize.trim()) {
      toast({
        title: "Error",
        description: "Conatiner Size are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/api/panel-create-container-size`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Success",
        description: "Container Size created successfully",
      });

      setFormData({
        containerSize: "",
      });
      await queryClient.invalidateQueries(["containersizes"]);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to create container size",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {pathname === "/master/containersize" ? (
          // <Button
          //   variant="default"
          //   className={`ml-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}
          // >
          //   <SquarePlus className="h-4 w-4 " /> ConatainerSize
          // </Button>
          <div>
            <ContainerSizeCreate
              className={`ml-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}
            ></ContainerSizeCreate>
          </div>
        ) : pathname === "/create-contract" ? (
          <p className="text-xs text-yellow-700 ml-2 mt-1 w-32 hover:text-red-800 cursor-pointer">
            Create ConatainerSize
          </p>
        ) : null}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Create New ConatainerSize
            </h4>
            <p className="text-sm text-muted-foreground">
              Enter the details for the new ConatainerSize
            </p>
          </div>
          <div className="grid gap-2">
            <Input
              id="containerSize"
              placeholder="Enter container size "
              value={formData.containerSize}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  containerSize: e.target.value,
                }))
              }
            />

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`mt-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create ContainerSize"
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateContainerSize;
