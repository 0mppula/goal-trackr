import React from 'react';
import { ButtonProps, Button } from './button';
import { Loader2 } from 'lucide-react';

interface ButtonLoadingProps extends ButtonProps {
	loading?: boolean;
}

const ButtonLoading = ({ loading, children, ...props }: ButtonLoadingProps) => {
	return (
		<Button disabled={loading} {...props}>
			{children}
			{loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
		</Button>
	);
};

export default ButtonLoading;
