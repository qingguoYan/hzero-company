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
]
