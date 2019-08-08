module.exports = [
  {
    authorized: true,
    path: "/hmdm/Company",
    component: "hmdm/Company",
    models: ["hmdm/company"],
  },
  {
    authorized: true,
    path: "/hmdm/process",
    component: "hmdm/Process",
    models: ["hmdm/process"],
  },
  {
    authorized: true,
    path: "/hmdm/PreferentialPolicies",
    component: "hmdm/PreferentialPolicies",
    models: ["hmdm/preferentialPolicies"],
  },
  {
    authorized: true,
    path: "/hmdm/SaleContract",
    component: "hmdm/SaleContract",
    models: ["hmdm/saleContract"],
  },
  {
    authorized: true,
    path: "/hmdm/bookPrint",
    component: "hmdm/BookPrint",
    models: ["hmdm/bookPrint"]
  }
]
