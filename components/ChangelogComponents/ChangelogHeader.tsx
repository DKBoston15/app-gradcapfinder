export default function ChangelogHeader() {
  return (
    <div className="flex items-center bg-gcfBlue justify-center lg;justify-start">
      <div className="p-4 w-72 mr-72 py-8 lg:flex hidden">
        <a href="/">
          <img src="/logo.svg" />
        </a>
      </div>
      <div className="text-white text-center lg:text-left p-2 lg:p-0">
        <h1 className="text-2xl">What's new with GradCapFinder</h1>
        <p>GradCapFinder news feed and changelog</p>
      </div>
    </div>
  );
}
