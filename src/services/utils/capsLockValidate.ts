import * as yup from 'yup';
import { AnyObject, Maybe } from 'yup/lib/types';

// eslint-disable-next-line func-names
yup.addMethod<yup.StringSchema>(yup.string, 'capsLockValidate', function (caps, message) {
	return this.test({
		name: 'capsLockValidate',
		message,
		test: () => !caps,
	});
});

declare module 'yup' {
	interface StringSchema<
		TType extends Maybe<string> = string | undefined,
		TContext extends AnyObject = AnyObject,
		TOut extends TType = TType,
	> extends yup.BaseSchema<TType, TContext, TOut> {
		capsLockValidate(caps: boolean, message: string): StringSchema;
	}
}

export default yup;
