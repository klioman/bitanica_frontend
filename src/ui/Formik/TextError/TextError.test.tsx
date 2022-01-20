import React from 'react';
import { render } from '@testing-library/react';
import TextError from 'ui/Formik/TextError';

// ================================================:
describe('Text error element:', () => {
	it('Text error element must be render', () => {
		const { container } = render(<TextError />);
		expect(container).toBeInTheDocument();
	});
});
