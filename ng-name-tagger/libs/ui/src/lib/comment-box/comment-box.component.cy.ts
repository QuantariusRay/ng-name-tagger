/// <reference path="../../../cypress/support/component.ts" />
import { CommentBoxComponent } from '@ng-name-tagger/ui';
import { FormControl } from '@angular/forms';
import { CommentInterfaceStore } from '../comment-form-interface/comment-interface.store';

describe('comment box component test', () => {
  it('should not create a user panel if no @ is typed in', () => {
    cy.mount<CommentBoxComponent>(CommentBoxComponent, {
      imports: [CommentBoxComponent],
      providers: [CommentInterfaceStore],
      componentProperties: {
        comment: new FormControl('This is a test'),
      }
    });

    cy.get('[data-cy="comment-box"]')
      .as('text-box')
      .type('. Indeed.');

    cy.get('@text-box')
      .should('have.value', 'This is a test. Indeed.');

    cy.log('No panel is created since it does not trigger the condition')
    cy.get('[data-cy="filter-list"]')
      .should('not.exist');
  });

  it('should display/create the user panel if @ is typed in', () => {
    cy.mount<CommentBoxComponent>(CommentBoxComponent, {
      imports: [CommentBoxComponent],
      providers: [CommentInterfaceStore],
      componentProperties: {
        comment: new FormControl(''),
      }
    });

    cy.get('[data-cy="comment-box"]')
      .as('text-box')
      .type('@');

    cy.get('@text-box')
      .should('have.value', '@');

    cy.log('The panel only exists because there are no items displayed')
    cy.get('[data-cy="filter-list"]')
      .should('exist');
  });
})
