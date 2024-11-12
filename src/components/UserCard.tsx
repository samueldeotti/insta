export default function UserCard({ value, href, timestamp }
: { value: string, href: string, timestamp: number }) {
  return (
    <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-md shadow-sm">
      <p className="overflow-hidden text-ellipsis whitespace-nowrap w-72">
        <span className="font-bold">Username: </span>
        <a className="underline text-blue-900 visited:text-purple-900" target="_blank" href={ href } rel="noreferrer">
          {value}
        </a>
      </p>
      <p>
        <span className="font-bold">Date: </span>
        {new Date(timestamp * 1000).toLocaleString().split(',').reverse()
          .join(' - ')}
      </p>
    </div>
  );
}
