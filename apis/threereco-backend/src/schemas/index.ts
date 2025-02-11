import { accounts } from './accounts';
import { businesses } from './business';
import { collectors } from './collectors';
import enums from './enums';
import { materials } from './materials';
import { products } from './products';
import relationships from './relationships';
import { sessions } from './sessions';
import { stock } from './stock';
import { transactions } from './transactions';
import { twoFactors } from './two-factors';
import { users } from './users';
import { verifications } from './verification';

export default {
  ...enums,
  users,
  sessions,
  accounts,
  verifications,
  twoFactors,
  materials,
  businesses,
  products,
  transactions,
  collectors,
  stock,
  ...relationships,
};
