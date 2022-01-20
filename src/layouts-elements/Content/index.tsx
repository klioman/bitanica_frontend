import { FC } from 'react';
import { IContent } from './types';

// ==========================================:
const Content: FC<IContent> = ({ children }) => {
	return <main className="content">{children}</main>;
};

export default Content;
