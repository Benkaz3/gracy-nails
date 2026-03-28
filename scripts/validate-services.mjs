import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(__dirname, "../src/data/services.json");

const PRICE_REGEX = /^\$\d{1,3}$/;
const DURATION_REGEX = /^\d{1,3} min$/;

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

function validate(data) {
  const errors = [];

  if (!Array.isArray(data)) {
    return ["Root must be an array of categories"];
  }

  if (data.length === 0) {
    return ["Must have at least 1 category"];
  }

  if (data.length > MAX_CATEGORIES) {
    return [`Too many categories: ${data.length} (max ${MAX_CATEGORIES})`];
  }

  const categoryNames = new Set();

  for (let i = 0; i < data.length; i++) {
    const cat = data[i];
    const prefix = `Category ${i + 1}`;

    if (typeof cat !== "object" || cat === null || Array.isArray(cat)) {
      errors.push(`${prefix}: must be an object`);
      continue;
    }

    for (const key of Object.keys(cat)) {
      if (!ALLOWED_CATEGORY_KEYS.has(key)) {
        errors.push(`${prefix}: unknown key "${key}"`);
      }
    }

    if (typeof cat.name !== "string" || cat.name.trim().length === 0) {
      errors.push(`${prefix}: name is required`);
    } else {
      const name = cat.name.trim();
      if (name.length > MAX_CATEGORY_NAME_LENGTH) {
        errors.push(`${prefix}: name too long (${name.length} chars, max ${MAX_CATEGORY_NAME_LENGTH})`);
      }
      const nameLower = name.toLowerCase();
      if (categoryNames.has(nameLower)) {
        errors.push(`${prefix}: duplicate category name "${name}"`);
      }
      categoryNames.add(nameLower);
    }

    if (!Array.isArray(cat.services)) {
      errors.push(`${prefix}: services must be an array`);
      continue;
    }

    if (cat.services.length === 0) {
      errors.push(`${prefix}: must have at least 1 service`);
      continue;
    }

    if (cat.services.length > MAX_SERVICES_PER_CATEGORY) {
      errors.push(`${prefix}: too many services (${cat.services.length}, max ${MAX_SERVICES_PER_CATEGORY})`);
    }

    const serviceNames = new Set();

    for (let j = 0; j < cat.services.length; j++) {
      const svc = cat.services[j];
      const svcPrefix = `${prefix} > Service ${j + 1}`;

      if (typeof svc !== "object" || svc === null || Array.isArray(svc)) {
        errors.push(`${svcPrefix}: must be an object`);
        continue;
      }

      for (const key of Object.keys(svc)) {
        if (!ALLOWED_SERVICE_KEYS.has(key)) {
          errors.push(`${svcPrefix}: unknown key "${key}"`);
        }
      }

      if (typeof svc.name !== "string" || svc.name.trim().length === 0) {
        errors.push(`${svcPrefix}: name is required`);
      } else {
        const name = svc.name.trim();
        if (name.length > MAX_SERVICE_NAME_LENGTH) {
          errors.push(`${svcPrefix}: name too long`);
        }
        const nameLower = name.toLowerCase();
        if (serviceNames.has(nameLower)) {
          errors.push(`${svcPrefix}: duplicate service name "${name}"`);
        }
        serviceNames.add(nameLower);
      }

      if (typeof svc.price !== "string") {
        errors.push(`${svcPrefix}: price is required`);
      } else if (!PRICE_REGEX.test(svc.price)) {
        errors.push(`${svcPrefix}: price must be like "$55" (whole dollars, $1-$999)`);
      } else {
        const amount = parseInt(svc.price.slice(1), 10);
        if (amount < MIN_PRICE || amount > MAX_PRICE) {
          errors.push(`${svcPrefix}: price must be between $${MIN_PRICE} and $${MAX_PRICE}`);
        }
      }

      if (typeof svc.duration !== "string") {
        errors.push(`${svcPrefix}: duration is required`);
      } else if (!DURATION_REGEX.test(svc.duration)) {
        errors.push(`${svcPrefix}: duration must be like "60 min" (${MIN_DURATION}-${MAX_DURATION})`);
      } else {
        const minutes = parseInt(svc.duration, 10);
        if (minutes < MIN_DURATION || minutes > MAX_DURATION) {
          errors.push(`${svcPrefix}: duration must be between ${MIN_DURATION} and ${MAX_DURATION} minutes`);
        }
      }

      if (svc.description !== undefined) {
        if (typeof svc.description !== "string") {
          errors.push(`${svcPrefix}: description must be a string`);
        } else if (svc.description.length > MAX_DESCRIPTION_LENGTH) {
          errors.push(`${svcPrefix}: description too long`);
        }
      }
    }
  }

  return errors;
}

// Main
let raw;
try {
  raw = readFileSync(filePath, "utf-8");
} catch {
  console.error(`VALIDATION FAILED: Cannot read ${filePath}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error(`VALIDATION FAILED: Invalid JSON in services.json — ${e.message}`);
  process.exit(1);
}

const errors = validate(data);
if (errors.length > 0) {
  console.error("VALIDATION FAILED: services.json has errors:");
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log("services.json validated successfully.");
