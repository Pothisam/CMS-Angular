export class IModalSettings {
  isModalVisible: boolean;
  headerMessage: string;
  bodyMessage: string;
  note: string;
  parameter: number | string | object | null;
  api: string;
  html: HTMLElement | null;
  constructor(
    isModalVisible: boolean = false,
    headerMessage: string = 'Alert',
    bodyMessage: string = '',
    note: string = '',
    parameter: any = null,
    api: string = '',
    html: HTMLElement | null = null
  ) {
    this.isModalVisible = isModalVisible;
    this.headerMessage = headerMessage;
    this.bodyMessage = bodyMessage;
    this.note = note;
    this.parameter = parameter;
    this.api = api;
    this.html = html;
  }
}
