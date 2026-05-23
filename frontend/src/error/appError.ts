import axios from "axios";

export const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "Request failed";
    }
  
    if (err instanceof Error) {
      return err.message;
    }
  
    return "Unknown error occurred";
  };