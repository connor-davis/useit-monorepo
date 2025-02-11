import { pgEnum } from 'drizzle-orm/pg-core';

export const businessType = pgEnum('business_type', [
  'Recycler',
  'Waste Collector',
  'Buy Back Centre',
]);
