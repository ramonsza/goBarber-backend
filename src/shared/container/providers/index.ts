import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProviders';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
