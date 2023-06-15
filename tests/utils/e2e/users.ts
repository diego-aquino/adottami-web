import { AxiosError } from 'axios';

import User from '@/models/user/user';
import AdottamiClient from '@/services/adottami-client/adottami-client';

export async function saveUserIfNecessary(adottami: AdottamiClient, user: User, password: string) {
  try {
    await adottami.users.create({
      name: user.name(),
      email: user.email(),
      password,
      phoneNumber: user.phoneNumber()!,
    });
  } catch (error) {
    handleUserCreationError(error);
  }
}

function handleUserCreationError(error: unknown) {
  const isUserAlreadyExistsError = error instanceof AxiosError && error.response?.status === 400;
  if (!isUserAlreadyExistsError) {
    throw error;
  }
}
