import createUser from '@/models/user/__tests__/factories/user-factory';
import AdottamiClient from '@/services/adottami-client/adottami-client';
import { saveUserIfNecessary } from '@tests/utils/e2e/users';

describe('Home page', () => {
  process.env.NEXT_PUBLIC_ADOTTAMI_URL = Cypress.env('NEXT_PUBLIC_ADOTTAMI_URL');

  const adottami = new AdottamiClient(null);

  const user = createUser();
  const password = 'password';

  before(() => {
    cy.wrap(saveUserIfNecessary(adottami, user, password));
  });

  it('page should have the correct title', () => {
    cy.visit('/');
    cy.title().should('match', /Adottami/);
  });

  it('page should show a sign up link in the header, if initially not authenticated', () => {
    cy.visit('/');
    cy.get('a').contains('Entrar').should('be.visible');
  });

  it('page should show the user name in the header, if authenticated', () => {
    cy.visit('/');
    cy.get('a').contains('Entrar').click();
    cy.get('input[name=email]').type(user.email());
    cy.get('input[name=password]').type(password);
    cy.get('button').contains('Entrar').click();

    cy.visit('/');
    cy.get('a').contains(user.name()).should('be.visible');
  });

  it('page should show a sign up link in the header, after logout', () => {
    cy.visit('/');
    cy.get('a').contains('Entrar').click();
    cy.get('input[name=email]').type(user.email());
    cy.get('input[name=password]').type(password);
    cy.get('button').contains('Entrar').click();

    cy.visit('/');
    cy.get('a').contains(user.name()).should('be.visible');

    cy.get('button[aria-label="Abrir menu do usuário"]').trigger('mouseover');
    cy.get('a').contains('Sair').click();
    cy.wait(1000);

    cy.get('a').contains('Entrar').should('be.visible');
  });
});
