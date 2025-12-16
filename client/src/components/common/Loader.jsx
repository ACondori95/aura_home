const Loader = ({size = "md", fullScreen = false}) => {
  const sizes = {sm: "h-8 w-8", md: "h-12 w-12", lg: "h-16 w-16"};

  const loader = (
    <div
      className={`${sizes[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className='fixed inset-0 bg-black/20 flex items-center justify-center z-50'>
        <div className='bg-white p-8 rounded-lg shadow-lg'>{loader}</div>
      </div>
    );
  }

  return <div className='flex items-center justify-center p-8'>{loader}</div>;
};

export default Loader;
