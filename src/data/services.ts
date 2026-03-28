import servicesData from "./services.json";

export interface Service {
  name: string;
  duration: string;
  price: string;
  description?: string;
}

export interface ServiceCategory {
  name: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = servicesData as ServiceCategory[];
