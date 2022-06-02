import ICart from "./icart.model";

export default interface ISuccessfulLoginServerResponse {
  token: string,
  firstName: string,
  lastName: string,
  city: string,
  street: string,
  cart: ICart
}
