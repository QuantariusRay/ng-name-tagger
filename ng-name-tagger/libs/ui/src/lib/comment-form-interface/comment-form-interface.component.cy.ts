/// <reference path="../../../cypress/support/component.ts" />
import { CommentFormInterfaceComponent } from '@ng-name-tagger/ui';

describe('Comment Form Interface Component Test', () => {

  beforeEach(() => {
    cy.mount<CommentFormInterfaceComponent>(CommentFormInterfaceComponent, {
      imports: [CommentFormInterfaceComponent],
      componentProperties: {
        userSet: [{
          firstName: 'Carl',
          lastName: 'Malone',
          userId: 32
        }]
      }
    });
  });

  it('should begin with the comment box hidden', () => {
    cy.get('[data-cy="toggle-button"]')
      .should('have.text', 'Add Comment');

    cy.get('[data-cy="comment-box"]')
      .should('not.exist');
  });

  it('should display the comment box once the add comment button is clicked', () => {
    cy.get('[data-cy="toggle-button"]')
      .as('toggle-button')
      .should('have.text', 'Add Comment')
      .click();

    cy.get('[data-cy="comment-box"]')
      .should('be.visible');

    cy.get('@toggle-button')
      .should('have.text', 'Cancel');
  });

  it('should hide the comment box if a user decides not to leave a comment', () => {
    cy.get('[data-cy="toggle-button"]')
      .as('toggle-button')
      .click();

    cy.get('@toggle-button')
      .should('have.text', 'Cancel')
      .click();

    cy.get('[data-cy="comment-box"]')
      .should('not.exist');
  });
})