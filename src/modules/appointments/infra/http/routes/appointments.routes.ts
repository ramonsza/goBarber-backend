import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentController';

const appointmentsRouter = Router();

const appointementsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointements = await appointmentsRepository.find();

//   return response.json(appointements);
// });

appointmentsRouter.post('/', appointementsController.create);

export default appointmentsRouter;
