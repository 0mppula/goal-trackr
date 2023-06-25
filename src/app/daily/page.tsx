const page = () => {
	return (
		<div className="container pt-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-8">
				My Daily Goals
			</h1>

			<div className="flex flex-col justify-center items-center gap-y-4 max-w-3xl mx-auto">
				{Array.from({ length: 15 }).map((item, i) => (
					<div key={i} className="p-4 border-2 rounded-md w-full">
						{i + 1}. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui,
						exercitationem.
					</div>
				))}
			</div>
		</div>
	);
};

export default page;
