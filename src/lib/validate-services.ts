export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const PRICE_REGEX = /^\$\d{1,3}$/;
const DURATION_REGEX = /^\d{1,3} min$/;
const DANGEROUS_PATTERN = /<\/?script/i;

const MAX_CATEGORIES = 20;
const MAX_SERVICES_PER_CATEGORY = 30;
const MAX_CATEGORY_NAME_LENGTH = 100;
const MAX_SERVICE_NAME_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 500;
const MIN_PRICE = 1;
const MAX_PRICE = 999;
const MIN_DURATION = 5;
const MAX_DURATION = 480;

const ALLOWED_SERVICE_KEYS = new Set(["name", "duration", "price", "description"]);
const ALLOWED_CATEGORY_KEYS = new Set(["name", "services"]);

export function validateServices(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!Array.isArray(data)) {
    return { valid: false, errors: ["Root must be an array of categories"] };
  }

  if (data.length === 0) {
    errors.push("Must have at least 1 category");
    return { valid: false, errors };
  }

  if (data.length > MAX_CATEGORIES) {
    errors.push(`Too many categories: ${data.length} (max ${MAX_CATEGORIES})`);
    return { valid: false, errors };
  }

  const categoryNames = new Set<string>();

  for (let i = 0; i < data.length; i++) {
    const cat = data[i];
    const prefix = `Category ${i + 1}`;

    if (typeof cat !== "object" || cat === null || Array.isArray(cat)) {
      errors.push(`${prefix}: must be an object`);
      continue;
    }

    const catObj = cat as Record<string, unknown>;

    // Check for unknown keys
    for (const key of Object.keys(catObj)) {
      if (!ALLOWED_CATEGORY_KEYS.has(key)) {
        errors.push(`${prefix}: unknown key "${key}"`);
      }
    }

    // Category name
    if (typeof catObj.name !== "string" || catObj.name.trim().length === 0) {
      errors.push(`${prefix}: name is required`);
    } else {
      const name = catObj.name.trim();
      if (name.length > MAX_CATEGORY_NAME_LENGTH) {
        errors.push(`${prefix}: name too long (${name.length} chars, max ${MAX_CATEGORY_NAME_LENGTH})`);
      }
      if (DANGEROUS_PATTERN.test(name)) {
        errors.push(`${prefix}: name contains forbidden HTML`);
      }
      const nameLower = name.toLowerCase();
      if (categoryNames.has(nameLower)) {
        errors.push(`${prefix}: duplicate category name "${name}"`);
      }
      categoryNames.add(nameLower);
    }

    // Services array
    if (!Array.isArray(catObj.services)) {
      errors.push(`${prefix}: services must be an array`);
      continue;
    }

    if (catObj.services.length === 0) {
      errors.push(`${prefix}: must have at least 1 service`);
      continue;
    }

    if (catObj.services.length > MAX_SERVICES_PER_CATEGORY) {
      errors.push(`${prefix}: too many services (${catObj.services.length}, max ${MAX_SERVICES_PER_CATEGORY})`);
    }

    const serviceNames = new Set<string>();

    for (let j = 0; j < catObj.services.length; j++) {
      const svc = catObj.services[j];
      const svcPrefix = `${prefix} > Service ${j + 1}`;

      if (typeof svc !== "object" || svc === null || Array.isArray(svc)) {
        errors.push(`${svcPrefix}: must be an object`);
        continue;
      }

      const svcObj = svc as Record<string, unknown>;

      // Check for unknown keys
      for (const key of Object.keys(svcObj)) {
        if (!ALLOWED_SERVICE_KEYS.has(key)) {
          errors.push(`${svcPrefix}: unknown key "${key}"`);
        }
      }

      // Service name
      if (typeof svcObj.name !== "string" || svcObj.name.trim().length === 0) {
        errors.push(`${svcPrefix}: name is required`);
      } else {
        const name = svcObj.name.trim();
        if (name.length > MAX_SERVICE_NAME_LENGTH) {
          errors.push(`${svcPrefix}: name too long (${name.length} chars, max ${MAX_SERVICE_NAME_LENGTH})`);
        }
        if (DANGEROUS_PATTERN.test(name)) {
          errors.push(`${svcPrefix}: name contains forbidden HTML`);
        }
        const nameLower = name.toLowerCase();
        if (serviceNames.has(nameLower)) {
          errors.push(`${svcPrefix}: duplicate service name "${name}"`);
        }
        serviceNames.add(nameLower);
      }

      // Price
      if (typeof svcObj.price !== "string") {
        errors.push(`${svcPrefix}: price is required`);
      } else if (!PRICE_REGEX.test(svcObj.price)) {
        errors.push(`${svcPrefix}: price must be like "$55" (whole dollars, $1-$999)`);
      } else {
        const amount = parseInt(svcObj.price.slice(1), 10);
        if (amount < MIN_PRICE || amount > MAX_PRICE) {
          errors.push(`${svcPrefix}: price must be between $${MIN_PRICE} and $${MAX_PRICE}`);
        }
      }

      // Duration
      if (typeof svcObj.duration !== "string") {
        errors.push(`${svcPrefix}: duration is required`);
      } else if (!DURATION_REGEX.test(svcObj.duration)) {
        errors.push(`${svcPrefix}: duration must be like "60 min" (${MIN_DURATION}-${MAX_DURATION})`);
      } else {
        const minutes = parseInt(svcObj.duration, 10);
        if (minutes < MIN_DURATION || minutes > MAX_DURATION) {
          errors.push(`${svcPrefix}: duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes`);
        }
      }

      // Description (optional)
      if (svcObj.description !== undefined) {
        if (typeof svcObj.description !== "string") {
          errors.push(`${svcPrefix}: description must be a string`);
        } else if (svcObj.description.length > MAX_DESCRIPTION_LENGTH) {
          errors.push(`${svcPrefix}: description too long (${svcObj.description.length} chars, max ${MAX_DESCRIPTION_LENGTH})`);
        } else if (DANGEROUS_PATTERN.test(svcObj.description)) {
          errors.push(`${svcPrefix}: description contains forbidden HTML`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
