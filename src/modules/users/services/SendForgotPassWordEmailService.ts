import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUserRepository';
// import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailprovider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (!checkUsersExists) {
      throw new AppError('Users does not exists.');
    }

    this.mailprovider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
export default SendForgotPasswordEmailService;
