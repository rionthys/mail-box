export class MessagesDto {
  id?: number;
  read?: boolean;
  title: string;
  content?: string;
  attachment?: any;
  from_email: string;
  to_email: string;
}
