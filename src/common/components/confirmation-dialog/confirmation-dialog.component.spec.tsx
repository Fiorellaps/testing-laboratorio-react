import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/ConfirmationDialogComponent', () => {
  it('should not be rendered if isOpen equals to false', () => {
    // Arrange
    const props = {
      isOpen: false,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'title',
      labels: { closeButton: '', acceptButton: '' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const element = screen.queryByRole('dialog');
    expect(element).not.toBeInTheDocument();
  });

  it('should be rendered if isOpen equals to true', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'title',
      labels: { closeButton: '', acceptButton: '' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const element = screen.queryByRole('dialog');
    expect(element).toBeInTheDocument();
  });

  it('should be rendered as expected passing required properties', () => {
    // Arrange
    const props = {
      isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn(),
      title: 'title',
      labels: { closeButton: 'Close', acceptButton: 'Accept' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const elementDialog = screen.getByRole('dialog');
    const elementDialogtitle = screen.getByRole('heading', { name: 'title' });
    const elementButton = screen.getAllByRole('button');

    expect(elementDialog).toBeInTheDocument();
    expect(elementDialogtitle).not.toBeNull();
    expect(elementDialogtitle.tagName).toEqual('H2');
    expect(elementButton[0].textContent).toEqual('Close');
    expect(elementButton[1].textContent).toEqual('Accept');
  });

  it('should call onClose function when clicking closeButton', async () => {
    // Arrange
    const closeFunction = jest.fn();
    const acceptFunction = jest.fn();

    const props = {
      isOpen: true,
      onAccept: acceptFunction,
      onClose: closeFunction,
      title: 'title',
      labels: { closeButton: 'Close', acceptButton: 'Accept' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const elementButtonClose = screen.getByRole('button', { name: 'Close' });
    //userEvent.click(elementButtonClose);     // No sé por qué no funciona con userEvent
    fireEvent.click(elementButtonClose);

    expect(elementButtonClose).toBeInTheDocument();
    expect(closeFunction).toHaveBeenCalled();
  });

  it('should call onCloseand onAccept function when clicking acceptButton', async () => {
    // Arrange
    const closeFunction = jest.fn();
    const acceptFunction = jest.fn();

    const props = {
      isOpen: true,
      onAccept: acceptFunction,
      onClose: closeFunction,
      title: 'title',
      labels: { closeButton: 'Close', acceptButton: 'Accept' },
    };

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    // Assert
    const elementButtonAccept = screen.getByRole('button', { name: 'Accept' });

    fireEvent.click(elementButtonAccept);

    expect(elementButtonAccept).toBeInTheDocument();
    expect(closeFunction).toHaveBeenCalled();
    expect(acceptFunction).toHaveBeenCalled();
  });
});
