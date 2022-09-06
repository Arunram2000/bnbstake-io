import * as Yup from "yup";

export const tradeBuyOrderSchema = (amount: number) => {
  return Yup.object({
    buy_token: Yup.number()
      .positive()
      .max(amount, `amount can't exceed more than ${amount}`)
      .required("This field is required"),
  });
};
