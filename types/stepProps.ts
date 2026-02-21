import { ProductWizardFormInput } from "@/schemas/menuSchema";
import { UseFormReturn } from "react-hook-form";

export interface StepProps {
  form: UseFormReturn<ProductWizardFormInput>;
}
