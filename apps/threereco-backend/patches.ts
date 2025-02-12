/* eslint-disable @typescript-eslint/no-explicit-any */
(BigInt.prototype as any).toJSON = function () {
  return Number.parseInt(this.toString());
};
