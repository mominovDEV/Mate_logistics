import { MailerService } from '@nestjs-modules/mailer/dist';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.module';
import { Dispatcher } from '../Dispatcher/models/Dispatcher.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // async sendDispatcherConfirmation(dispatcher: Dispatcher): Promise<void> {
  //   const url = `${process.env.API_HOST}/api/dispatchers/activate/${dispatcher.activation_link}`;

  //   console.log(url);

  //   await this.mailerService.sendMail({
  //     to: dispatcher.email,
  //     subject: 'Welcome to Mate Logistics App! confirm your email',
  //     template: './confirmation',
  //     context: {
  //       name: dispatcher.first_name,
  //       url,
  //     },
  //   });
  // }

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;

    console.log(url);

    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to Mate logistics App! confirm your email',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }

  async sendDispatcherConfirmation(dispatcher: Dispatcher): Promise<void> {
    const url = `${process.env.API_HOST}/api/dispatcher/activate/${dispatcher.activation_link}`;

    console.log(url);

    await this.mailerService.sendMail({
      to: dispatcher.email,
      subject: 'Welcome to Mate Logistics App! confirm your email',
      template: './confirmation',
      context: {
        name: dispatcher.first_name,
        url,
      },
    });
  }
}
