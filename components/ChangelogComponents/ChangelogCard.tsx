export default function ChangelogCard({ changelog }: any) {
  return (
    <div className="shadow-xl lg:w-1/3 py-4 px-4 space-y-8 border-2 border-gcfBlue rounded-md">
      <div className="mb-4 text-gcfBlue text-xl font-bold">
        <span className="text-primary">{changelog.version}</span> -{" "}
        {changelog.date}
      </div>
      <div>
        {changelog.additions.length > 0 && (
          <>
            <h2 className="mb-2 text-xl font-bold">Additions</h2>
            <ul>
              {changelog.additions.map((addition: string, index: number) => (
                <li className="my-2" key={index}>
                  • {addition}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        {changelog.fixes.length > 0 && (
          <>
            <h2 className="mb-2 text-xl font-bold">Fixes</h2>
            <ul>
              {changelog.fixes.map((fix: string, index: number) => (
                <li className="my-2" key={index}>
                  • {fix}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        {changelog.improvements.length > 0 && (
          <>
            <h2 className="mb-2 text-xl font-bold">Improvements</h2>
            <ul>
              {changelog.improvements.map(
                (improvement: string, index: number) => (
                  <li className="my-2" key={index}>
                    • {improvement}
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
