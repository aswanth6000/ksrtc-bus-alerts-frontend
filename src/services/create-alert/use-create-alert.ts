import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/constants/axios";
import { toast } from "sonner";

interface AlertFormData {
    email: string;
    searchUrl: string;
    timeRangeStart: string;
    timeRangeEnd: string;
}

interface CreateAlertResponse {
    message: string;
    data: AlertFormData;
}

export const useCreateAlert = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateAlertResponse, Error, AlertFormData>({
        mutationFn: async (data) => {
            const response = await axiosInstance.post('/alerts', data);
            if (response.status !== 200) {
                throw new Error("Failed to create alert");
            }
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
            toast.success("Alert created successfully!");
        },
        onError: () => {
            toast.error("Failed to create alert. Please try again.");
        }
    });
};
