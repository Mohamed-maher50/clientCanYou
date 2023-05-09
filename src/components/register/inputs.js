export const inputs = [
  {
    id: "1",
    name: "fullName",
    label: "full Name",
    type: "text",
  },
  {
    id: "2",
    name: "email",
    label: "email",
    type: "email",
    options: {
      required: true,
    },
  },
  {
    id: "3",
    name: "NationalID",
    label: "National ID",
    type: "text",
    options: {
      maxLength: 11,
      minLength: 11,
      required: true,
    },
  },
  {
    id: "4",
    name: "birthDay",
    label: "Birth Of Day",
    type: "date",
    options: {
      max: new Date().getFullYear() - 16 + "-" + 12 + "-" + "31",
      min: new Date().getFullYear() - 80 + "-" + 1 + "-" + "1",
      required: true,
    },
  },
  {
    id: "5",
    name: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "6",
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
  },
  {
    id: "7",
    name: "phone",
    label: "phone number",
    type: "text",
    options: {
      maxLength: 11,
      min: 11,
      required: true,
    },
  },
];
