import AppError from '@shared/errors/AppError';
import FakeAppointementsRepository from '../repositories/fakes/FakeAppointmentsRespository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointementsRepository = new FakeAppointementsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointementsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212121',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121212121');
  });

  it('should not able to create two appointments on the same time', async () => {
    const fakeAppointementsRepository = new FakeAppointementsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointementsRepository,
    );

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
