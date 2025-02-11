import { businessUser } from './businesses';
import { collectorUser } from './collectors';
import { businessProducts, productBusiness, productMaterial } from './products';
import { businessStock, stockBusiness, stockProduct } from './stock';
import {
  transactionBuyer,
  transactionMaterial,
  transactionProduct,
  transactionSeller,
} from './transactions';
import { userBusiness, userCollector } from './users';

export default {
  userBusiness,
  userCollector,
  businessUser,
  businessProducts,
  businessStock,
  collectorUser,
  productMaterial,
  productBusiness,
  stockBusiness,
  stockProduct,
  transactionBuyer,
  transactionSeller,
  transactionMaterial,
  transactionProduct,
};
