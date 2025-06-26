export interface CartItem {
  _id: string;
  uid: string;
  pid: string;
  qty: number;
  name?: string;
  price?: number;
  pimg?: string;
}
