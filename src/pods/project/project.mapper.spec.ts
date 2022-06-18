import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

describe('./pods/project', () => {
  it('should return empty array when feeding undefined project', () => {
    // Arrange
    const project = undefined;

    const expectedResult: viewModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };
    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return empty array when feeding null project', () => {
    // Arrange
    const project = null;

    const expectedResult: viewModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };
    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return project and empty list of employess when feeding null employees list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      isActive: true,
      externalId: '123',
      name: 'test project name',
      employees: null,
      comments: 'none',
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test project name',
      externalId: '123',
      comments: 'none',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return project and empty list of employess when feeding undefined employees list', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      isActive: true,
      externalId: '123',
      name: 'test project name',
      employees: undefined,
      comments: 'none',
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test project name',
      externalId: '123',
      comments: 'none',
      isActive: true,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return one project with values when passing one project', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'test id',
      isActive: true,
      externalId: '123',
      name: 'test project name',
      employees: [
        {
          id: 'employee id',
          isAssigned: false,
          employeeName: 'Fiorella',
        },
      ],
      comments: 'none',
    };

    const expectedResult: viewModel.Project = {
      id: 'test id',
      name: 'test project name',
      externalId: '123',
      comments: 'none',
      isActive: true,
      employees: [
        {
          id: 'employee id',
          isAssigned: false,
          employeeName: 'Fiorella',
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
