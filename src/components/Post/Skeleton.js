export const PostSkeleton = () => {
  return (
    <>
      <article className=" p-3 my-4 bg-black animate-pulse shadow-lg border-b-4 border-secondary">
        <div className="mt-4">
          <header>
            <div className="flex items-center w-full">
              <div className="flex items-center  justify-end w-full">
                <h2 className=" mx-2  capitalize">
                  <span className="mt-1 block w-32 h-6 bg-open animate-pulse"></span>
                  <span className="mt-1 block w-32 h-2 bg-open animate-pulse"></span>
                </h2>
                <div className="rounded-full h-16 w-16  animate-pulse bg-open"></div>
              </div>
            </div>
          </header>
          <div className="flex justify-end my-2 w-full h-10 ">
            <div className="w-16 h-12 bg-open animate-pulse  mr-2"></div>
            <div className="w-24 h-12 bg-open animate-pulse mr-2"></div>
            <div className="w-24 h-12 bg-open animate-pulse "></div>
          </div>
          <p className=" capitalize  w-1/2 h-6 mt-5 animate-pulse bg-open"></p>
          <section className="my-4 h-80  w-full  bg-open  animate-pulse"></section>
          <footer className=" py-3  flex">
            <span className="  w-24 h-8 animate-pulse bg-open"></span>
          </footer>
        </div>
      </article>
    </>
  );
};
