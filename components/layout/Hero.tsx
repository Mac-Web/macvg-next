type HeroProps = {
  title: string;
  description: string;
};

function Hero({ title, description }: HeroProps) {
  return (
    <div className="flex items-center justify-center flex-col gap-y-8 py-10">
      <h1 className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl font-bold text-center">
        {title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg text-center leading-7.5 w-[65%]">{description}</p>
    </div>
  );
}

export default Hero;
