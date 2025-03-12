// CustomButton.test.tsx
import React from 'react';
import { render,fireEvent} from '@testing-library/react';
import { Button } from './Button';

describe('CustomButton', () => {
  it('renders the button with the correct label', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn()
    const {getByRole} = render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1)
  });

  test.each([
    [false, 'Button should not be disabled when disabled is false'],
    [undefined, 'Button should not be disabled when disabled is undefined'],
    [true, 'Button should be disabled when disabled is true'],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ])('Test case: %s - %s', (disabledValue, description) => {
    const { getByRole } = render(<Button disabled={disabledValue}>Click me</Button>);
  
    if (disabledValue === true) {
      expect(getByRole('button')).toBeDisabled();
    } else {
      expect(getByRole('button')).not.toBeDisabled();
    }
  });

  it('applies the provided className', () => {
    const { getByRole } = render(<Button className='test-class'>Click me</Button>);
    expect(getByRole('button')).toHaveClass('test-class');
  });

  test.each([
    [false, 'Background color should be green when not disabled'],
    [undefined, 'Background color should be green when disabled is not defined'],
    [true, 'Background color should be gray when disabled is true'],

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ])('Test case: %s - %s', (disabledValue, description) => {
    const { getByRole } = render(<Button disabled={disabledValue}>Click me</Button>);
  
    if (disabledValue === true) {
      expect(getByRole('button')).toHaveClass('disabled:bg-gray-600');
    } else {
      expect(getByRole('button')).toHaveClass('bg-[#8dc63f]');
    }
  });

});