import { apiRequest } from "@/utils/apiHandler";
import { LOCAL_ENQUIRY_URL } from "@/config/commonUrl";

export const enquiryService = {
  submit: (data: any) =>
    apiRequest(LOCAL_ENQUIRY_URL, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
