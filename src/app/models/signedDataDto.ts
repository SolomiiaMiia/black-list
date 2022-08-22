export interface SignedData {
  name: string;
  data: Blob;
}

export interface SignedDataPart {
  name: string;
  val: string;
}
