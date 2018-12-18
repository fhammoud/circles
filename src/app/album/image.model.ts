import {SafeResourceUrl} from "@angular/platform-browser";

export class Image {
  constructor(
    public id: string,
    public owner: string,
    public data: SafeResourceUrl,
    public time: Date
  ) {}
}
