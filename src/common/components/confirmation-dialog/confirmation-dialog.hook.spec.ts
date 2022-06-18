import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { Lookup } from '../../models';

describe('common/ConfirmationDialogComponent', () => {
  it('should return an object with isOpen set to false, an empty lookup and three functions', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    // Assert
    // create empty lookup element
    const emptyLookup: Lookup = {
      id: '',
      name: '',
    };

    expect(result.current.isOpen).toBeFalsy();
    expect(result.current.itemToDelete).toEqual(emptyLookup);
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should return an object with isOpen set to true and item set to given lookup when calling openDialog', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    const newLookup: Lookup = {
      id: 'test1',
      name: 'name1',
    };

    // call to openDialog
    act(() => {
      result.current.onOpenDialog(newLookup);
    });

    // Assert
    expect(result.current.isOpen).toBeTruthy();
    expect(result.current.itemToDelete.id).toEqual('test1');
    expect(result.current.itemToDelete.name).toEqual('name1');
    expect(result.current.itemToDelete).toEqual(newLookup); // equivalent
  });
});
