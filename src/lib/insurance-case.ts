export const insuranceCase = {
  checked: "2026-11-11",
  policies: [
    { id: "car", before: 786.48, after: 699.34 },
    { id: "home", before: 122, after: 109.41 },
  ],
} as const;

export const insuranceContact = {
  name: "Toni Raappana",
  company: "OP Pohjola",
  phone: "+358505695974",
  phoneDisplay: "050 569 5974",
} as const;

export type PolicyId = (typeof insuranceCase.policies)[number]["id"];

const sum = (key: "before" | "after") =>
  insuranceCase.policies.reduce((total, policy) => total + policy[key], 0);

export const caseTotals = {
  before: sum("before"),
  after: sum("after"),
  saving: sum("before") - sum("after"),
  share: 1 - sum("after") / sum("before"),
};
