import AppError from '@shared/errors/AppError';
import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRespository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointementsRepository: FakeAppointementsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointementsRepository = new FakeAppointementsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointementsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212121',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121212121');
  });

  it('should not able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121212121',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121212121',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
