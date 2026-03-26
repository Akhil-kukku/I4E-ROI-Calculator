const cards = [
  {
    title: "Top Universities",
    body: "MIT, Stanford, Harvard, Caltech, and UChicago continue to lead engineering ROI outcomes.",
    action: "Explore",
  },
  {
    title: "Salary Insights",
    body: "Higher-ranked US engineering programs in the dataset show stronger early salary performance.",
    action: "View Data",
  },
  {
    title: "ROI Tips",
    body: "Improve ROI by increasing scholarship, starting SIP earlier, and choosing better payback profiles.",
    action: "Apply Tips",
  },
];

export function InfoCards() {
  return (
    <aside className="space-y-4">
      {cards.map((card) => (
        <article
          key={card.title}
          className="rounded border border-gray-300 bg-white p-4 text-left"
        >
          <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-[#d8ecff]" />
          <h3 className="text-lg font-semibold text-[#1e3150]">{card.title}</h3>
          <p className="mt-2 text-sm leading-6 text-gray-500">{card.body}</p>
          <button className="mt-4 rounded bg-[#2196f3] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {card.action}
          </button>
        </article>
      ))}
    </aside>
  );
}
