// Egen felklass så vi kan skilja "landet finns inte" från andra fel
export class NotFoundError extends Error {
  constructor(message = "Landet hittades inte") {
    super(message);
    this.name = "NotFoundError";
  }
}
